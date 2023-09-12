import React, { useContext } from "react";
import "./mobileNavOverlay.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const MobileNavOverlay = ({ onClose }) => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className="mobile-nav-overlay">
      <svg
        className="close-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        onClick={onClose}>
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
      </svg>
      <ul>
        <li>
          <Link to={"/index"}>HOME</Link>
        </li>
        <li>
          <Link to={"/menu"}>MENU</Link>
        </li>
        <li>
          <Link to={"/cart"}>CART</Link>
        </li>
        <li>
          <span onClick={handleLogout}>
            <Link to={"#"}>SIGN OUT</Link>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default MobileNavOverlay;
