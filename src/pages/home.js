import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/LoginForm.css'; // Import custom CSS file

const Home = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    name: '',
    password: '',
    userType: 'company',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const route = loginData.userType === 'admin' ? `/admin-dashboard/${loginData.name}` : `/company-dashboard/${loginData.name}`;
    navigate(route, { state: { name: loginData.name } });
  };

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
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="input-container">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={loginData.name} onChange={handleChange} placeholder="Narendra Modi" required />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={loginData.password} onChange={handleChange} placeholder="******" required />
            </div>
            <div className="input-container">
              <label htmlFor="userType">Type</label>
              <select id="userType" name="userType" value={loginData.userType} onChange={handleChange}>
                <option value="company">Company</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="input-container">
              <input type="checkbox" id="rememberMe" name="rememberMe" checked={loginData.rememberMe} onChange={handleChange} />
              <label htmlFor="rememberMe">Remember Me</label>
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
