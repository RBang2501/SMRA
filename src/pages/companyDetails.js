import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../Styles/CompanyDetails.css'; // Import custom CSS file
import { getDatabase, ref, set } from "firebase/database";

const CompanyDetails = () => {
  const { auctionName, companyName } = useParams(); // Get auctionName from URL parameters
  const navigate = useNavigate();
  
  // State variables to store form data, modal visibility, and eligibility points
  const [companyValuationInput, setCompanyValuationInput] = useState("");
  const [bankGuaranteeInput, setBankGuaranteeInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [eligibilityPoints, setEligibilityPoints] = useState(0);

  // State variables for holding form and holding cards
  const [holdingsForm, setHoldingsForm] = useState({
    holdingUP: "",
    holdingP: "",
    region: "",
    year: "",
    frequencyBand: "", // New field: frequency band
    blockSize: "" // New field: block size
  });
  const [holdingCards, setHoldingCards] = useState([]);

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

    set(ref(db, `Auctions/${auctionName}/CompanyPortfolio/${companyName}/Holding/`), {
           holdingCards,
        });
    navigate(`/auction/${auctionName}/companyAuction/${companyName}`);
  };

  const handleHoldingsFormSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle holding form submission
    console.log("Holdings form submitted:", holdingsForm);
    // Add the new holding data to the holding cards array
    setHoldingCards([...holdingCards, holdingsForm]);
    // Reset holding form fields
    setHoldingsForm({
      holdingUP: "",
      holdingP: "",
      region: "",
      year: "",
      frequencyBand: "",
      blockSize: ""
    });
  };

  const handleHoldingsInputChange = (e) => {
    const { name, value } = e.target;
    setHoldingsForm({
      ...holdingsForm,
      [name]: value
    });
  };

  return (
    <div className="company-details-container">
      <div className="left-section">
        <h1>Company Details Page!</h1>
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
        <button onClick={handleSubmit}>Submit</button>
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
        {/* Add Holdings Form */}
        <div className="holdings-form">
          <h2>Add Holdings</h2>
          <form onSubmit={handleHoldingsFormSubmit}>
            <div className="form-group">
              <label htmlFor="holdingUP">Holdings Unpaired:</label>
              <input
                type="text"
                id="holdingUP"
                name="holdingUP"
                value={holdingsForm.holdingUP}
                onChange={handleHoldingsInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="holdingP">Holdings Paired:</label>
              <input
                type="text"
                id="holdingP"
                name="holdingP"
                value={holdingsForm.holdingP}
                onChange={handleHoldingsInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="region">Region:</label>
              <input
                type="text"
                id="region"
                name="region"
                value={holdingsForm.region}
                onChange={handleHoldingsInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year:</label>
              <input
                type="text"
                id="year"
                name="year"
                value={holdingsForm.year}
                onChange={handleHoldingsInputChange}
                required
              />
            </div>
            {/* New Fields */}
            <div className="form-group">
              <label htmlFor="frequencyBand">Frequency Band:</label>
              <input
                type="text"
                id="frequencyBand"
                name="frequencyBand"
                value={holdingsForm.frequencyBand}
                onChange={handleHoldingsInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="blockSize">Block Size:</label>
              <input
                type="text"
                id="blockSize"
                name="blockSize"
                value={holdingsForm.blockSize}
                onChange={handleHoldingsInputChange}
                required
              />
            </div>
            {/* End of New Fields */}
            <button type="submit">Add Holdings</button>
          </form>
        </div>
      </div>
      <div className="right-section">
        <div className="holdings-cards">
          <h2>Holdings Cards</h2>
          {holdingCards.map((holding, index) => (
            <div className="holding-card" key={index}>
              <p>Holdings Unpaired: {holding.holdingUP}</p>
              <p>Holdings Paired: {holding.holdingP}</p>
              <p>Region: {holding.region}</p>
              <p>Year: {holding.year}</p>
              {/* New Fields */}
              <p>Frequency Band: {holding.frequencyBand}</p>
              <p>Block Size: {holding.blockSize}</p>
              {/* End of New Fields */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;