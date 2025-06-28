import os
import re
import logging
from pathlib import Path
from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass
from abc import ABC, abstractmethod
import json

# PDF processing libraries
import PyPDF2
import pdfplumber
from pdfminer.high_level import extract_text
from pdfminer.layout import LAParams

# Text processing
import spacy
from spacy.lang.en import English
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords

# Data structures
import pandas as pd
import numpy as np
from collections import defaultdict

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class ProcessedDocument:
    """Represents a processed document with extracted and cleaned text"""
    document_id: str
    source_file: str
    pages: List[Dict[str, Any]]
    full_text: str
    metadata: Dict[str, Any]
    processing_stats: Dict[str, Any]


class PDFParser(ABC):
    """Abstract base class for PDF parsers"""
    
    @abstractmethod
    def extract_text(self, file_path: str) -> Dict[str, Any]:
        pass


class PyPDF2Parser(PDFParser):
    """PyPDF2-based parser for basic text extraction"""
    
    def extract_text(self, file_path: str) -> Dict[str, Any]:
        try:
            with open(file_path, 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                pages = []
                
                # Extract document metadata
                doc_info = reader.metadata or {}
                metadata = {
                    'num_pages': len(reader.pages),
                    'parser': 'PyPDF2',
                    'title': doc_info.get('/Title', ''),
                    'author': doc_info.get('/Author', ''),
                    'subject': doc_info.get('/Subject', ''),
                    'creator': doc_info.get('/Creator', ''),
                    'producer': doc_info.get('/Producer', ''),
                    'creation_date': str(doc_info.get('/CreationDate', '')),
                    'modification_date': str(doc_info.get('/ModDate', ''))
                }
                
                for i, page in enumerate(reader.pages):
                    text = page.extract_text()
                    pages.append({
                        'page_number': i + 1,
                        'text': text,
                        'char_count': len(text) if text else 0,
                        'extraction_quality': 'basic'
                    })
                
                return {'pages': pages, 'metadata': metadata, 'success': True}
        except Exception as e:
            logger.error(f"PyPDF2 parsing failed: {e}")
            return {'pages': [], 'metadata': {'error': str(e)}, 'success': False}


class PDFPlumberParser(PDFParser):
    """Advanced parser using pdfplumber for better text extraction"""
    
    def extract_text(self, file_path: str) -> Dict[str, Any]:
        try:
            pages = []
            with pdfplumber.open(file_path) as pdf:
                # Extract document metadata
                pdf_metadata = pdf.metadata or {}
                metadata = {
                    'num_pages': len(pdf.pages),
                    'parser': 'pdfplumber',
                    'title': pdf_metadata.get('Title', ''),
                    'author': pdf_metadata.get('Author', ''),
                    'subject': pdf_metadata.get('Subject', ''),
                    'creator': pdf_metadata.get('Creator', ''),
                    'producer': pdf_metadata.get('Producer', ''),
                    'creation_date': str(pdf_metadata.get('CreationDate', '')),
                    'modification_date': str(pdf_metadata.get('ModDate', ''))
                }
                
                for i, page in enumerate(pdf.pages):
                    # Extract text with better formatting preservation
                    text = page.extract_text(
                        x_tolerance=3, 
                        y_tolerance=3,
                        layout=True,
                        x_density=7.25,
                        y_density=13
                    )
                    
                    # Extract page-level metadata
                    page_info = {
                        'page_number': i + 1,
                        'text': text or '',
                        'char_count': len(text) if text else 0,
                        'width': page.width,
                        'height': page.height,
                        'rotation': page.rotation,
                        'extraction_quality': 'high',
                        'has_tables': len(page.find_tables()) > 0,
                        'table_count': len(page.find_tables()),
                        'has_images': len(page.images) > 0 if hasattr(page, 'images') else False,
                        'image_count': len(page.images) if hasattr(page, 'images') else 0
                    }
                    
                    # Extract table data if present
                    if page_info['has_tables']:
                        tables = []
                        for table in page.find_tables():
                            try:
                                table_data = table.extract()
                                if table_data:
                                    tables.append({
                                        'data': table_data,
                                        'bbox': table.bbox
                                    })
                            except Exception as e:
                                logger.warning(f"Failed to extract table on page {i+1}: {e}")
                        page_info['tables'] = tables
                    
                    pages.append(page_info)
                
                return {'pages': pages, 'metadata': metadata, 'success': True}
        except Exception as e:
            logger.error(f"PDFPlumber parsing failed: {e}")
            return {'pages': [], 'metadata': {'error': str(e)}, 'success': False}


class PDFMinerParser(PDFParser):
    """PDFMiner-based parser for layout-aware extraction"""
    
    def __init__(self):
        self.laparams = LAParams(
            line_margin=0.5,
            word_margin=0.1,
            char_margin=2.0,
            boxes_flow=0.5,
            all_texts=False
        )
    
    def extract_text(self, file_path: str) -> Dict[str, Any]:
        try:
            # Extract text with layout parameters
            text = extract_text(file_path, laparams=self.laparams)
            
            # Split into pages (approximation using form feed)
            pages = []
            page_texts = text.split('\f')  # Form feed character often separates pages
            
            if len(page_texts) == 1:
                # If no form feed, try to estimate pages by content length
                avg_chars_per_page = 2000  # Rough estimate
                total_chars = len(text)
                estimated_pages = max(1, total_chars // avg_chars_per_page)
                
                if estimated_pages > 1:
                    chunk_size = len(text) // estimated_pages
                    page_texts = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
            
            for i, page_text in enumerate(page_texts):
                if page_text.strip():
                    pages.append({
                        'page_number': i + 1,
                        'text': page_text.strip(),
                        'char_count': len(page_text.strip()),
                        'extraction_quality': 'layout_aware'
                    })
            
            metadata = {
                'num_pages': len(pages),
                'parser': 'PDFMiner',
                'layout_preserved': True
            }
            
            return {'pages': pages, 'metadata': metadata, 'success': True}
        except Exception as e:
            logger.error(f"PDFMiner parsing failed: {e}")
            return {'pages': [], 'metadata': {'error': str(e)}, 'success': False}


class TextPreprocessor:
    """Advanced text preprocessing for RAG optimization"""
    
    def __init__(self):
        # Initialize spaCy for advanced text processing
        try:
            self.nlp = spacy.load("en_core_web_sm")
        except OSError:
            logger.warning("spaCy model not found, using basic processing")
            self.nlp = English()
            self.nlp.add_pipe('sentencizer')
        
        # Compile regex patterns for cleaning
        self.cleaning_patterns = {
            # Remove excessive whitespace
            'whitespace': re.compile(r'\s+'),
            
            # Remove page numbers and footers
            'page_numbers': re.compile(r'^\s*\d+\s*$', re.MULTILINE),
            'page_headers': re.compile(r'^Page\s+\d+.*$', re.MULTILINE | re.IGNORECASE),
            
            # Fix common OCR issues
            'camel_case': re.compile(r'([a-z])([A-Z])'),
            'sentence_spacing': re.compile(r'([.!?])([A-Z])'),
            'number_letter': re.compile(r'(\d)([A-Za-z])'),
            'letter_number': re.compile(r'([A-Za-z])(\d)'),
            
            # Clean excessive punctuation
            'multiple_dots': re.compile(r'[.]{3,}'),
            'multiple_dashes': re.compile(r'[-]{2,}'),
            'multiple_spaces': re.compile(r' {2,}'),
            
            # Remove artifacts
            'bullet_artifacts': re.compile(r'[•◦▪▫■□▲△◆◇○●]'),
            'special_chars': re.compile(r'[^\w\s\-.,!?;:()\[\]{}"\'/\\@#$%^&*+=|<>~`]'),
            
            # Academic/document specific
            'citation_numbers': re.compile(r'\[\d+\]'),
            'footnote_markers': re.compile(r'\d+\s*$', re.MULTILINE),
            
            # Table artifacts
            'table_separators': re.compile(r'[|]{2,}'),
            'tab_artifacts': re.compile(r'\t+')
        }
        
        # Structure detection patterns
        self.structure_patterns = {
            'headers': [
                re.compile(r'^[A-Z][A-Z\s\d\.\-:]{10,100}$', re.MULTILINE),
                re.compile(r'^\d+\.\s+[A-Z][A-Za-z\s]{5,50}$', re.MULTILINE),
                re.compile(r'^[IVX]+\.\s+[A-Z][A-Za-z\s]{5,50}$', re.MULTILINE),
                re.compile(r'^Chapter\s+\d+[:\.]?\s*.*$', re.MULTILINE | re.IGNORECASE),
                re.compile(r'^Section\s+\d+[:\.]?\s*.*$', re.MULTILINE | re.IGNORECASE),
            ],
            'lists': [
                re.compile(r'^\s*[\-\*\+]\s+', re.MULTILINE),
                re.compile(r'^\s*\d+[\.\)]\s+', re.MULTILINE),
                re.compile(r'^\s*[a-zA-Z][\.\)]\s+', re.MULTILINE),
            ],
            'references': [
                re.compile(r'^References?\s*$', re.MULTILINE | re.IGNORECASE),
                re.compile(r'^Bibliography\s*$', re.MULTILINE | re.IGNORECASE),
                re.compile(r'^Works\s+Cited\s*$', re.MULTILINE | re.IGNORECASE),
            ]
        }
    
    def clean_text(self, text: str) -> str:
        """Comprehensive text cleaning for RAG optimization"""
        if not text or not text.strip():
            return ""
        
        original_length = len(text)
        
        # Basic normalization
        text = text.strip()
        
        # Remove page numbers and headers/footers
        text = self.cleaning_patterns['page_numbers'].sub('', text)
        text = self.cleaning_patterns['page_headers'].sub('', text)
        
        # Fix OCR issues
        text = self.cleaning_patterns['camel_case'].sub(r'\1 \2', text)
        text = self.cleaning_patterns['sentence_spacing'].sub(r'\1 \2', text)
        text = self.cleaning_patterns['number_letter'].sub(r'\1 \2', text)
        text = self.cleaning_patterns['letter_number'].sub(r'\1 \2', text)
        
        # Clean punctuation
        text = self.cleaning_patterns['multiple_dots'].sub('...', text)
        text = self.cleaning_patterns['multiple_dashes'].sub('--', text)
        
        # Remove artifacts
        text = self.cleaning_patterns['bullet_artifacts'].sub('•', text)
        text = self.cleaning_patterns['table_separators'].sub(' | ', text)
        text = self.cleaning_patterns['tab_artifacts'].sub(' ', text)
        
        # Normalize whitespace (do this last)
        text = self.cleaning_patterns['whitespace'].sub(' ', text)
        text = text.strip()
        
        # Log cleaning efficiency
        cleaned_length = len(text)
        if original_length > 0:
            reduction_percent = ((original_length - cleaned_length) / original_length) * 100
            if reduction_percent > 10:
                logger.debug(f"Text cleaned: {reduction_percent:.1f}% reduction")
        
        return text
    
    def detect_document_structure(self, text: str) -> Dict[str, List[Dict[str, Any]]]:
        """Detect and catalog document structure elements"""
        structure = {
            'headers': [],
            'lists': [],
            'references': [],
            'paragraphs': [],
            'tables': []
        }
        
        # Find headers
        for pattern in self.structure_patterns['headers']:
            for match in pattern.finditer(text):
                structure['headers'].append({
                    'text': match.group().strip(),
                    'start': match.start(),
                    'end': match.end(),
                    'level': self._estimate_header_level(match.group())
                })
        
        # Find lists
        for pattern in self.structure_patterns['lists']:
            for match in pattern.finditer(text):
                structure['lists'].append({
                    'marker': match.group().strip(),
                    'start': match.start(),
                    'end': match.end()
                })
        
        # Find reference sections
        for pattern in self.structure_patterns['references']:
            for match in pattern.finditer(text):
                structure['references'].append({
                    'text': match.group().strip(),
                    'start': match.start(),
                    'end': match.end()
                })
        
        # Find paragraphs
        paragraphs = re.split(r'\n\s*\n', text)
        start = 0
        for para in paragraphs:
            if para.strip() and len(para.strip()) > 20:
                structure['paragraphs'].append({
                    'text': para.strip(),
                    'start': start,
                    'end': start + len(para),
                    'word_count': len(para.split()),
                    'sentence_count': len(sent_tokenize(para))
                })
            start += len(para) + 2  # Account for paragraph separator
        
        return structure
    
    def _estimate_header_level(self, header_text: str) -> int:
        """Estimate the hierarchical level of a header"""
        if re.match(r'^\d+\.\s+', header_text):
            return 1
        elif re.match(r'^\d+\.\d+\s+', header_text):
            return 2
        elif re.match(r'^\d+\.\d+\.\d+\s+', header_text):
            return 3
        elif header_text.isupper():
            return 1
        else:
            return 2
    
    def extract_metadata_from_text(self, text: str) -> Dict[str, Any]:
        """Extract semantic metadata from text content"""
        if not text:
            return {}
        
        # Basic statistics
        words = text.split()
        sentences = sent_tokenize(text)
        
        # Language detection (basic)
        doc = self.nlp(text[:1000])  # Sample first 1000 chars for efficiency
        
        # Extract entities if available
        entities = []
        if hasattr(doc, 'ents'):
            for ent in doc.ents:
                entities.append({
                    'text': ent.text,
                    'label': ent.label_,
                    'description': spacy.explain(ent.label_) if spacy.explain(ent.label_) else ''
                })
        
        # Readability metrics (basic)
        avg_words_per_sentence = len(words) / len(sentences) if sentences else 0
        avg_chars_per_word = sum(len(word) for word in words) / len(words) if words else 0
        
        return {
            'word_count': len(words),
            'sentence_count': len(sentences),
            'paragraph_count': len(text.split('\n\n')),
            'avg_words_per_sentence': round(avg_words_per_sentence, 2),
            'avg_chars_per_word': round(avg_chars_per_word, 2),
            'entities': entities[:20],  # Limit entities for performance
            'entity_types': list(set([e['label'] for e in entities])),
            'language': 'en',  # Default to English
            'complexity_score': min(100, max(0, avg_words_per_sentence * 2))  # Simple complexity metric
        }


class AdvancedPDFProcessor:
    """Main class for advanced PDF processing without chunking"""
    
    def __init__(self):
        self.parsers = [
            PDFPlumberParser(),  # Try advanced parser first
            PDFMinerParser(),    # Layout-aware fallback
            PyPDF2Parser()       # Basic fallback
        ]
        self.preprocessor = TextPreprocessor()
    
    def extract_text_with_fallback(self, file_path: str) -> Dict[str, Any]:
        """Extract text using multiple parsers with intelligent fallback"""
        best_result = None
        best_score = 0
        
        for parser in self.parsers:
            logger.info(f"Trying {parser.__class__.__name__}")
            result = parser.extract_text(file_path)
            
            if result['success'] and result['pages']:
                # Score the extraction quality
                total_chars = sum(page['char_count'] for page in result['pages'])
                page_consistency = len([p for p in result['pages'] if p['char_count'] > 50])
                
                # Quality score based on content amount and consistency
                quality_score = total_chars * (page_consistency / len(result['pages']))
                
                logger.info(f"{parser.__class__.__name__}: {total_chars} chars, score: {quality_score:.0f}")
                
                if quality_score > best_score:
                    best_result = result
                    best_score = quality_score
            else:
                logger.warning(f"{parser.__class__.__name__} failed: {result['metadata'].get('error', 'Unknown error')}")
        
        if best_result:
            logger.info(f"Best extraction: {best_result['metadata']['parser']} (score: {best_score:.0f})")
            return best_result
        else:
            logger.error("All parsers failed")
            return {'pages': [], 'metadata': {'error': 'All parsers failed'}, 'success': False}
    
    def process_pdf(self, file_path: str, clean_text: bool = True) -> ProcessedDocument:
        """Process a PDF file and return structured document with cleaned text"""
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")
        
        logger.info(f"Processing PDF: {file_path}")
        file_name = Path(file_path).name
        document_id = Path(file_path).stem
        
        # Extract text
        extraction_result = self.extract_text_with_fallback(file_path)
        if not extraction_result['success']:
            raise Exception(f"Failed to extract text from {file_path}: {extraction_result['metadata'].get('error')}")
        
        # Process pages
        processed_pages = []
        full_text_parts = []
        total_chars_before = 0
        total_chars_after = 0
        
        for page_data in extraction_result['pages']:
            raw_text = page_data['text']
            total_chars_before += len(raw_text)
            
            # Clean text if requested
            if clean_text:
                cleaned_text = self.preprocessor.clean_text(raw_text)
            else:
                cleaned_text = raw_text
            
            total_chars_after += len(cleaned_text)
            
            # Detect structure and extract metadata
            if cleaned_text:
                structure = self.preprocessor.detect_document_structure(cleaned_text)
                text_metadata = self.preprocessor.extract_metadata_from_text(cleaned_text)
            else:
                structure = {}
                text_metadata = {}
            
            # Build processed page
            processed_page = {
                **page_data,  # Include original metadata
                'cleaned_text': cleaned_text,
                'text_metadata': text_metadata,
                'structure': structure,
                'cleaning_stats': {
                    'original_length': len(raw_text),
                    'cleaned_length': len(cleaned_text),
                    'reduction_percent': ((len(raw_text) - len(cleaned_text)) / len(raw_text) * 100) if raw_text else 0
                }
            }
            
            processed_pages.append(processed_page)
            if cleaned_text:
                full_text_parts.append(cleaned_text)
        
        # Combine all text
        full_text = '\n\n'.join(full_text_parts)
        
        # Extract document-level metadata
        document_metadata = {
            **extraction_result['metadata'],
            'file_name': file_name,
            'file_path': file_path,
            'file_size': os.path.getsize(file_path),
            'processing_timestamp': pd.Timestamp.now().isoformat(),
            'text_cleaned': clean_text
        }
        
        # Processing statistics
        processing_stats = {
            'total_pages': len(processed_pages),
            'total_chars_before': total_chars_before,
            'total_chars_after': total_chars_after,
            'total_reduction_percent': ((total_chars_before - total_chars_after) / total_chars_before * 100) if total_chars_before > 0 else 0,
            'pages_with_content': len([p for p in processed_pages if p['cleaned_text']]),
            'avg_chars_per_page': total_chars_after / len(processed_pages) if processed_pages else 0,
            'extraction_parser': extraction_result['metadata']['parser']
        }
        
        # Global document structure analysis
        if full_text:
            document_structure = self.preprocessor.detect_document_structure(full_text)
            document_text_metadata = self.preprocessor.extract_metadata_from_text(full_text)
            document_metadata.update(document_text_metadata)
            processing_stats['document_structure'] = {
                'headers_found': len(document_structure['headers']),
                'lists_found': len(document_structure['lists']),
                'paragraphs_found': len(document_structure['paragraphs']),
                'references_found': len(document_structure['references'])
            }
        
        return ProcessedDocument(
            document_id=document_id,
            source_file=file_path,
            pages=processed_pages,
            full_text=full_text,
            metadata=document_metadata,
            processing_stats=processing_stats
        )
    
    def process_directory(self, directory_path: str, clean_text: bool = True) -> List[ProcessedDocument]:
        """Process all PDF files in a directory"""
        directory = Path(directory_path)
        if not directory.exists():
            raise FileNotFoundError(f"Directory not found: {directory_path}")
        
        pdf_files = list(directory.glob("*.pdf"))
        logger.info(f"Found {len(pdf_files)} PDF files in {directory_path}")
        
        processed_docs = []
        failed_files = []
        
        for pdf_file in pdf_files:
            try:
                doc = self.process_pdf(str(pdf_file), clean_text=clean_text)
                processed_docs.append(doc)
                logger.info(f"Successfully processed: {pdf_file.name}")
            except Exception as e:
                logger.error(f"Failed to process {pdf_file.name}: {e}")
                failed_files.append(str(pdf_file))
        
        logger.info(f"Processing complete: {len(processed_docs)} successful, {len(failed_files)} failed")
        if failed_files:
            logger.warning(f"Failed files: {failed_files}")
        
        return processed_docs
    
    def export_processed_documents(self, documents: List[ProcessedDocument], output_path: str, format: str = 'json'):
        """Export processed documents to various formats"""
        if format.lower() == 'json':
            docs_data = []
            for doc in documents:
                docs_data.append({
                    'document_id': doc.document_id,
                    'source_file': doc.source_file,
                    'full_text': doc.full_text,
                    'metadata': doc.metadata,
                    'processing_stats': doc.processing_stats,
                    'pages': doc.pages
                })
            
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(docs_data, f, indent=2, ensure_ascii=False)
        
        elif format.lower() == 'txt':
            with open(output_path, 'w', encoding='utf-8') as f:
                for doc in documents:
                    f.write(f"=== Document: {doc.document_id} ===\n")
                    f.write(f"Source: {doc.source_file}\n")
                    f.write(f"Pages: {doc.processing_stats['total_pages']}\n")
                    f.write(f"Words: {doc.metadata.get('word_count', 'N/A')}\n\n")
                    f.write(doc.full_text)
                    f.write("\n\n" + "="*80 + "\n\n")
        
        logger.info(f"Exported {len(documents)} documents to {output_path}")
    
    def get_processing_summary(self, documents: List[ProcessedDocument]) -> Dict[str, Any]:
        """Get comprehensive processing summary"""
        if not documents:
            return {}
        
        total_pages = sum(doc.processing_stats['total_pages'] for doc in documents)
        total_chars = sum(len(doc.full_text) for doc in documents)
        total_words = sum(doc.metadata.get('word_count', 0) for doc in documents)
        
        parsers_used = defaultdict(int)
        for doc in documents:
            parser = doc.processing_stats.get('extraction_parser', 'unknown')
            parsers_used[parser] += 1
        
        return {
            'total_documents': len(documents),
            'total_pages': total_pages,
            'total_characters': total_chars,
            'total_words': total_words,
            'avg_pages_per_doc': total_pages / len(documents),
            'avg_chars_per_doc': total_chars / len(documents),
            'avg_words_per_doc': total_words / len(documents),
            'parsers_used': dict(parsers_used),
            'files_processed': [doc.source_file for doc in documents]
        }


def main():
    """Example usage"""
    processor = AdvancedPDFProcessor()
    
    try:
        # Example 1: Process single PDF
        pdf_path = "example.pdf"  # Replace with your PDF path
        if os.path.exists(pdf_path):
            doc = processor.process_pdf(pdf_path, clean_text=True)
            
            print(f"Document ID: {doc.document_id}")
            print(f"Pages: {doc.processing_stats['total_pages']}")
            print(f"Total Characters: {len(doc.full_text)}")
            print(f"Word Count: {doc.metadata.get('word_count', 'N/A')}")
            print(f"Parser Used: {doc.processing_stats['extraction_parser']}")
            print(f"Text Preview: {doc.full_text[:500]}...")
            
            # Export full document
            processor.export_processed_documents([doc], "processed_document.json")
        
        # Example 2: Process directory
        # docs = processor.process_directory("./pdfs/", clean_text=True)
        # summary = processor.get_processing_summary(docs)
        # print(f"\nProcessing Summary: {summary}")
        # processor.export_processed_documents(docs, "all_documents.json")
    
    except FileNotFoundError:
        print("Please update the pdf_path variable with a valid PDF file path")
        print("\nTo process a directory of PDFs, uncomment the directory processing example")
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()