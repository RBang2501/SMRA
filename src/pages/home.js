// Home.js
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/LoginForm.css'; // Import custom CSS file

const Home = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
    userType: "company",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function handleSubmitLogin(e) {
    e.preventDefault();

    try {
      await login(emailRef.current.value, passwordRef.current.value);
      if (emailRef.current.value === "admin@gmail.com") {
        // You can set isAdmin in the context or use local state
        // For simplicity, let's use local state here
        // isAdmin = true;
        setLoginData((prevData) => ({
          ...prevData,
          isAdmin: true,
        }));
      }
      navigate("/admin-dashboard/Auction");
    } catch {
      console.error("Incorrect Username or Password");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "80%",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        {/* Left Box (Image) */}
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#f0f0f0" }}>
          <img
            src="https://example.com/your-image.jpg"
            alt="Company Logo"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "200px",
              maxHeight: "200px",
            }}
          />
        </div>
        {/* Right Box (Login Form) */}
        <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
          <form onSubmit={handleSubmitLogin}>
            <h2>Login</h2>
            <label>
              Name:
              <input
                type="text"
                ref={emailRef}
                name="name"
                value={loginData.name}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                ref={passwordRef}
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </label>
            <br />
            <label>
              Type:
              <select
                name="userType"
                value={loginData.userType}
                onChange={handleChange}
              >
                <option value="company">Company</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <br />
            <label>
              Remember Me:
              <input
                type="checkbox"
                name="rememberMe"
                checked={loginData.rememberMe}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="submit">Sign In</button>
          </form>
          <div style={{ marginTop: "20px" }}>
            <p>
              <Link to="/forgot-password">Forgot Password</Link>
            </p>
            <p>
              <Link to="/register-company">Register Company</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
