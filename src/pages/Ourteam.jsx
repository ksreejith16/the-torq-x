import React, { useEffect } from "react";
import "./OurTeam.css";

const teamMembers = [
  {
    id: 1,
    name: "Ramkumar KrishnaKumar",
    role: "CEO & Founder",
    image: "https://via.placeholder.com/150",
    description: "Ramkumar KrishnaKumar is the visionary behind our company, leading with passion and innovation.",
  },
  {
    id: 2,
    name: "Aravind",
    role: "Lead Developer",
    image: "https://via.placeholder.com/150",
    description: "Aravind brings expertise in technology and ensures smooth development processes.",
  },
  {
    id: 3,
    name: "Harini",
    role: "Business Executive",
    image: "https://via.placeholder.com/150",
    description: "Harini is the creative force, crafting compelling designs and strategies.",
  },
];

const OurTeam = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
  return (
    <div className="our-team">
      <h1 className="team-title">Meet Our Team</h1>
      <div className="team-container">
        {teamMembers.map((member) => (
          <div className="team-card" key={member.id}>
            <img
              src={member.image}
              alt={`${member.name}'s photo`}
              className="team-image"
            />
            <h2 className="team-name">{member.name}</h2>
            <p className="team-role">{member.role}</p>
            <p className="team-description">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
