// CompanyAuction.js
import React, { useState, useEffect } from "react";
import { cartItemsList } from './cartData';
import Tab from './Tab';

const CompanyAuction = () => {
  console.log('Cart Items:', cartItemsList);

  const companyDetails = {
    companyName: "Sample Company",
    netWorth: "$1,000,000",
    eligibilityScore: 80,
    currentHoldings: [
      { operator: "RJio", region: "Delhi", holdingUP: 10, holdingP: 0, year: 2022 },
      { operator: "RJio", region: "Tamil Nadu", holdingUP: 0, holdingP: 10, year: 2021},
      { operator: "RJio", region: "Kerala", holdingUP: 10, holdingP: 0, year: 2016 },
    ],
    itemsOnBid: [
      { operator: "Delhi", frequencyBand: "700 Mhz", unpaired: 10, paired: 0, reservePrice: 200 },
      { operator: "Tamil Nadu", frequencyBand: "800 Mhz", unpaired: 0, paired: 10, reservePrice: 200 },
      { operator: "Kerala", frequencyBand: "900 Mhz", unpaired: 10, paired: 0, reservePrice: 200 },
    ],
  };

  const [selectedHoldings, setSelectedHoldings] = useState([]);
  const [editedQuantities, setEditedQuantities] = useState(new Array(cartItemsList.length).fill(1));

  useEffect(() => {
    // Update the editedQuantities array length when cartItemsList changes
    setEditedQuantities(new Array(cartItemsList.length).fill(1));
  }, [cartItemsList]);

  // const handleSelect = (index) => {
  //   const updatedSelectedHoldings = [...selectedHoldings];
  //   updatedSelectedHoldings[index] = !updatedSelectedHoldings[index];
  //   setSelectedHoldings(updatedSelectedHoldings);
  // };

  // const handleDeselect = (index) => {
  //   const updatedSelectedHoldings = [...selectedHoldings];
  //   updatedSelectedHoldings[index] = false;
  //   setSelectedHoldings(updatedSelectedHoldings);
  // };

  // const handleholdingUPChange = (index, value) => {
  //   const updatedQuantities = [...editedQuantities];
  //   updatedQuantities[index] = value;
  //   setEditedQuantities(updatedQuantities);
  // };

  const handleSubmitRound = () => {
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
              <h3>{holding.operator}</h3>
              <p>region: {holding.region}</p>
              <p>holdingUP: {holding.holdingUP}</p>
              <p>holdingP: {holding.holdingP}</p>
              <p>year: {holding.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Box: List of Holdings to be Auctioned */}
      <div style={{ flex: 1, border: "1px solid #ccc", padding: "10px" }}>
        <h2>Items on Bid</h2>
        {/* <div>
          {companyDetails.itemsOnBid.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
                backgroundColor: selectedHoldings[index] ? "#ccc" : "white",
              }}
            >
              <h3>{item.operator}</h3>
              <p>Freq Band: {item.frequencyBand}</p>
              <p>Unpaired: {item.unpaired}</p>
              <p>Paired: {item.paired}</p>
              <p>Reserve Price: {item.reservePrice}</p>
              <label>holdingUP:</label>
              <input
                type="number"
                value={editedQuantities[index]}
                onChange={(e) => handleholdingUPChange(index, e.target.value)}
              />
              <button onClick={() => handleSelect(index)}>Yes</button>
              <button onClick={() => handleDeselect(index)}>No</button>
            </div>
          ))}
        </div> */}
        <Tab items={companyDetails.itemsOnBid} />
        <button onClick={handleSubmitRound}>Submit Round</button>
      </div>
    </div>
  );
};

export default CompanyAuction;


// CompanyAuction.js

// import React, { useState } from 'react'; 
// import Tab from './Tab';

// const companyDetails = {
//     companyName: "Sample Company",
//     netWorth: "$1,000,000",
//     eligibilityScore: 80,
//     currentHoldings: [
//       { operator: "RJio", region: "Delhi", holdingUP: 10, holdingP: 0, year: 2022 },
//       { operator: "RJio", region: "Tamil Nadu", holdingUP: 0, holdingP: 10, year: 2021},
//       { operator: "RJio", region: "Kerala", holdingUP: 10, holdingP: 0, year: 2016 },
//     ],
//     itemsOnBid: [
//       { operator: "Delhi", frequencyBand: "700 Mhz", unpaired: 10, paired: 0, reservePrice: 200 },
//       { operator: "Tamil Nadu", frequencyBand: "700 Mhz", unpaired: 0, paired: 10, reservePrice: 200 },
//       { operator: "Kerala", frequencyBand: "700 Mhz", unpaired: 10, paired: 0, reservePrice: 200 },
//     ],
//   };

// const CompanyAuction = ({ companyDetails }) => {

//   const [bidQuantities, setBidQuantities] = useState({});

//   const handleBidChange = (operator, value) => {
//     setBidQuantities({
//       ...bidQuantities,
//       [operator]: value
//     });
//   }

//   const handleSubmit = () => {
//     console.log('Submitted bids:', bidQuantities);
//   }

//   return (
//     <div>
//       <Tab items={companyDetails.itemsOnBid} />

//       {companyDetails.itemsOnBid.map(item => (
//         <div key={item.operator}>
//           <label>{item.operator}</label>
//           <input 
//             type="number"
//             value={bidQuantities[item.operator] || ''}
//             onChange={e => handleBidChange(item.operator, e.target.value)} 
//           />
//         </div>
//       ))}

//       <button onClick={handleSubmit}>Submit Bids</button>
//     </div>
//   );
// }

// export default CompanyAuction;