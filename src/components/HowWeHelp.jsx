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
            The Secret No One Tells You About AI
          </h2>
          <p className="help-description">
            The true power of AI isn't in the tech—it's how we make it work for you. At{" "}
            <span className="torq-x">Torq X</span>, we craft a custom LLM that grows with your business, making AI do what you need.
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