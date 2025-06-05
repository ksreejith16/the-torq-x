import React from 'react';
import man from "../assets/img/man.png";
import { Link } from 'react-router-dom';
import "./banner.css"; 
const Banner = () => {
    return (
        <div className="banner-area">
            <div className="container-fluid">
                <div className="row align-items-center g-0">
                    <div className="col-lg-6">
                        <div className="content">
                            <span className="banner-top-title">Fully Dynamic</span>
                            <h1><span className="grd-color-1">Torq Ai</span> Revolutionizing Compliance with AI-Driven Solutions.</h1>
                            <p>Empower your teams with our Torq AI powered cutting-edge tools for predictive compliance, ASPICE checks, and seamless quality assurance across Automotive and Non-Automotive domains.</p>
                            <div className="searchwrapper">
                                <div className="searchbox">
                                    <div className="row align-items-center">
                                        <div className="col-md-9">
                                            <form>
                                                <input type="text" className="form-control" placeholder="Hey there!, Talk to TorqSPICE our ASPICE Sensei Chatbot." />
                                            </form>
                                        </div>
                                        <div className="col-lg-3">
                                            <form>
                                                <button className="btn" type="submit">Fire Me</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Updated Button */}
                            <Link to="/contact" className="demo-btn">Schedule a Demo</Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="image">
                            <img src={man} alt="image" />
                        </div>
                    </div>
                </div>
                <div className="scroll-down">
                    <Link to="#features">
                        <div className="mouse"></div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;