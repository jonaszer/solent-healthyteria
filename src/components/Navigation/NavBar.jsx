import React, { useContext, useEffect, useState } from "react";
import "./navBar.css";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import MobileNavOverlay from "./MobileNavOverlay";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../../assets/avatar.png";
import { FaShoppingCart } from "react-icons/fa";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let lastScrollTop = 0;

    function handleScroll() {
      let currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const navbar = document.querySelector(".navbar");

      if (navbar) {
        // Ensure navbar exists
        if (currentScrollTop > lastScrollTop) {
          // User is scrolling down
          navbar.classList.add("navbar-hidden");
        } else {
          // User is scrolling up
          navbar.classList.remove("navbar-hidden");
        }
      }

      lastScrollTop = currentScrollTop;
    }

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const cart = (
    <span className="cart">
      <Link className="link" to={"/cart"}>
        Cart
        <FaShoppingCart size={20} style={{ marginLeft: 5 }} />
        <p>0</p>
      </Link>
    </span>
  );

  return (
    <>
      <nav className="navbar">
        <div className="nav-items">
          <div>
            <Link to={"/index"}>
              <img className="nav-logo" src={Logo} alt="Logo" />
            </Link>
          </div>
          <div className="menu-profile-wrapper">
            <ul className="nav-links">
              <Link className="link" to={"/index"}>
                Menu
              </Link>
              {cart}
            </ul>
            <div className="profile">
              <img
                className="profile-img"
                src={currentUser.photoURL ? currentUser.photoURL : Avatar}
                alt="Profile"
              />
              <div className="name-signout-wrapper">
                <span className="profile-name">{currentUser.displayName}</span>
                {
                  <Link
                    to="#"
                    className="sign-out"
                    onClick={handleLogout}>{`( Sign Out )`}</Link>
                }
              </div>
            </div>
          </div>
          <span className="mobile-cart">{cart}</span>
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
