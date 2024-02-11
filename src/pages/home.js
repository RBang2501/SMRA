import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
import '../Styles/LoginForm.css'; // Import custom CSS file

const Home = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmitLogin(e) {
    e.preventDefault();

    try {
      await login(emailRef.current.value, passwordRef.current.value);
      if (emailRef.current.value === "admin@gmail.com") {
        // You can set isAdmin in the context or use local state
        // For simplicity, let's use local state here
        // isAdmin = true;
        // setLoginData((prevData) => ({
        //   ...prevData,
        //   isAdmin: true,
        // }));
      }
      navigate("/admin-dashboard/Auction");
    } catch {
      console.error("Incorrect Username or Password");
    }
  }

  return (
    <div className="container">
      <div className="form-container">
        <div className="left">
          <img
            src={require('../Assets/auction-services.png')}
            alt="Company Logo"
            className="logo"
          />
        </div>
        <div className="right">
          <form onSubmit={handleSubmitLogin}>
            <h2>Login</h2>
            
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" ref={emailRef} placeholder="narendramodi@bjp.gov.in" required />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" ref={passwordRef} placeholder="********" required />
            </div>
            <button type="submit">Sign In</button>
          </form>
          <div className="links">
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
