import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/img/torq-ai.png";
import './footer.css';

const Footer = () => {
  // Function to scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-area">
      <div className="container">
        <div className="footer-top-area pt-100">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <div className="footer-logo">
                  <Link to="/" onClick={handleScrollToTop}>
                    <img src={logo} alt="Torq AI" className="footer-logo-img" />
                  </Link>
                </div>
                <p><strong>Torq X – Igniting the Future</strong></p>
                <p>Where every algorithm sparks innovation, fueling a digital revolution that's transforming tomorrow, today.</p>
                <ul className="social-links">
                  <li><Link to="https://www.facebook.com/" target="_blank"><i className="ri-facebook-fill"></i></Link></li>
                  <li><Link to="https://www.instagram.com/" target="_blank"><i className="ri-instagram-line"></i></Link></li>
                  <li><Link to="https://www.linkedin.com/" target="_blank"><i className="ri-linkedin-fill"></i></Link></li>
                  <li><Link to="https://www.youtube.com/" target="_blank"><i className="ri-youtube-line"></i></Link></li>
                </ul>
              </div>
            </div>
            {/* Rest of the footer content remains unchanged */}
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="single-footer-widget pl-5">
                <h3>Links</h3>
                <ul className="links-list">
                  <li><Link to="/" onClick={handleScrollToTop}>Home</Link></li>
                  <li><Link to="/services" onClick={handleScrollToTop}>Services</Link></li>
                  <li><Link to="/team" onClick={handleScrollToTop}>Our Team</Link></li>
                  <li><Link to="/customer-stories" onClick={handleScrollToTop}>Customer Stories</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <h3>Legal</h3>
                <ul className="links-list">
                  <li><Link to="/contact" onClick={handleScrollToTop}>Legal</Link></li>
                  
                  <li><Link to="/privacy-policy" onClick={handleScrollToTop}>Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <h3>Newsletter</h3>
                <div className="footer-newsletter-info">
                  <p>Join over <span>11600</span> </p>
                  <form className="newsletter-form" data-toggle="validator">
                    <label><i className='bx bx-envelope-open'></i></label>
                    <input type="text" className="input-newsletter" placeholder="Enter your email address" name="EMAIL" required autoComplete="off" />
                    <button type="submit" className="default-btn"><i className="ri-send-plane-line"></i> Subscribe Now</button>
                    <div id="validator-newsletter2" className="form-result"></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pr-line"></div>
        <div className="footer-bottom-area">
          <p>©  2025 Torq X . All Rights Reserved. </p>
        </div>
      </div>
      <div className="lines">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </footer>
  );
};

export default Footer;