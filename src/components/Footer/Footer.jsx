import React from "react";
import "./footer.css";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return <div className="footer">&#169; {year} All Rights Reserved</div>;
};

export default Footer;
