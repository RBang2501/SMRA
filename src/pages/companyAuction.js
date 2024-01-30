// CompanyAuction.js
import React, { useState } from "react";

const CompanyAuction = () => {
  // Sample data for company details and holdings
  const companyDetails = {
    companyName: "Sample Company",
    netWorth: "$1,000,000",
    eligibilityScore: 80,
    currentHoldings: [
      { itemName: "Holding 1", price: "$150", quantity: 12 },
      { itemName: "Holding 2", price: "$80", quantity: 8 },
      { itemName: "Holding 3", price: "$200", quantity: 10 },
    ],
  };

  const [selectedHoldings, setSelectedHoldings] = useState([]);
  const [editedQuantities, setEditedQuantities] = useState(new Array(companyDetails.currentHoldings.length).fill(1));
  const holdingsToAuction = [
    { itemName: "Item 1", price: "$100" },
    { itemName: "Item 2", price: "$50" },
    { itemName: "Item 3", price: "$200" },
  ];

  const handleSelect = (index) => {
    const updatedSelectedHoldings = [...selectedHoldings];
    updatedSelectedHoldings[index] = !updatedSelectedHoldings[index];
    setSelectedHoldings(updatedSelectedHoldings);
  };

  const handleDeselect = (index) => {
    const updatedSelectedHoldings = [...selectedHoldings];
    updatedSelectedHoldings[index] = false;
    setSelectedHoldings(updatedSelectedHoldings);
  };

  const handleQuantityChange = (index, value) => {
    const updatedQuantities = [...editedQuantities];
    updatedQuantities[index] = value;
    setEditedQuantities(updatedQuantities);
  };

  const handleSubmitRound = () => {
    // Perform actions when submitting the round
    console.log("Round Submitted!");
    console.log("Selected Holdings:", selectedHoldings);
    console.log("Edited Quantities:", editedQuantities);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* Left Box: Company Details */}
      <div style={{ flex: 1, border: "1px solid #ccc", padding: "10px" }}>
        <h2>Company Portfolio</h2>
        <p>Company Name: {companyDetails.companyName}</p>
        <p>Net Worth: {companyDetails.netWorth}</p>
        <p>Eligibility Score: {companyDetails.eligibilityScore}</p>
        <p>Current Holdings:</p>
        <div>
          {companyDetails.currentHoldings.map((holding, index) => (
            <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
              <h3>{holding.itemName}</h3>
              <p>Price: {holding.price}</p>
              <p>Quantity: {holding.quantity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Box: List of Holdings to be Auctioned */}
      <div style={{ flex: 1, border: "1px solid #ccc", padding: "10px" }}>
        <h2>Round 1</h2>
        <div>
          {holdingsToAuction.map((holding, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
                backgroundColor: selectedHoldings[index] ? "#ccc" : "white",
              }}
            >
              <h3>{holding.itemName}</h3>
              <p>Price: {holding.price}</p>
              <label>Quantity:</label>
              <input
                type="number"
                value={editedQuantities[index]}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
              />
              <button onClick={() => handleSelect(index)}>Yes</button>
              <button onClick={() => handleDeselect(index)}>No</button>
            </div>
          ))}
        </div>
        <button onClick={handleSubmitRound}>Submit Round</button>
      </div>
    </div>
  );
};

export default CompanyAuction;
