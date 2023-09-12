import React, { useState } from "react";
import "../TitlePage/title.css";
import Logo from "../../assets/logo.png";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";

const Title = () => {
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const toggleSignIn = () => {
    setSignIn(!signIn);
  };

  const toggleSignUp = () => {
    setSignUp(!signUp);
  };

  return (
    <>
      <div className="title-page">
        <div className="title-container">
          <div className="overlay"></div>
          <div className="logo-container">
            <div className="logo-content">
              <div className="text-wrapper">
                <img className="title-logo" src={Logo} alt="Logo" />
                <h3>
                  Your exclusive portal to wholesome and healthy dining at the
                  University. As a cherished member, you can savor the goodness
                  of nutritious culinary delights. Order your favorite,
                  health-packed meals and treat your body to vitality with every
                  bite. Bon appétit!
                </h3>
                <div className="title-buttons">
                  <button className="title-button" onClick={toggleSignIn}>
                    Sign In
                  </button>
                  <button className="title-button" onClick={toggleSignUp}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {signIn && <Login onClose={toggleSignIn} />}
      {signUp && <Register onClose={toggleSignUp} />}
    </>
  );
};

export default Title;
