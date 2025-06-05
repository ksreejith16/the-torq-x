import { React, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "./CaseStudy.css";

const caseStudies = [
  {
    industry: "Automotive Industry",
    description:
      "A major auto manufacturer used our Architecture Design Generator to cut prototyping time by 30%, speeding up time-to-market for new models.",
  },
  {
    industry: "Healthcare Sector",
    description:
      "A leading healthcare provider used Torq SPICE to slash response times by 50%, boosting both operational efficiency and staff well-being.",
  },
  {
    industry: "E-commerce",
    description:
      "An e-commerce brand turned vague project scopes into detailed, actionable plans using our Requirements Generator—cutting project timelines by 25%.",
  },
  {
    industry: "Banking",
    description:
      "Our custom AI solutions helped a major bank streamline data processing and decision-making, leading to a 20% increase in customer satisfaction.",
  },
  {
    industry: "Education",
    description:
      "AI-powered tools helped a major educational platform personalize learning pathways for students, improving engagement by 40%.",
  },
];

const CaseStudy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className={`case-study-section ${isHomePage ? "mt-0" : "mt-50"}`}>
      <motion.h2
        className="case-study-heading"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        viewport={{ once: true }}
      >
        Customer Stories
      </motion.h2>

      <motion.h2
        className="case-study-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        viewport={{ once: true }}
      >
        Real Talk: Real Results. No Hype.
      </motion.h2>

      <motion.p
        className="case-study-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        viewport={{ once: true }}
      >
        We could drop all the hype about “disrupting industries,” but we’d rather just show you what really works.
      </motion.p>

      <div className="case-study-list">
        {caseStudies.map((study, index) => (
          <motion.div
            className="case-study-card"
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: index * 0.2 } }}
            viewport={{ once: true }}
          >
            <h3>{study.industry}</h3>
            <p>{study.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.a
        href="#contact"
        className="cta-button"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.8 } }}
        viewport={{ once: true }}
      >
        See how it’s done—let’s do it for you.
      </motion.a>
    </div>
  );
};

export default CaseStudy;
