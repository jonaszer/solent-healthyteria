import React from "react";
import "./footer.css";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className="footer">
      Copyright &#169; {year} Jonas Zeringis. All Rights Reserved
    </div>
  );
};

export default Footer;
