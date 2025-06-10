import React from 'react'
import {motion} from "framer-motion"
import { Link, useLocation } from 'react-router-dom'
import './fetuses.css'
const featuresData = [
    {
        id: 1,
        icon: "fi fi-tr-file-user",
        title: "Defining the Problem Statement",
        desc: "“Insight Discovery”  we listen, understand, and define the core challenges that fits in your product development process.",
        link: "/contact"
    },
    {
        id: 2,
        icon: "fi fi-tr-graphic-style",
        title: "Conceptualization & Ideation",
        desc: "“Vision Forge” Turning ideas into actionable, innovative concepts that align with your business goals.",
        link: "/contact"
    },
    {
        id: 3,
        icon: "fi fi-tr-user-astronaut",
        title: "Proof of Concept (PoC)",
        desc: "“Prototype Pulse” Validating the concept with a PoC to ensure the AI solution delivers real-world value.",
        link: "/contact"
    },
    {
        id: 4,
        icon: "fi fi-tr-biking-mountain",
        title: "Iterative Development & Refinement",
        desc: "“Seamless Launch” Refining the solution through iterative development while seamlessly integrating it for immediate impact.",
        link: "/contact"
    },

]
const Fetuses = () => {
    const location = useLocation();

    // Check if the current location is the home page
    const isHomePage = location.pathname === '/';

    return (
        <section 
            id="features" 
            className={`fetuses-area ${isHomePage ? 'pt-70' : 'pt-70'}`}
        >
            <div className="container-fluid">
                <h1 className="fetuse-title">Integrated process solutions that fits you </h1>
                <p className="fetuse-subtitle">
                    Our Integrated Process solutions that gels in with your Engineering Product Development 

                </p>
                <div className="row justify-content-center g-0">
                    {featuresData.map(({ id, desc, icon, link, title }) => (
                        <div key={id} className="col-lg-3 col-md-6">
                            <motion.div 
                                className="single-fetuses-box"
                                initial={{ opacity: 0, y: 150 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 1 },
                                }}
                                viewport={{ once: true }}
                            >
                                <div className="icon">
                                    <i className={icon}></i>
                                </div>
                                <h3>{title}</h3>
                                <p>{desc}</p>
                                <Link to={link}>Read More</Link>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Fetuses;