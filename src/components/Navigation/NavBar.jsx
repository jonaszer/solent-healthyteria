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
  const userImage = currentUser?.photoURL || Avatar;

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cart = (
    <span className="cart">
      <Link className="link" to={"/cart"}>
        Cart
        <FaShoppingCart size={20} style={{ marginLeft: 5 }} />
        <p>{totalItems}</p>
      </Link>
    </span>
  );

  const mobileCart = (
    <span className="cart">
      <Link className="link" to={"/cart"}>
        <FaShoppingCart size={22} style={{ marginLeft: 5 }} />
        <p>{totalItems}</p>
      </Link>
    </span>
  );

  const extractInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0);
    return nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0);
  };

  const userInitials = extractInitials(currentUser?.displayName);

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
              <Link className="link" to={"/my-orders"}>
                Orders
              </Link>
              {cart}
            </ul>
            <div className="profile">
              <img className="profile-img" src={userImage} alt="Profile" />
              <div className="name-signout-wrapper">
                <span className="profile-name full-name">
                  {currentUser?.displayName}
                </span>
                <span className="profile-name initials">{userInitials}</span>
                <Link to="#" className="sign-out" onClick={handleLogout}>
                  ( Sign Out )
                </Link>
              </div>
            </div>
          </div>
          <span className="mobile-cart">{mobileCart}</span>
          <FaBars className="hamburger-menu" onClick={toggleMenu} size={24} />
        </div>
      </nav>
      {menuOpen && <MobileNavOverlay onClose={toggleMenu} />}
    </>
  );
};

export default NavBar;
