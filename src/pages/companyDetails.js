import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../Styles/LoginForm.css'; // Import custom CSS file

const CompanyDetails = () => {
  const { auctionName, companyName } = useParams(); // Get auctionName and companyName from URL parameters
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Add logic to handle form submission
    console.log("Form submitted");
    
    // Navigate to CompanyAuction page with auctionName and companyName parameters
    navigate(`/auction/${auctionName}/companyAuction/${companyName}`);
  };

  return (
    <div>
      <h1>Company Details Page!</h1>
      <button onClick={handleSubmit} style={{ marginLeft: '50px' }}>Submit</button>
    </div>
  );
};

export default CompanyDetails;
