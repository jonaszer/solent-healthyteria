import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import {
  FacebookRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Google from "../../assets/google.png";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [toggleEye, setToggleEye] = useState(false);
  const [inputType, setInputType] = useState("password");

  const handleToggle = (e) => {
    setToggleEye(!toggleEye);
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(inputs);

  return (
    <div className="login">
      <form>
        <h2>Sign In</h2>
        <div className="form-input">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <input
            type={inputType}
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <div className="eye-icon" onClick={handleToggle}>
            {toggleEye ? <Visibility /> : <VisibilityOff />}
          </div>
        </div>

        <button type="submit">Sign In</button>

        <div className="form-link">
          <span>Not a member yet?</span>
          <Link
            to={"/register"}
            className="form-signup"
            style={{ textDecoration: "none" }}>
            {" "}
            Sign Up
          </Link>
        </div>
        <div className="line"></div>
        <div className="media-options">
          <Link to="#" className="facebook" style={{ textDecoration: "none" }}>
            <FacebookRounded
              className="facebook-icon"
              style={{ width: "30px", height: "30px" }}
            />
            <span>Login with Facebook</span>
          </Link>
        </div>
        <div className="media-options">
          <Link
            to="#"
            className="facebook google"
            style={{ textDecoration: "none" }}>
            <img src={Google} alt="Google Icon" className="google-img" />
            <span>Login with Google</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
