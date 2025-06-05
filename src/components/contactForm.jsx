import React, { useState } from 'react'
import emailjs from 'emailjs-com';
import contact_img from "../assets/img/contact.jpg"
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        phone_number: '',
        message: ''
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Log the data before sending
        console.log('Contact Form Data:', formData);
        
        // Send email notification 
        emailjs
            .send(
                'service_c6bc1sp', // Your service ID
                'template_rrgfyrq', // Your template ID
                {
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    phone_number: formData.phone_number,
                    message: formData.message
                },
                'Ceb993bArvwy3_QiL' // Your public key
            )
            .then((response) => {
                console.log('Email sent successfully:', response);
                alert('Your message has been sent successfully!');
                // Reset form fields
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    phone_number: '',
                    message: ''
                });
            })
            .catch((error) => {
                console.error('Email sending failed:', error);
                alert('Failed to send message. Please try again.');
            });
    };
    return (
        <div className="contact-area ptb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="section-title">
                        <div className="section-title">
                            <div className="width">
                                <div className="sub-t">Contact</div>
                                <h2>Walk with us on the AI journey</h2>
                                <p style={{
                                    fontSize: '1.1rem',
                                    lineHeight: '1.6',
                                    marginBottom: '1.5rem',
                                    color: '#9094a6'
                                }}>
                                    Where every connection sparks tomorrow's innovations. 
                                    <br />
                                       Reach out today and join Torq X AI in redefining the future.
                                </p>
                            </div>
                        </div>
                        </div>
                        <div className="contact-form">
                            <form id="contactForm" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                name="name" 
                                                className="form-control" 
                                                id="name" 
                                                required 
                                                data-error="Please enter your name" 
                                                placeholder="Name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <input 
                                                type="email" 
                                                name="email" 
                                                className="form-control" 
                                                id="email" 
                                                required 
                                                data-error="Please enter your Email Address" 
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                name="subject" 
                                                className="form-control" 
                                                id="subject" 
                                                required 
                                                data-error="Please enter your subject" 
                                                placeholder="Subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                            />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                name="phone_number" 
                                                className="form-control" 
                                                id="phone_number" 
                                                required 
                                                data-error="Please enter your phone number" 
                                                placeholder="Phone Number"
                                                value={formData.phone_number}
                                                onChange={handleInputChange}
                                            />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12 mb-5">
                                        <div className="form-group">
                                            <textarea 
                                                name="message" 
                                                id="message" 
                                                className="form-control" 
                                                cols="30" 
                                                rows="6" 
                                                required 
                                                data-error="Please enter your message" 
                                                placeholder="Write your message..."
                                                value={formData.message}
                                                onChange={handleInputChange}
                                            ></textarea>
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12">
                                        <button type="submit" className="default-btn">
                                            <i className="ri-mail-send-line"></i> Send Message
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="image">
                            <img src={contact_img} alt="image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactForm