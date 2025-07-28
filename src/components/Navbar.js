// components/Navbar.js
import React, { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaHome,
  FaUtensils,
  FaLightbulb,
  FaPhone,
  FaTimes,
  FaList,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const navigate = useNavigate();

  const handleResize = () => setIsMobile(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const goToSimpleMenu = () => {
    navigate("/simple-menu");
    setMenuOpen(false);
  };

  return (
    <nav style={styles.nav}>
      <Link to="/"  style={styles.logo}>
        <img
          src={require("../assets/restaurant.png")}
          alt="Logo"
          style={styles.logoImg}
        />
        <span style={styles.logoText}>Bon Appétit</span>
      </Link>

      {isMobile ? (
        <div
          ref={hamburgerRef}
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      ) : (
        <ul style={styles.navLinks}>
          <li onClick={() => scrollToSection("home")} style={styles.link}>
            <FaHome /> Home
          </li>
          <li onClick={() => scrollToSection("menu")} style={styles.link}>
            <FaUtensils /> Menu
          </li>
          <li onClick={() => scrollToSection("footer")} style={styles.link}>
            <FaPhone /> Contact
          </li>
          <li>
            <Link
              to="/simple-menu"
              style={{ ...styles.link, textDecoration: "none" }}
            >
              <FaLightbulb /> Menu Lite
            </Link>
          </li>
        </ul>
      )}

      {isMobile && menuOpen && (
        <div ref={menuRef} style={styles.dropdown}>
          <ul style={styles.menuList}>
            <li onClick={() => scrollToSection("home")} style={styles.menuItem}>
              <FaHome /> Home
            </li>
            <li onClick={() => scrollToSection("menu")} style={styles.menuItem}>
              <FaUtensils /> Menu
            </li>
            <li
              onClick={() => scrollToSection("footer")}
              style={styles.menuItem}
            >
              <FaPhone /> Contact
            </li>
            <li>
              <Link
                to="/simple-menu"
                onClick={() => setMenuOpen(false)}
                style={{ ...styles.menuItem, textDecoration: "none" }}
              >
                <FaLightbulb /> Menu Lite
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: "#ffe8cc",
    padding: "10px 20px",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
  },
  logoImg: {
    height: "40px",
  },
  logoText: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "black",
    fontFamily: "'Great Vibes', cursive",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
    listStyle: "none",
    margin: 0,
    padding: 0,
    cursor: "pointer",
  },
  hamburger: {
    color: "white",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "60px",
    left: 0,
    width: "100%",
    backgroundColor: "#ffe8cc",
    transition: "0.3s",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
  menuList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  menuItem: {
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    color: "black",
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Navbar;
