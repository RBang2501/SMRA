// Home.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    // Assuming you have a route for adminDashboard and companyDashboard
    const route = loginData.userType === 'admin' ? `/admin-dashboard/${loginData.name}` : `/company-dashboard/${loginData.name}`;
    navigate(route, { state: { name: loginData.name } });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ display: 'flex', width: '80%', border: '1px solid #ccc', borderRadius: '10px' }}>
        {/* Left Box (Image) */}
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f0f0f0' }}>
          <img
            src="https://example.com/your-image.jpg"  // Replace with the actual image URL
            alt="Company Logo"
            style={{ width: '100%', height: 'auto', maxWidth: '200px', maxHeight: '200px' }}
          />
        </div>
        {/* Right Box (Login Form) */}
        <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
              Name:
              <input type="text" name="name" value={loginData.name} onChange={handleChange} required />
            </label>
            <br />
            <label>
              Password:
              <input type="password" name="password" value={loginData.password} onChange={handleChange} required />
            </label>
            <br />
            <label>
              Type:
              <select name="userType" value={loginData.userType} onChange={handleChange}>
                <option value="company">Company</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <br />
            <label>
              Remember Me:
              <input type="checkbox" name="rememberMe" checked={loginData.rememberMe} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Sign In</button>
          </form>
          <div style={{ marginTop: '20px' }}>
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
