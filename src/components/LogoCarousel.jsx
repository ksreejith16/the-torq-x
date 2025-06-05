import React from "react";
import { motion } from "framer-motion";
import "./LogoCarousel.css";

// Import logos
import barstool from "../assets/logos/logo_1.svg";
import budweiser from "../assets/logos/logo_2.svg";
import buzzfeed from "../assets/logos/logo_3.svg";
import forbes from "../assets/logos/logo_4.svg";
import macys from "../assets/logos/logo_5.svg";

const logos = [ barstool, budweiser, buzzfeed, forbes, macys];

const LogoCarousel = () => {
  return (
    <div className="logo-carousel">
      <motion.div
        className="carousel-track"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ ease: "linear", duration: 12, repeat: Infinity }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="logo-item">
            <img src={logo} alt={`Client Logo ${index + 1}`} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoCarousel;
