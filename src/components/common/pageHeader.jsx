// PageHeader.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import contactVideo from '../../assets/videos/Contact-us.mp4';
import './PageHeader.css';

const PageHeader = ({ pageName }) => {
    const location = useLocation();
    const isContactPage = location.pathname === '/contact';

    return (
        <div className={`section-banner ${isContactPage ? 'contact-banner' : ''}`}>
            {isContactPage && (
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="contact-background-video"
                >
                    <source src={contactVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
            <div className="container">
                <div className="section-banner-content">
                    <h1>{pageName}</h1>
                    <nav>
                        <ol className="breadcrumb d-flex align-items-center gap-2">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <span>/</span>
                            <li className="breadcrumb-item active" aria-current="page">{pageName}</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;