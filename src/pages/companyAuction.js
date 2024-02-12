// CompanyAuction.js

import React, { useState, useEffect } from "react";
import Tab1 from './Tab1';
import '../Styles/CompanyAuction.css'
import { getDatabase, ref, onValue } from "firebase/database";

const CompanyAuction = () => {
  const [itemsOnBid, setItemsOnBid] = useState([]);

  const companyDetails = {
    companyName: "Sample Company",
    netWorth: "$1,000,000",
    eligibilityScore: 80,
    currentHoldings: [
      { operator: "RJio", region: "Delhi", holdingUP: 10, holdingP: 0, year: 2022 },
      { operator: "RJio", region: "Tamil Nadu", holdingUP: 0, holdingP: 10, year: 2021 },
      { operator: "RJio", region: "Kerala", holdingUP: 10, holdingP: 0, year: 2016 },
    ],
  };

  useEffect(() => {
    fetchItemsOnBid();
    // console.log(itemsOnBid);
  }, []);

  const fetchItemsOnBid = () => {
    const db = getDatabase();
    const itemsRef = ref(db, 'Auctions/Instance1/Items');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      var newItemsOnBid = [];
      if (data) {
        Object.keys(data).forEach((freqBand) => {
          Object.keys(data[freqBand]).forEach((region) => {
            const newItem = {
              operator: region,
              frequencyBand: freqBand,
              unpaired: data[freqBand][region].unpairedBlocks,
              paired: data[freqBand][region].pairedBlocks,
              reservePrice: data[freqBand][region].reservedPrice,
              // epPerBlock: data[freqBand][region].epPerBlock
            };
            newItemsOnBid.push(newItem);
          });
        });
        console.log("This", newItemsOnBid);
        setItemsOnBid(newItemsOnBid);
        
        console.log(itemsOnBid);
      }
    });
  };

  const handleSubmitRound = () => {
    console.log("Round Submitted!");
  };

  const [activeTab, setActiveTab] = useState('tab1');

  const Tab = ({title, active, onClick}) => (
    <button 
      className={active ? 'tab active' : 'tab'}
      onClick={onClick}
    >
      {title}
    </button>
  );

  const Tab1Content = () => (
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
  );
          // console.log("this", itemsOnBid)
  return (
    <div style={{ display: "flex", justifyContent: "space-between"}}>
      <div className="mainleft">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1>Information Center</h1>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
              <div style={{ padding: '10px' }}>
                <Tab 
                  title="Company Portfolio"
                  active={activeTab === 'tab1'}
                  onClick={() => setActiveTab('tab1')}
                />
              </div>
              <div style={{ padding: '10px' }}>
                <Tab
                  title="Participants"
                  active={activeTab === 'tab2'}
                  onClick={() => setActiveTab('tab2')}
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
              {/* Render other tab contents if needed */}
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, border: "1px solid #007bff", paddingLeft: "20px",
        paddingBottom:"20px", borderRadius:"10px", maxHeight:"94vh", marginTop:"1vh", marginRight:"1vh"}}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>Items On Bid</h1>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
          <Tab1 items={itemsOnBid} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button onClick={handleSubmitRound}>Submit Round</button>
        </div>
      </div>
    </div>
  );
};

export default CompanyAuction;
