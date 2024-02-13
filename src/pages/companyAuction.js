// CompanyAuction.js

import React, { useState, useEffect } from "react";
import Tab1 from './Tab1';
import '../Styles/CompanyAuction.css'
import { getDatabase, ref, set, onValue } from "firebase/database";


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
    ]
    // itemsOnBid: [
    //   { operator: "Delhi", frequencyBand: "700 Mhz", unpaired: 10, paired: 0, reservePrice: 200 },
    //   { operator: "Karnataka", frequencyBand: "700 Mhz", unpaired: 20, paired: 0, reservePrice: 200 },
    //   { operator: "Tamil Nadu", frequencyBand: "800 Mhz", unpaired: 0, paired: 10, reservePrice: 200 },
    //   { operator: "Kerala", frequencyBand: "900 Mhz", unpaired: 10, paired: 0, reservePrice: 200 },
    // ],
  };


  useEffect(() => {
    const db = getDatabase();
    const itemsRef = ref(db, 'Auctions/Instance1/Items');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newCartItems = [];
        Object.keys(data).forEach((freqBand) => {
          Object.keys(data[freqBand]).forEach((region) => {
            const newItem = {
              operator: region,
              frequencyBand: freqBand,
              unpaired: data[freqBand][region].unpairedBlocks,
              paired: data[freqBand][region].pairedBlocks,
              reservedPrice: data[freqBand][region].reservedPrice,
              epPerBlock: data[freqBand][region].epPerBlock
            };
            newCartItems.push(newItem);
          });
        });
        setItemsOnBid(newCartItems);
      }
    });
  }, []); // Empty dependency array to run the effect only once on component mount
  

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

  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false);
  const [round, setRound] = useState(0);

  useEffect(() => {
    // Retrieve start time from Firebase
    // const timerDataRef = database.ref('timerData');
    const db = getDatabase();
    const itemsRef= ref(db, 'Auctions/Instance1/timerData');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const intervalId = setInterval(() => {
        const startTime = data.start || 0;
        const currentTime = Date.now();
        const elapsedMilliseconds = currentTime - startTime;
        const remainingMilliseconds = Math.max(0, 60 * 1000 * data.time - elapsedMilliseconds);
        setElapsedTime(remainingMilliseconds);
        setRound(data.round);

        if (remainingMilliseconds > 0) {
          setTimerExpired(false);
          // clearInterval(intervalId);
        }

        if (remainingMilliseconds === 0) {
          setTimerExpired(true);
          clearInterval(intervalId);
        }

      }, 1000)
      return () => {
        // Stop the interval when the component unmounts
        clearInterval(intervalId);
      };
    })

    // Update the elapsed time when the data changes
    // const onDataChange = (snapshot) => {
    //   const startTime = snapshot.val()?.startTime || 0;
    //   const currentTime = Date.now();
    //   const newElapsedTime = currentTime - startTime;
    //   setElapsedTime(newElapsedTime);
    // };

    // timerDataRef.on('value', onDataChange);
    // return () => {
    //   // Stop listening to changes when the component unmounts
    //   timerDataRef.off('value', onDataChange);
    // };
  }, []); // Empty dependency array ensures this effect runs once

  const minutes = Math.floor(elapsedTime / 1000 / 60);
  const seconds = Math.floor((elapsedTime / 1000) % 60);



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
        <div class="timer-box">
          <span id="minutes">{minutes}</span>:<span id="seconds">{seconds}</span>
        </div>
        <div class="timer-box">
          <span id="minutes">{round}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
          <Tab1 items={itemsOnBid} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button disabled={timerExpired} onClick={handleSubmitRound}>Submit Round</button>
        </div>
      </div>
    </div>
  );
};

export default CompanyAuction;
