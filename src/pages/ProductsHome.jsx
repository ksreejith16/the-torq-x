import React, { useEffect } from "react";
import "./ProductsHome.css";
import product1 from '../assets/products/product_1.png';
import product2 from '../assets/products/product_2.png';
import product3 from '../assets/products/product_3.png';
import product4 from '../assets/products/product_4.png';

const productshome = [
  {
    id: 1,
    name: "Requirements Generator",
    image: product1,
    description: "Stop guessing. Get crystal-clear requirements in an instant.",
  },
  {
    id: 2,
    name: "Test Case Generator",
    image: product2,
    description: "Build comprehensive, error-free test cases without the manual headache.",
  },
  {
    id: 3,
    name: "Architecture Design Generator",
    image: product3,
    description: "Get optimized, ready-to-use blueprints—first time, every time.",
  },
  {
    id: 4,
    name: "Torq SPICE Chatbot",
    image: product4,
    description: "Think of it as your 24/7 teammate, troubleshooting and guiding you anytime.",
  },
  {
    id: 5,
    name: "Torq Flo Workflow Manager",
    image: "https://via.placeholder.com/300x200", // Keeping placeholder for the fifth product
    description: "Streamline your business processes, ensuring everything moves smoothly and on time.",
  },
];

const ProductsHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="productshome">
      <h1 className="productshome-title">Our Products</h1>
      <p className="productshome-subtitle">
        What If AI Could Just Work—Without the Hassles?
      </p>
      <p className="productshome-intro">
        AI doesn't have to be a nightmare. At <span>Torq X</span>, we make it simple. 
        Our AI-powered engines work seamlessly in the background—helping you solve 
        real problems while you focus on what matters most.
      </p>
      <div className="productshome-container">
        {productshome.map((product) => (
          <div className="producthome-card" key={product.id}>
            <div className="producthome-image-container">
              <img src={product.image} alt={product.name} className="producthome-image" />
            </div>
            <h2 className="producthome-name">{product.name}</h2>
            <p className="producthome-description">{product.description}</p>
            <button className="producthome-button">Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsHome;