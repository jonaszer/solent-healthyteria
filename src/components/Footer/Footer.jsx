import React from "react";
import "./footer.css";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className="footer">
      <p>Copyright &#169; {year} Jonas Zeringis. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
