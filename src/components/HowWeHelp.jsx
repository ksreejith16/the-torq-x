import React, { useRef, useEffect } from "react";
import "./HowWeHelp.css";
import backgroundVideo from "../assets/videos/mainpage.mp4";

const HowWeHelp = () => {
  const videoRef = useRef(null);

  // Use effect to handle video loading and play when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error("Error playing the video:", err);
      });
    }
  }, []);

  return (
    <div className="how-we-help-container">
      {/* Top Section */}
      <div className="help-top">
        <div className="content-wrapper">
          <h2 className="help-title">
            The Power of Integrated Process Framework 
          </h2>
          <p className="help-description">
            The real strength of our Integrated Process Framework is how it works for you. At{" "}
            <span className="torq-x">Torq X</span>, it smoothly blends ASPICE, Functional Safety, and Cybersecurity in a flexible, plug-and-play setup that’s customized to fit your needs.

          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="help-bottom">
        {/* Video Background */}
        <video 
          ref={videoRef}
          className="video-background"
          muted
          loop
          playsInline
          src={backgroundVideo}
        >
          Your browser does not support the video tag.
        </video>
        <div className="content-wrapper">
          <p className="help-highlight">
            Cutting to the Chase, Let's Talk About What AI Can Do for Your Business—No Pressure, No Pitches.
          </p>
          <button className="help-button">Let's Connect</button>
        </div>
      </div>
    </div>
  );
};

export default HowWeHelp;