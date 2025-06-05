import React, { useEffect } from "react";
import "./Products.css";
//New page
const products = [
  {
    id: 1,
    name: "Requirements Generator",
    image: "https://via.placeholder.com/300x200", // Replace with actual image
    description: "Stop guessing. Get crystal-clear requirements in an instant.",
  },//
  {
    id: 2,
    name: "Test Case Generator",
    image: "https://via.placeholder.com/300x200", // Replace with actual image
    description: "Build comprehensive, error-free test cases without the manual headache.",
  },
  {
    id: 3,
    name: "Architecture Design Generator",
    image: "https://via.placeholder.com/300x200", // Replace with actual image
    description: "Get optimized, ready-to-use blueprints—first time, every time.",
  },
  {
    id: 4,
    name: "Torq SPICE Chatbot",
    image: "https://via.placeholder.com/300x200", // Replace with actual image
    description: "Think of it as your 24/7 teammate, troubleshooting and guiding you anytime.",
  },
  {
    id: 5,
    name: "Torq Flo Workflow Manager",
    image: "https://via.placeholder.com/300x200", // Replace with actual image
    description: "Streamline your business processes, ensuring everything moves smoothly and on time.",
  },
];
//
const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="products">
      <h1 className="products-title">Our Products</h1>
      <p className="products-subtitle">
        What If AI Could Just Work—Without the Hassles?
      </p>
      <p className="products-intro">
        AI doesn’t have to be a nightmare. At <span>Torq X</span>, we make it simple. 
        Our AI-powered engines work seamlessly in the background—helping you solve 
        real problems while you focus on what matters most.
      </p>
      <div className="products-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <button className="product-button">Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
