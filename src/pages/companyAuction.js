// CompanyAuction.js

import React, { useState, useEffect } from "react";
import { cartItemsList } from './cartData';
import Tab1 from './Tab1';
import '../Styles/CompanyAuction.css'
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
      { operator: "Karnataka", frequencyBand: "700 Mhz", unpaired: 20, paired: 0, reservePrice: 200 },
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

  const [activeTab, setActiveTab] = useState('tab1');

  function Tab({title, active, onClick}) {

  return (
    <button 
      className={active ? 'tab active' : 'tab'}
      onClick={onClick}
    >
      {title}
    </button>
  )

}

function Tab1Content() {
  return(
    <div className="portfolio-container">
    <h2>Company Portfolio</h2>
    <p>Company Name: {companyDetails.companyName}</p>
    <p>Net Worth: {companyDetails.netWorth}</p>
    <p>Eligibility Score: {companyDetails.eligibilityScore}</p>
    <p>Current Holdings:</p>
    <div className="contains-Tabcontent">
      {companyDetails.currentHoldings.map((holding, index) => (
        <div key={index} className="holding-container">
          <h3>{holding.operator}</h3>
          <p>region: {holding.region}</p>
          <p>holdingUP: {holding.holdingUP}</p>
          <p>holdingP: {holding.holdingP}</p>
          <p>year: {holding.year}</p>
        </div>
      ))}
    </div> 
  </div>

  )
}

function Tab2Content() {
  return <div>Tab 2 content</div>
} 

function Tab3Content() {
  return <div>Tab 3 content</div>
}



  return (
    <div style={{ display: "flex", justifyContent: "space-between"}}>
      <div className = "mainleft">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

              <h1>Information Center</h1>
            <div>
            
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
              <div style={{ padding: '10px' }}>
                <Tab 
                title="Company Portfolio"
                active={activeTab === 'tab1'}
                onClick={() => setActiveTab('tab1')}
                // Add margin-right to the first tab
              />
              </div>
            
              <div style={{ padding: '10px' }}>
                <Tab
                title="Participants"
                active={activeTab === 'tab2'}
                onClick={() => setActiveTab('tab2')}
                // Add margin-right to the second tab
              />
              </div>
            
              <div style={{ padding: '10px' }}>
                <Tab 
                title="Round Details"
                active={activeTab === 'tab3'}
                onClick={() => setActiveTab('tab3')}
              />
              </div>
            </div>

            <div className="tab-content">
              {activeTab === 'tab1' && <Tab1Content />}
              {activeTab === 'tab2' && <Tab2Content />}
              {activeTab === 'tab3' && <Tab3Content />}
            </div>
          
          </div>
        </div >
      </div>
        
      

      {/* Right Box: List of Holdings to be Auctioned */}
      {/* <div style={{ display: "flex", justifyContent: "space-between"}}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          <h2>Information Center</h2>
        </div>
      </div> */}
      
      <div style={{ flex: 1, border: "1px solid #007bff", paddingLeft: "20px",
      paddingBottom:"20px", borderRadius:"10px", maxHeight:"94vh", marginTop:"1vh", marginRight:"1vh"}}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>Items On Bid</h1>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
          <Tab1 items={companyDetails.itemsOnBid} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button onClick={handleSubmitRound}>Submit Round</button>
        </div>
      </div>
    </div>

  );
};

export default CompanyAuction;
