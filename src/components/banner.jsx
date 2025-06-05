import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./banner.css";
import torqVideoMp4 from "../assets/videos/torqvideo_optimized.mp4";
import torqVideoWebm from "../assets/videos/torqvideo_optimized.webm";

const words = ["Clarity.", "Intelligence.", "Automation."];

const Banner = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fade, setFade] = useState(false);

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

  const handleScroll = (e) => {
    e.preventDefault();
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="banner-area">
      <video autoPlay loop muted playsInline className="background-video" preload="auto">
        <source src={torqVideoWebm} type="video/webm" />
        <source src={torqVideoMp4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="video-overlay"></div>

      <div className="container-fluid">
        <div className="row align-items-center g-0">
          <div className="col-lg-12">
            <div className="content">
              <h2 className="animated-text">
                We Don't Sell AI.<br />
                We Sell{" "}
                <span className={`changing-word ${fade ? "fade-out" : "fade-in"}`}>
                  {words[currentWordIndex]}
                </span>
              </h2>

              <div style={{ display: 'inline-block', marginTop: '20px' }}>
                <Link to="/contact" className="contact">
                  Ignite our AI Engine
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-down">
        <a href="#features" onClick={handleScroll} style={{ textDecoration: 'none' }}>
          <div className="mouse"></div>
        </a>
      </div>
    </div>
  );
};

export default Banner;
