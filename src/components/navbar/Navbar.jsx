import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const getLinkClass = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <div className="navbar">
      <Link className="navbar-logo" to="/">
        cryptologia.
      </Link>
      <div className="hamburger" onClick={toggleDrawer}>
        &#9776;
      </div>
      <div className={`navbar-nav ${isOpen ? "open" : ""}`}>
        <Link className={getLinkClass("/")} to="/">
          Home
        </Link>
        <Link className={getLinkClass("/prices")} to="/prices">
          Prices
        </Link>
        <Link className={getLinkClass("/news")} to="/news">
          News
        </Link>
      </div>
    </div>
  );
}
