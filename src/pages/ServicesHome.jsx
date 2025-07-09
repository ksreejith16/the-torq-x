import React, { useEffect } from "react";
import "./ServicesHome.css";
import service1 from '../assets/services/service_1.png';
import service2 from '../assets/services/service_2.png';
import service3 from '../assets/services/service_3.png';
import service4 from '../assets/services/service_4.png';
import { useNavigate } from 'react-router-dom';
const serviceshome = [
  {
    id: 1,
    name: "Automotive SPICE®" ,
    image: service1,
    description: "ASPICE 3.1 and 4.0 Framework for Software Process Improvement.",
  },
  {
    id: 2,
    name: "Functional Safety",
    image: service2,
    description: "ISO 26262 standard to ensure passenger safety.",
  },
  {
    id: 3,
    name: "Cybersecurity",
    image: service3,
    description: "ISO 21434 standard to ensure vehicle security.",
  },
  {
    id: 4,
    name: "Torq AI",
    image: service4,
    description: "AI Powered engine by Torq X.",
  },
  
];

const servicesHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 const navigate = useNavigate();
  return (
    <div className="serviceshome">
      <h1 className="serviceshome-title">Our services</h1>
      <p className="serviceshome-subtitle">
       INTEGRATED PROCESS FRAMEWORK — WITHOUT THE SILOS

      </p>
      <p className="serviceshome-intro">
       Compliance shouldn't be chaos. At <span>Torq X</span>, we unify <b>ASPICE, Safety</b>, and <b>Security</b> into one smart, seamless framework — with built-in touchpoints that just work.
      </p>
      <div className="serviceshome-container">
        {serviceshome.map((service) => (
          <div className="servicehome-card" key={service.id}>
            <div className="servicehome-image-container">
              <img src={service.image} alt={service.name} className="servicehome-image" />
            </div>
            <h2 className="servicehome-name">{service.name}</h2>
            <p className="servicehome-description">{service.description}</p>
          <button
  className="servicehome-button"
  onClick={() => {
    if (service.id === 4) {
      window.open("https://thetorq.ai", "_blank");
    } else {
      navigate("/contact");
    }
  }}
>
  Learn More
</button>
  </div>
        ))}
      </div>
    </div>
  );
};

export default servicesHome;