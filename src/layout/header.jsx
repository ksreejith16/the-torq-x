import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/img/torq-ai.png";
import './header.css';
const menuList = [
  {
    id: "1",
    path: "/",
    name: "Home",
    dropDownList: false,
  },
  {
    id: "2",
    path: "/products",
    name: "Products",
    
  },
  {
    id: "3",
    path: "/services",
    name: "Services",
    dropDownList: false,
  },

  {
    id: "4",
    path: "/customer-stories",
    name: "Customer Stories",
    dropDownList: false,
  },
];

const Header = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState("");
  const [mobileNavActive, setMobileNavActive] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", stickyHeader);
    return () => window.removeEventListener("scroll", stickyHeader);
  }, []);

  useEffect(() => {
    if (mobileNavActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileNavActive]);

  const stickyHeader = () => {
    const navbar = document.querySelector(".navbar");
    const scrollTop = window.scrollY;

    scrollTop >= 100
      ? navbar.classList.add("sticky")
      : navbar.classList.remove("sticky");
  };

  const handleDropdown = (dropDownList, id) => {
    if (dropDownList) {
      setDropdownOpen(id);
    } else {
      setDropdownOpen("");
      setMobileNavActive(false);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg mb-nav" id="navbar">
        <div className="container-fluid">
          {/* Logo Section */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={logo}
              alt="Torq AI"
              style={{ height: "60px", marginRight: "20px" }}
            />
          </Link>

          {/* Burger Menu */}
          <div
            onClick={() => setMobileNavActive(true)}
            className="navbar-toggler text-decoration-none"
          >
            <span className="burger-menu">
              <span className="top-bar"></span>
              <span className="middle-bar"></span>
              <span className="bottom-bar"></span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              {menuList.map(({ id, dropDownList, name, path }) => (
                <li key={id} className="nav-item">
                  <Link
                    to={path}
                    className={`${
                      dropDownList ? "dropdown-toggle" : ""
                    } nav-link`}
                  >
                    {name}
                  </Link>
                  {dropDownList && (
                    <ul className="dropdown-menu">
                      {dropDownList.map(({ id, path, name }) => (
                        <li key={id} className="nav-item">
                          <Link to={path} className="nav-link">
                            {name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="nav-btn">
              <Link to="/contact" className="demo-btn">
                Contact Us
               
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className={`responsive-navbar ${mobileNavActive ? "show" : ""}`}>
        <div className="offcanvas-header">
          {/* Mobile Logo */}
          <Link to="/" className="logo d-inline-block d-flex align-items-center">
            <img
              src={logo}
              alt="Torq AI"
              style={{ height: "40px", marginRight: "10px" }}
            />
          </Link>
          <button
            onClick={() => setMobileNavActive(false)}
            type="button"
            className="close-btn bg-transparent position-relative lh-1 p-0 border-0"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>
        <div className="offcanvas-body">
          <ul className="responsive-menu">
            {menuList.map(({ id, dropDownList, name, path }) => (
              <li
                key={id}
                className={`responsive-menu-list ${
                  dropdownOpen === id ? "activeDropdown" : ""
                } ${dropDownList ? "" : "without-icon"}`}
              >
                <NavLink
                  onClick={(e) => handleDropdown(dropDownList, id)}
                  to={path}
                >
                  {name}
                </NavLink>
                {dropDownList && (
                  <ul className="responsive-menu-items">
                    {dropDownList.map(({ id, name, path }) => (
                      <li
                        key={id}
                        onClick={() => setMobileNavActive(false)}
                      >
                        <NavLink to={path}>{name}</NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="others-option d-md-flex align-items-center">
            <div className="option-item">
              <Link to="/contact" className="demo-btn">
               Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;