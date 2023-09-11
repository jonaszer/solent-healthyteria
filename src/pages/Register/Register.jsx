import React, { useState } from "react";
import "./register.css";
import FormInput from "../../components/FormInput/FormInput";
import { Link } from "react-router-dom";
import { FacebookRounded } from "@mui/icons-material";
import Google from "../../assets/google.png";

const Register = () => {
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
  console.log(inputValues);

  return (
    <div className="register">
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
        <button type="submit">Register</button>

        <div className="form-link">
          <span>Already have an account?</span>
          <Link
            to={"/login"}
            className="form-signup"
            style={{ textDecoration: "none" }}>
            {" "}
            Sign In
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

export default Register;
