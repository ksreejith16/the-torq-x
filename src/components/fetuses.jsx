import React, { useState } from 'react'
import { motion } from "framer-motion"
import { Link, useLocation } from 'react-router-dom'
import './fetuses.css'

const featuresData = [
    {
        id: 1,
        icon: "fi fi-tr-file-user",
        title: "Defining the Problem Statement",
        desc: `"Insight Discovery" - we listen, understand, and define the core challenges that fits in your product development process.`,
        link: "/contact"
    },
    {
        id: 2,
        icon: "fi fi-tr-graphic-style",
        title: "Conceptualization & Ideation",
        desc: `"Vision Forge" - Turning ideas into actionable, innovative concepts that align with your business goals.`,
        link: "/contact"
    },
    {
        id: 3,
        icon: "fi fi-tr-user-astronaut",
        title: "Proof of Concept (PoC)",
        desc: `"Prototype Pulse" - Validating the concept with a PoC to ensure the AI solution delivers real-world value.`,
        link: "/contact"
    },
    {
        id: 4,
        icon: "fi fi-tr-biking-mountain",
        title: "Iterative Development & Refinement",
        desc: `"Seamless Launch" - Refining the solution through iterative development while seamlessly integrating it for immediate impact.`,
        link: "/contact"
    },
]

const Fetuses = () => {
    const location = useLocation();
    const [hoveredCard, setHoveredCard] = useState(null);

    // Check if the current location is the home page
    const isHomePage = location.pathname === '/';

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 150,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { 
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const iconVariants = {
        rest: { 
            scale: 1, 
            rotate: 0,
            y: 0
        },
        hover: { 
            scale: 1.2, 
            rotate: 5,
            y: -5,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section 
            id="features" 
            className={`fetuses-area ${isHomePage ? 'pt-70' : 'pt-70'}`}
        >
            <div className="container-fluid">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={titleVariants}
                >
                    <h1 className="fetuse-title">
                        Integrated process solutions that fits you
                    </h1>
                    <p className="fetuse-subtitle">
                        Our Integrated Process solutions that gels in with your Engineering Product Development
                    </p>
                </motion.div>

                <motion.div 
                    className="row justify-content-center g-0"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {featuresData.map(({ id, desc, icon, link, title }, index) => (
                        <div key={id} className="col-lg-3 col-md-6">
                            <motion.div 
                                className={`single-fetuses-box ${hoveredCard === id ? 'hovered' : ''}`}
                                variants={cardVariants}
                                initial="rest"
                                whileHover="hover"
                                onMouseEnter={() => setHoveredCard(id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { 
                                        duration: 0.8,
                                        delay: index * 0.2,
                                        ease: "easeOut"
                                    },
                                }}
                                viewport={{ once: true }}
                                style={{
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                <motion.div 
                                    className="card-content"
                                    whileHover={{
                                        rotateX: 5,
                                        rotateY: 5,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    <motion.div 
                                        className="icon"
                                        variants={iconVariants}
                                    >
                                        <i className={icon}></i>
                                        <motion.div
                                            className="icon-glow"
                                            initial={{ opacity: 0, scale: 0 }}
                                            whileHover={{ 
                                                opacity: 1, 
                                                scale: 1.5,
                                                transition: { duration: 0.3 }
                                            }}
                                        />
                                    </motion.div>
                                    
                                    <motion.h3
                                        whileHover={{
                                            color: "#ffaa33",
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        {title}
                                    </motion.h3>
                                    
                                    <motion.p
                                        initial={{ opacity: 0.8 }}
                                        whileHover={{
                                            opacity: 1,
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        {desc}
                                    </motion.p>
                                    
                                    <motion.div
                                        whileHover={{
                                            x: 5,
                                            transition: { duration: 0.3 }
                                        }}
                                    >
                                        <Link 
                                            to={link}
                                            className="read-more-link"
                                        >
                                            <span>Read More</span>
                                            <motion.svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                initial={{ x: 0 }}
                                                whileHover={{ x: 5 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <path d="m9 18 6-6-6-6"/>
                                            </motion.svg>
                                        </Link>
                                    </motion.div>
                                </motion.div>

                                {/* Floating particles effect */}
                                <motion.div
                                    className="floating-particles"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {[...Array(6)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="particle"
                                            initial={{ 
                                                opacity: 0,
                                                scale: 0,
                                                x: 0,
                                                y: 0
                                            }}
                                            whileHover={{
                                                opacity: [0, 1, 0],
                                                scale: [0, 1, 0],
                                                x: Math.random() * 100 - 50,
                                                y: Math.random() * 100 - 50,
                                                transition: {
                                                    duration: 2,
                                                    delay: i * 0.1,
                                                    repeat: Infinity,
                                                    repeatDelay: 1
                                                }
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Fetuses;