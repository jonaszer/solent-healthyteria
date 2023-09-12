import React, { useContext, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FacebookRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Google from "../../assets/google.png";
import { auth, facebookProvider, provider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [toggleEye, setToggleEye] = useState(false);
  const [inputType, setInputType] = useState("password");
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleToggle = (e) => {
    setToggleEye(!toggleEye);
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      signInWithEmailAndPassword(auth, inputs.email, inputs.password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
          //console.log(user);
          navigate("/index");
          window.location.reload();
        }
      );
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  const signInWithGoogle = (e) => {
    dispatch({ type: "LOGIN_START" });
    signInWithPopup(auth, provider)
      .then((result) => {
        //console.log(result);
        const user = result.user;
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        navigate("/index");
        window.location.reload();
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILURE" });
      });
  };

  const signInWithFacebook = (e) => {
    dispatch({ type: "LOGIN_START" });
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        console.log(result);
        const user = result.user;
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        navigate("/index");
        window.location.reload();
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILURE" });
      });
  };

  //console.log(inputs);

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

        <button type="submit" onClick={handleLogin}>
          Sign In
        </button>

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
          <Link
            to="#"
            className="facebook"
            style={{ textDecoration: "none" }}
            onClick={signInWithFacebook}>
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
            style={{ textDecoration: "none" }}
            onClick={signInWithGoogle}>
            <img src={Google} alt="Google Icon" className="google-img" />
            <span>Login with Google</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
