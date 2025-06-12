import { React, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "./CaseStudy.css";

const caseStudies = [
  {
    industry: "OEM, U.S",
    description:
    "Created Integrated Processes by leveraging ASPICE 4.0 and ISO 26262."
  },
  {
    industry: "Tier 1, U.S",
    description:
      "Tool chain integration with ASPICE 3.1 model requirements and addressing the gaps."
  },
  {
    industry: "Tier 1, Europe",
    description:
      "Perform Tool Assessment to identify value added and non-value added activities and compliance to ASPICE v4.0 standard requirements.",
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
