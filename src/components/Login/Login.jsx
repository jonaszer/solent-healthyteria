import React, { useContext, useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import {
  FacebookRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Google from "../../assets/google.png";
import { auth, facebookProvider, provider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

const Login = ({ onClose }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [toggleEye, setToggleEye] = useState(false);
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();

  const { currentUser, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      navigate("/index");
    }
  }, [currentUser, navigate]);

  const handleToggle = () => {
    setToggleEye(!toggleEye);
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      const user = userCredential.user;
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error });
    }
  };

  const signInWithGoogle = () => {
    dispatch({ type: "LOGIN_START" });
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILURE", payload: error });
      });
  };

  const signInWithFacebook = () => {
    dispatch({ type: "LOGIN_START" });
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILURE", payload: error });
      });
  };

  return (
    <>
      <div className="login">
        <div className="login-overlay" onClick={onClose}></div>
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

          <button className="submit-button" type="submit" onClick={handleLogin}>
            Proceed
          </button>
          <div className="line"></div>
          <div className="media-options">
            <button className="facebook" onClick={signInWithFacebook}>
              <FacebookRounded
                className="facebook-icon"
                style={{ width: "30px", height: "30px" }}
              />
              <span>Login with Facebook</span>
            </button>
          </div>
          <div className="media-options">
            <button className="facebook google" onClick={signInWithGoogle}>
              <img src={Google} alt="Google Icon" className="google-img" />
              <span>Login with Google</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
