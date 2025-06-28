import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./banner.css";
import torqVideoMp4 from "../assets/videos/torqvideo_optimized.mp4";
import torqVideoWebm from "../assets/videos/torqvideo_optimized.webm";

const words = ["ASPICE.", "Cybersecurity.", "Functional Safety.", "AI-Powered Compliance Engine."];

const Banner = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFade(false);
      }, 500);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Trigger initial animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e) => {
    e.preventDefault();
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="banner-area">
      {/* Enhanced Background Elements */}
      <div className="banner-background-effects">
        <div className="gradient-overlay"></div>
        <div className="floating-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>
        <div className="animated-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <video autoPlay loop muted playsInline className="background-video" preload="auto">
        <source src={torqVideoWebm} type="video/webm" />
        <source src={torqVideoMp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="video-overlay"></div>

      <div className="container-fluid">
        <div className="row align-items-center g-0">
          <div className="col-lg-12">
            <div className={`content ${isLoaded ? 'content-loaded' : ''}`}>
              <div className="content-wrapper">
                <div className="text-reveal-container">
                  <h2 className="animated-text">
                    <span className="text-line">
                      <span className="text-reveal">We Don't Sell Compliance</span>
                    </span>
                    <br />
                    <span className="text-line">
                      <span className="text-reveal">We Deliver Value & Quality with</span>{" "}
                      <span className={`changing-word ${fade ? "fade-out" : "fade-in"}`}>
                        <span className="word-background"></span>
                        {words[currentWordIndex]}
                      </span>
                    </span>
                  </h2>
                </div>

                <div className="cta-container">
                  <div className="button-wrapper">
                    <Link to="/contact" className="contact">
                      <span className="button-text">Ignite our Compliance Engine</span>
                      <span className="button-icon">
                        <i className="ri-arrow-right-line"></i>
                      </span>
                      <div className="button-ripple"></div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-down">
        <a href="#features" onClick={handleScroll} style={{ textDecoration: 'none' }}>
          <div className="scroll-indicator">
            <div className="mouse">
              <div className="mouse-wheel"></div>
            </div>
            <div className="scroll-text">Scroll</div>
          </div>
        </a>
      </div>

      {/* Decorative Elements */}
      <div className="banner-decorative-elements">
        <div className="corner-decoration corner-top-left"></div>
        <div className="corner-decoration corner-top-right"></div>
        <div className="corner-decoration corner-bottom-left"></div>
        <div className="corner-decoration corner-bottom-right"></div>
      </div>
    </div>
  );
};

export default Banner;