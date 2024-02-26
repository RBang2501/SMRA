// CompanyAuction.js

import React, { useState, useEffect } from "react";
import Tab1 from './Tab1';
import '../Styles/CompanyAuction.css'
import { getDatabase, ref, get, set, onValue } from "firebase/database";
import { useParams } from 'react-router-dom';


const CompanyAuction = () => {
  const { companyName, auctionName} = useParams();
  const [currCompanyEliScore, setCurCompanyEliScore] = useState(0);
  const [curCompanyValuation, setCurCompanyValuation] = useState(0);
  const [curCompanyBankGuarantee, setCurCompanyBankGuarantee] = useState(0);
  const [itemsOnBid, setItemsOnBid] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [EP, setEP] = useState('');  // const [companyDetails, setCompanyDetails] = useState(null);
  const [holdings, setHoldings] = useState([]);

  // Fetch company portfolio data
  useEffect(() => {
    fetchCompanyPortfolio();
  }, [auctionName, companyName]); // Fetch on component mount and when auction or company name changes


  const companyDetails = {
    companyName: companyName,
    netWorth: curCompanyValuation,
    eligibilityScore: currCompanyEliScore,
    bankGuarantee: curCompanyBankGuarantee,
    currentHoldings: holdings.map(holding => ({
      operator: companyName,
      region: holding.region,
      holdingUP: holding.holdingUP,
      holdingP: holding.holdingP,
      year: holding.year
    }))
  };

  const fetchCompanyPortfolio = () =>{
    const db = getDatabase();
    console.log(auctionName, companyName);
    const currentCompany = ref(db, `Auctions/${auctionName}/CompanyPortfolio/${companyName}`);
    onValue(currentCompany, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data);
        console.log(data.Holding.holdingCards[0].region)
        setCurCompanyEliScore(data.totalEligibilityPoints);
        setCurCompanyValuation(data.valuation);
        setCurCompanyBankGuarantee(data.bankGuarantee);
        setHoldings(data.Holding.holdingCards);
      } else {
        // Handle the case where data is null or empty
        console.log("Data is null or empty");
      }
    });
}


  const aja = () =>{
    fetchCompanyPortfolio();
    console.log(currCompanyEliScore);
    console.log(curCompanyBankGuarantee);
    console.log(curCompanyValuation);
    console.log(holdings);
  }



  function calculateDemand() {
    const db = getDatabase();
    const refPath2 = `Auctions/${auctionName}/companyHistory`;
    const itemsRef2 = ref(db, refPath2);
    get((itemsRef2)).then((snapshot) => {
      const data = snapshot.val();
      const itemQuantities = {};
      if(round>1){
    data["companyMapping"]["airtel"][round-1].forEach((item) => {
      const itemId = `${item.operator}-${item.frequencyBand}`;
      if (!itemQuantities[itemId]) {
        itemQuantities[itemId] = 0;
      }
      itemQuantities[itemId] += item.qty;
    });
    data["companyMapping"]["rjio"][round-1].forEach((item) => {
      const itemId = `${item.operator}-${item.frequencyBand}`;
      if (!itemQuantities[itemId]) {
        itemQuantities[itemId] = 0;
      }
      itemQuantities[itemId] += item.qty;
    });
    data["companyMapping"]["bsnl"][round-1].forEach((item) => {
      const itemId = `${item.operator}-${item.frequencyBand}`;
      if (!itemQuantities[itemId]) {
        itemQuantities[itemId] = 0;
      }
      itemQuantities[itemId] += item.qty;
    });
    data["companyMapping"]["att"][round-1].forEach((item) => {
      const itemId = `${item.operator}-${item.frequencyBand}`;
      if (!itemQuantities[itemId]) {
        itemQuantities[itemId] = 0;
      }
      itemQuantities[itemId] += item.qty;
    });
    data["companyMapping"]["vi"][round-1].forEach((item) => {
      const itemId = `${item.operator}-${item.frequencyBand}`;
      if (!itemQuantities[itemId]) {
        itemQuantities[itemId] = 0;
      }
      itemQuantities[itemId] += item.qty;
    });
      // 
      // const rounditem = {
      //   round : round,
      //   data : newCartItems
      // }
      // data["companyMapping"]["airtel"].push(newCartItems);
      // data["companyMapping"]["rjio"].push(newCartItems);
      // data["companyMapping"]["att"].push(newCartItems);
      // data["companyMapping"]["bsnl"].push(newCartItems);
      // data["companyMapping"]["vi"].push(newCartItems);
      // console.log(data["companyMapping"]);
      console.log(itemQuantities);
      setQuantities(itemQuantities);    
  }
    })
  }


  useEffect(()=>{
    const db = getDatabase();
    const refPath= `Auctions/${auctionName}/CompanyPortfolio/${companyName}/totalEligibilityPoints`;
    const itemsRef = ref(db, refPath);
    get((itemsRef)).then((snapshot) => {
      const data = snapshot.val();
      setEP(data);
    });
  },[]) 
  useEffect(() => {
    const db = getDatabase();
    const itemsRef = ref(db, `Auctions/${auctionName}/Items`);
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
    console.log(purchases);
    console.log(companyName);
    const db = getDatabase();
    const refPath2 = `Auctions/${auctionName}/companyHistory`;
    const itemsRef2 = ref(db, refPath2);
    get((itemsRef2)).then((snapshot) => {
      const data = snapshot.val();
      console.log(data["companyMapping"][companyName][round]);
      for (let i = 0; i < data["companyMapping"][companyName][round].length; i++) {
        const freqBand = data["companyMapping"][companyName][round][i]["frequencyBand"];
        const region = data["companyMapping"][companyName][round][i]["operator"];
          for (let j = 0; j< purchases.length; j++) {
            if (purchases[j]["band"] === freqBand && purchases[j]["op"] === region) {
              data["companyMapping"][companyName][round][i]["qty"]=Number(purchases[j]["bid"]);
            }
          }
        }
      console.log(data["companyMapping"][companyName]); 
      // 
      // const rounditem = {
      //   round : round,
      //   data : newCartItems
      // }
      // data["companyMapping"]["airtel"].push(newCartItems);
      // data["companyMapping"]["rjio"].push(newCartItems);
      // data["companyMapping"]["att"].push(newCartItems);
      // data["companyMapping"]["bsnl"].push(newCartItems);
      // data["companyMapping"]["vi"].push(newCartItems);
      // console.log(data["companyMapping"]);

      
      const companyMapping = data["companyMapping"];
      set(ref(db, `Auctions/` + auctionName + `/companyHistory`), {
        companyMapping
      });


    })
    console.log("Round Submitted!");
    setRoundSubmitted(true);
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
      <p>Bank Guarantee: {companyDetails.bankGuarantee}</p>
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
  const [roundSubmitted, setRoundSubmitted] = useState(false);
  const [round, setRound] = useState(0);

  useEffect(() => {
  // This effect will run whenever the value of round changes
  setRoundSubmitted(false);
  calculateDemand();
}, [round]);

  useEffect(() => {
    const db = getDatabase();
    const itemsRef= ref(db, `Auctions/${auctionName}/timerData`);
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if(data){
        const intervalId = setInterval(() => {
          const startTime = data.start || 0;
          const currentTime = Date.now();
          const elapsedMilliseconds = currentTime - startTime;
          const remainingMilliseconds = Math.max(0, 60 * 1000 * data.time - elapsedMilliseconds);
          setElapsedTime(remainingMilliseconds);
          setRound(data.round);

          if (remainingMilliseconds > 0) {
            setTimerExpired(false);
            calculateDemand();
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
    }
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

  useEffect(()=>{
    console.log(purchases)
    console.log(EP)
  },[purchases])
  const handlePurchase = (data)=>{
    setPurchases(data)
  }


  const handleEP = (data) => {
    setEP(data)
  }

          // console.log("this", itemsOnBid)
  return (
    <div style={{ display: "flex", justifyContent: "space-between"}}>
      <div className="mainleft">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1>Information Center</h1>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button onClick={aja}>Aja</button>
        </div>
        
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
        <div style={{ display: "flex", alignItems: "center" }}>
        <div class="timer-box">
          <span id="minutes">{minutes}</span>:<span id="seconds">{seconds}</span>
        </div>
        <div class="timer-box">
          <span id="minutes">{EP}</span>
        </div>
        <div class="timer-box">
          <span id="minutes">{round}</span>
        </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
          <Tab1 roundSubmitted = {roundSubmitted} timerStatus = {timerExpired} EP = {EP} onEP = {handleEP} onPurchase ={handlePurchase} items={itemsOnBid} quantities={quantities}/>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button disabled={timerExpired||roundSubmitted} onClick={handleSubmitRound}>Submit Round</button>
        </div>
      </div>
    </div>
  );
};

export default CompanyAuction;