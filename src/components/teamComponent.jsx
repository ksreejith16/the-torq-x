import React from 'react'
import { motion } from "framer-motion";
import './teamComponent.css'
import img_1 from "../assets/img/ramkumar.png"
import img_3 from "../assets/img/harini.png"
import TeamCard from './common/teamCard';

const teamData = [
    {
        id: 1,
        img: img_1,
        name: "Ramkumar KrishnaKumar",
        position: "Quantum Visionary",
        socal_link: [
            { id: 1, link: "#", icon: "ri-facebook-fill" },
            { id: 3, link: "#", icon: "ri-linkedin-fill" },
        ]
    },
    {
        id: 2,
        img: img_3,
        name: "Harini",
        position: "Cognitive Curator",
        socal_link: [
            { id: 1, link: "#", icon: "ri-facebook-fill" },
            { id: 3, link: "#", icon: "ri-linkedin-fill" },
        ]
    }
]

const TeamComponent = ({ prentClass }) => {
    return (
        <div className={`team-area pt-100 ${prentClass}`}>
            {/* Animated Background Elements */}
            <div className="team-bg-elements">
                <div className="floating-circle circle-1"></div>
                <div className="floating-circle circle-2"></div>
                <div className="floating-circle circle-3"></div>
                <div className="gradient-mesh"></div>
            </div>

            <div className="container">
                {/* Our Team Section */}
                <motion.div 
                    className="text-center team-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }}
                    viewport={{ once: true }}
                >
                    <motion.div 
                        className="team-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2 } }}
                        viewport={{ once: true }}
                    >
                        <span>✨ Meet The Team</span>
                    </motion.div>
                    
                    <motion.h2 
                        className="team-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } }}
                        viewport={{ once: true }}
                    >
                        Our Team
                    </motion.h2>
                    
                    <motion.p 
                        className="team-tagline"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } }}
                        viewport={{ once: true }}
                    >
                        The Brains behind the Integrated Process 
                    </motion.p>
                    
                    <motion.p 
                        className="team-subtagline"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.7 } }}
                        viewport={{ once: true }}
                    >
                        Here to make your Process Transformation journey as smooth as your morning coffee.
                    </motion.p>
                </motion.div>

                {/* Team Members Grid */}
                <motion.div 
                    className="team-grid"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.4, ease: "easeOut" } }}
                    viewport={{ once: true }}
                >
                    {teamData.map(({ id, img, name, position, socal_link }) => (
                        <motion.div 
                            key={id}
                            className="team-member"
                            initial={{ opacity: 0, scale: 0.8, y: 30 }}
                            whileInView={{ 
                                opacity: 1, 
                                scale: 1, 
                                y: 0,
                                transition: { 
                                    duration: 0.8, 
                                    delay: id * 0.15,
                                    ease: "easeOut"
                                } 
                            }}
                            whileHover={{ 
                                y: -10, 
                                transition: { duration: 0.3, ease: "easeOut" } 
                            }}
                            viewport={{ once: true }}
                        >
                            <div className="team-card-wrapper">
                                <TeamCard 
                                    img={img} 
                                    name={name} 
                                    position={position} 
                                    socal_link={socal_link} 
                                />
                                <div className="team-card-glow"></div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Decorative Elements */}
                <motion.div 
                    className="team-decorative-line"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1, transition: { duration: 1.5, delay: 1 } }}
                    viewport={{ once: true }}
                ></motion.div>
            </div>
        </div>
    )
}

export default TeamComponent;