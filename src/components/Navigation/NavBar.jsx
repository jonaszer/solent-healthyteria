import React, { useState } from "react";
import "./navBar.css";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import MobileNavOverlay from "./MobileNavOverlay";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div class="nav-items">
          <div>
            <Link to={"/"}>
              <img className="nav-logo" src={Logo} alt="Logo" />
            </Link>
          </div>
          <ul className="nav-links">
            <Link className="link" to={"/"}>
              HOME
            </Link>
            <Link className="link" to={"/menu"}>
              MENU
            </Link>
            <Link className="link" to={"/register"}>
              LOGIN
            </Link>
          </ul>
          <svg
            className="hamburger-menu"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            onClick={toggleMenu}>
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </div>
      </nav>
      {menuOpen && <MobileNavOverlay onClose={toggleMenu} />}
    </>
  );
};

export default NavBar;
