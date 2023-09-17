import React, { useContext, useState, useEffect } from "react";
import "./register.css";
import FormInput from "../FormInput/FormInput";
import { useNavigate } from "react-router-dom";
import { FacebookRounded } from "@mui/icons-material";
import Google from "../../assets/google.png";
import { auth, facebookProvider, provider } from "../../firebase";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

const Register = ({ onClose }) => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/index");
    }
  }, [currentUser, navigate]);

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage:
        "Name has to be 3-16 characters without the second name or special characters.",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email must be a valid email address",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password must be minimum 8 characters long and include at least 1 letter and 1 number.",
      pattern: "^[A-Za-z0-9]{8,}$",
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Confirm password must be the exactly same as password.",
      pattern: inputValues.password,
      required: true,
    },
  ];

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (inputValues.password !== inputValues.confirmPassword) {
      console.error("Passwords do not match"); // Or display a user-friendly error message
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputValues.email,
        inputValues.password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: inputValues.name,
      });
    } catch (error) {
      console.error(error.message); // Handle/display error to the user
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
    <div className="register">
      <div className="register-overlay" onClick={onClose}></div>
      <form>
        <h2>Registration</h2>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={inputValues[input.name]}
            onChange={handleChange}
          />
        ))}
        <button className="submit-button" onClick={handleRegister}>
          Submit
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
  );
};

export default Register;
