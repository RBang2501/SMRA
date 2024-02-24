import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../Styles/CompanyDetails.css'; // Import custom CSS file
import { getDatabase, ref, set } from "firebase/database";

const CompanyDetails = () => {
  const { auctionName, companyName } = useParams(); // Get auctionName from URL parameters
  const navigate = useNavigate();
  
  // State variables to store form data, modal visibility, and eligibility points
  // const [companyNameInput, setCompanyNameInput] = useState("");
  const [companyValuationInput, setCompanyValuationInput] = useState("");
  const [bankGuaranteeInput, setBankGuaranteeInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [eligibilityPoints, setEligibilityPoints] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    console.log("Form submitted");
    // Calculate eligibility points
    const calculatedEligibilityPoints = parseFloat(bankGuaranteeInput) * 0.1; // 10% of bank guarantee
    setEligibilityPoints(calculatedEligibilityPoints);
    // Show confirmation modal
    setShowModal(true);
  };

  const handleConfirm = () => {
    // Navigate to CompanyAuction page with auctionName parameter
    const db = getDatabase();
    set(ref(db, `Auctions/${auctionName}/CompanyPortfolio/${companyName}`), {
          valuation: companyValuationInput,
          bankGuarantee: bankGuaranteeInput,
          totalEligibilityPoints: eligibilityPoints,
      });
    navigate(`/auction/{auctionName}/companyAuction/${companyName}`);
  };

  return (
    <div className="centered-form">
      <h1>Company Details Page!</h1>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="companyValuation">Company Valuation:</label>
          <input
            type="text"
            id="companyValuation"
            value={companyValuationInput}
            onChange={(e) => setCompanyValuationInput(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bankGuarantee">Bank Guarantee:</label>
          <input
            type="text"
            id="bankGuarantee"
            value={bankGuaranteeInput}
            onChange={(e) => setBankGuaranteeInput(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{`With the given bank guarantee, you will get ${eligibilityPoints} eligibility points.`}</p>
            <div>
              <button onClick={handleConfirm}>Confirm</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
