import React, { useContext, useEffect, useState } from "react";
import "./navBar.css";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import MobileNavOverlay from "./MobileNavOverlay";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../../assets/avatar.png";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const useScrollBehavior = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;

    function handleScroll() {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setHidden(currentScrollTop > lastScrollTop);
      lastScrollTop = currentScrollTop;
    }

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return hidden;
};

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const hidden = useScrollBehavior();
  const { dispatch, currentUser } = useContext(AuthContext);
  const { cart: cartItems } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const userImage = currentUser?.photoURL || Avatar;

  const cart = (
    <span className="cart">
      <Link className="link" to={"/cart"}>
        Cart
        <FaShoppingCart size={20} style={{ marginLeft: 5 }} />
        <p>{cartItems.length}</p>
      </Link>
    </span>
  );

  return (
    <>
      <nav className={`navbar ${hidden ? "navbar-hidden" : ""}`}>
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
              <img className="profile-img" src={userImage} alt="Profile" />
              <div className="name-signout-wrapper">
                <span className="profile-name">{currentUser?.displayName}</span>
                <Link to="#" className="sign-out" onClick={handleLogout}>
                  ( Sign Out )
                </Link>
              </div>
            </div>
          </div>
          <span className="mobile-cart">{cart}</span>
          <FaBars className="hamburger-menu" onClick={toggleMenu} />
        </div>
      </nav>
      {menuOpen && <MobileNavOverlay onClose={toggleMenu} />}
    </>
  );
};

export default NavBar;
