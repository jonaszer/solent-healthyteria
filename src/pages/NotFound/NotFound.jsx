import React from "react";
import NavBar from "../../components/Navigation/NavBar";
import Footer from "../../components/Footer/Footer";
import "./notFound.css";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <NavBar />
      <div className="not-found-container">
        <h2>ERROR</h2>
        <h1>404</h1>
        <div className="not-found-line"></div>
        <h3>SORRY, THE PAGE YOU WERE LOOKING FOR DOES NOT EXIST!</h3>
        <h4>PLEASE USE THE PAGES AVAILABLE ON THE MENU.</h4>
        <div className="not-found-line"></div>
        <Link to={"/index"}>
          <img src={Logo} alt="Logo" className="not-found-logo" />
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
