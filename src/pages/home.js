/*
Imports: 
React and its hooks (useRef, useEffect).
Link and useNavigate from "react-router-dom".
The useAuth hook from "./authContext".
Custom CSS file for styling.
Component Functionality:
The Home component renders a login form and handles user authentication.
It uses the useAuth hook to access authentication-related functions and the current user state.
Two refs (emailRef and passwordRef) are used to capture user input from the email and password fields.
The useEffect hook runs after the component mounts and whenever the currentUser state changes. It checks if there is a current user. If not, it navigates the user back to the homepage (/).
The handleSubmitLogin function is called when the user submits the login form. It prevents the default form submission behavior, extracts the email and password from the input fields, attempts to log in the user using the login function from the authentication context, and then navigates the user to the appropriate page based on their company.
The extractCompanyName function extracts the company name from the user's email address. It splits the email address at the "@" symbol, then further splits the first part of the email (before the "@") at the "." symbol to isolate the company name.
HTML Structure:
The component's HTML structure includes a container div, a form container div with left and right sections, and a form for user login.
The form contains input fields for email and password, with placeholders and labels for each field.
There is a submit button to submit the form.
Styling:
The component applies custom CSS classes for styling, including container layout, form layout, input styles, and logo display.
*/
import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";
import '../Styles/LoginForm.css'; // Import custom CSS file

const Home = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { currentUser } = useAuth();


  useEffect(() => {
    console.log(currentUser);
    if (!currentUser) {
      navigate(`/`);
    }
  }, [currentUser]);

  async function handleSubmitLogin(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await login(email, password);

      // Extract companyName from email
      const companyName = extractCompanyName(email);

      // Navigate to the appropriate page based on company
      navigate(`selectAuction/${companyName}`);
    } catch (error) {
      console.error("Login failed:", error);
      window.alert("Incorrect username or password. Please try again.");
    }
  }

  // Function to extract company name from email
  function extractCompanyName(email) {
    // Split the email address at the "@" symbol
    const parts = email.split("@");
    
    // Get the first part of the split (before the "@")
    const companyNameWithEmailProvider = parts[0];
    
    // Split the first part of the email at the "."
    const companyParts = companyNameWithEmailProvider.split(".");
    
    // Get the first part of the split (company name)
    const companyName = companyParts[0];
    
    return companyName;
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
          {/* <div className="links">
            <p>
              <Link to="/forgot-password">Forgot Password</Link>
            </p>
            <p>
              <Link to="/register-company">Register Company</Link>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
