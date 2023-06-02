import React, { useState } from "react";
import axios from "axios";
import "./signup.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    mobilenumber: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // First name validation
    if (formData.firstname.trim().length < 5) {
      errors.firstname = "First name must be at least 5 characters";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
      isValid = false;
    }

    // Password validation
    if (formData.password.trim().length < 5) {
      errors.password = "Password must be at least 5 characters";
      isValid = false;
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{5,}$/.test(
        formData.password
      )
    ) {
      errors.password =
        "Password must be at least 5 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:3003/auth/signup",
          formData
        );

        if (response.status === 201) {
          setSuccessMessage(response.data.message);
          setFormData({
            firstname: "",
            lastname: "",
            mobilenumber: "",
            email: "",
            password: "",
          });
        }
      } catch (error) {
        if (error.response) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ message: "Error occurred while signing up" });
        }
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
          {errors.firstname && <span>{errors.firstname}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobilenumber">Mobile Number</label>
          <input
            type="tel"
            id="mobilenumber"
            name="mobilenumber"
            value={formData.mobilenumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <button type="submit">Sign up</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default SignUp;
