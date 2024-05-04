// CompanyAuction.js

/*
State Management:
The component utilizes several state variables using the useState hook to manage various aspects of the auction, including the current company's eligibility score, valuation, bank guarantee, items on bid, purchases, quantities, elapsed time, timer status, current round, average previous buy, and more.
Firebase Integration:
The component interacts with Firebase to fetch and update auction-related data such as company portfolios, item details, timer data, company history, and provisional winners.
It uses functions like getDatabase, ref, get, set, and onValue from the Firebase Realtime Database SDK to perform database operations.
Effect Hooks:
The component uses multiple useEffect hooks to perform various side effects such as fetching data, calculating demand, finding winners, handling round submissions, and updating timer status.
These effects run based on dependencies like the current round, auction name, company name, etc.
Helper Functions:
The component defines helper functions like getAverageBuy, fetchCompanyPortfolio, findWinner, calculateDemand, and handleEP to perform specific tasks such as calculating average buy, fetching company portfolio data, determining winners, calculating demand, and handling eligibility points.
Rendering:
The component renders different sections based on the current state and data fetched from Firebase. It displays company details, current holdings, timer information, tabs for different functionalities, and buttons for actions like submitting rounds.
Tab Component:
It includes a tab component (Tab1) that displays auction-related information and allows users to interact with items on bid, make purchases, and submit rounds.
Event Handling:
Event handlers like handleSubmitRound and handlePurchase manage user interactions such as submitting rounds and handling purchases.
Styling:
CSS classes and styles are applied to structure and style the UI components.

currCompanyEliScore: Holds the current company's eligibility score.
curCompanyValuation: Stores the current company's valuation.
curCompanyBankGuarantee: Represents the current company's bank guarantee.
itemsOnBid: Contains information about items available for bidding.
purchases: Tracks the purchases made by the company during the auction.
quantities: Stores the quantities of items bought by the company.
EP: Represents the eligibility points of the company.
holdings: Holds data about the current holdings of the company.
winners: Keeps track of the winners of the auction.
winQuantities: Stores the quantities won by the company in the auction.
winPrices: Contains the winning prices for items won by the company.
elapsedTime: Represents the elapsed time during the auction.
timerExpired: Indicates whether the auction timer has expired.
roundSubmitted: Tracks whether the current round has been submitted.
round: Represents the current round of the auction.
averagePreviousBuy: Holds the average previous buy value.
lastCompanyDemand: Stores the demand value of the last company.
Other Variables:
companyDetails: An object containing details about the company, including its name, net worth, eligibility score, bank guarantee, and current holdings.
activeTab: Represents the currently active tab in the UI.
Tab: A functional component representing a tab element in the UI.
Tab1Content: A functional component displaying content for Tab 1.
minutes and seconds: Variables used to display elapsed time in minutes and seconds.
Firebase Integration Variables:
Various variables are used to interact with Firebase, including db, refPath2, itemsRef2, itemsRef, refPath, ref, snapshot, data, etc.
Helper Variables:
Variables used within helper functions like itemQuantities, itemAvailable, priceOfEachItem, etc.

useState:
Used to declare state variables and manage their values.
Examples:
useState is used for variables like currCompanyEliScore, curCompanyValuation, itemsOnBid, etc.
useEffect:
Used to perform side effects in function components.
Executes after every render by default, but can be configured to run under specific conditions.
Examples:
Fetching company portfolio data (fetchCompanyPortfolio) when the component mounts or when the auction or company name changes.
Managing timer, round updates, and calculations (useEffect blocks related to timer, round, purchases, etc.).
useParams:
Used to access parameters from the current route in React Router.
Example:
const { companyName, auctionName } = useParams(); extracts parameters from the route.
Custom Hooks:
Tab, Tab1Content: These are custom functional components used within the component.
Example:
Tab1Content renders the content for Tab 1.
Tab represents a tab element in the UI.

In the CompanyAuction component, the use of local storage serves a crucial purpose in conducting a simultaneous multi-round auction over many days. Here's why it's important and how it's utilized:

(It is to much effort to implement otherwise for 4 credits)Persistent Data Storage: Local storage allows the application to store data locally within the user's web browser. This data persists even after the browser is closed and reopened, providing a way to retain auction-related information across multiple sessions and days.
Storing Auction Data: During a multi-round auction, various data points need to be stored and accessed across different rounds and days. Local storage enables the application to save auction-related data such as eligibility points (EP), round penalties, bid states, etc., ensuring continuity and consistency throughout the auction process.
Maintaining User State: Local storage helps maintain the state of the auction for each participating company and user. For example, it stores the current eligibility points (EP) for a company, which is crucial for determining bidding capabilities and strategies in subsequent rounds.
Handling Round Progression: In a multi-round auction conducted over several days, local storage tracks the current round and elapsed time, ensuring that the auction progresses seamlessly. It allows the application to resume from where it left off, even if the user closes the browser or navigates away from the auction page.
Handling Interruptions and Resumptions: Local storage is vital for handling interruptions such as browser crashes or network failures. By storing essential auction data locally, the application can recover the auction state upon resumption, preventing data loss and ensuring a smooth user experience.
*/
import React, { useState, useEffect } from "react";
import Tab1 from './Tab1';
import '../Styles/CompanyAuction.css'
import { getDatabase, ref, get, set, onValue } from "firebase/database";
import { json, useParams } from 'react-router-dom';

function getAverageBuy(round, auctionName, companyName) {
  const db = getDatabase();
  const refPath2 = `Auctions/${auctionName}/companyHistory`;
  const itemsRef2 = ref(db, refPath2);
  let averageDemand = 0;
  let companyDemand = 0;
  get((itemsRef2)).then((snapshot) => {
    const data = snapshot.val();
    const itemQuantities = {};
    const itemAvailable = {};
    const priceOfEachItem = {};
    if(round>1){
      data["companyMapping"]["airtel"][round-1].forEach((item) => {
        console.log("ITEM QTY....",item.qty, "Average Demand....",averageDemand)
        if(item.qty > 0)
        {
          averageDemand+=1;
          if(companyName == "airtel") 
        {
          companyDemand += 1;
        }
        }
        
      });
      data["companyMapping"]["rjio"][round-1].forEach((item) => {
        if(item.qty > 0)
        {
          averageDemand+=1;
          if(companyName == "rjio") 
        {
          companyDemand += 1;
        }
        }
        
      });
      data["companyMapping"]["bsnl"][round-1].forEach((item) => {
        if(item.qty > 0)
        {
          averageDemand += 1
          if(companyName == "bsnl") 
        {
          companyDemand += 1;
        }
        }
        
      });
      data["companyMapping"]["att"][round-1].forEach((item) => {
        if(item.qty > 0)
        {
          averageDemand += 1
          if(companyName == "att") 
        {
          companyDemand += 1;
        }
        }
        
      });

      data["companyMapping"]["vi"][round-1].forEach((item) => {
        if(item.qty > 0)
        {
          averageDemand += 1
          if(companyName == "vi") 
        {
          companyDemand += 1;
        }
        }
        
      });
      averageDemand = averageDemand/5;
      console.log("AVG DEMAND CALLED : " , averageDemand, "Company DEMAND", companyDemand, " ROUND > ", round)
      return averageDemand - companyDemand;
    // setQuantities(itemQuantities);    
    }
  });
}

const CompanyAuction = () => {
  const {companyName, auctionName} = useParams();
  const [currCompanyEliScore, setCurCompanyEliScore] = useState(0);
  const [curCompanyValuation, setCurCompanyValuation] = useState(0);
  const [curCompanyBankGuarantee, setCurCompanyBankGuarantee] = useState(0);
  const [itemsOnBid, setItemsOnBid] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [EP, setEP] = useState('');  // const [companyDetails, setCompanyDetails] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [winners, setWinners] = useState({});
  const [winQuantities, setWinQuantities] = useState({});
  const [winPrices, setWinPrices] = useState({});
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false);
  const [roundSubmitted, setRoundSubmitted] = useState(false);
  const [round, setRound] = useState(0);
  const [averagePreviousBuy, setAveragePreviousBuy] = useState(0);
  const [lastCompanyDemand, setLastCompanyDemand] = useState(0);
  // Fetch company portfolio data
  useEffect(() => {
    fetchCompanyPortfolio();
  }, [auctionName, companyName]); // Fetch on component mount and when auction or company name changes

  function getAverageBuy(round, auctionName, companyName) {
    const db = getDatabase();
    const refPath2 = `Auctions/${auctionName}/companyHistory`;
    const itemsRef2 = ref(db, refPath2);
    let averageDemand = 0;
    let companyDemand = 0;
    get((itemsRef2)).then((snapshot) => {
      const data = snapshot.val();
      const itemQuantities = {};
      const itemAvailable = {};
      const priceOfEachItem = {};
      if(round>1){
        data["companyMapping"]["airtel"][round-1].forEach((item) => {
          console.log("ITEM QTY....",item.qty, "Average Demand....",averageDemand)
          if(item.qty > 0)
          {
            averageDemand+=1;
            if(companyName == "airtel") 
          {
            companyDemand += 1;
          }
          }
          
        });
        data["companyMapping"]["rjio"][round-1].forEach((item) => {
          if(item.qty > 0)
          {
            averageDemand+=1;
            if(companyName == "rjio") 
          {
            companyDemand += 1;
          }
          }
          
        });
        data["companyMapping"]["bsnl"][round-1].forEach((item) => {
          if(item.qty > 0)
          {
            averageDemand += 1
            if(companyName == "bsnl") 
          {
            companyDemand += 1;
          }
          }
          
        });
        data["companyMapping"]["att"][round-1].forEach((item) => {
          if(item.qty > 0)
          {
            averageDemand += 1
            if(companyName == "att") 
          {
            companyDemand += 1;
          }
          }
          
        });
  
        data["companyMapping"]["vi"][round-1].forEach((item) => {
          if(item.qty > 0)
          {
            averageDemand += 1
            if(companyName == "vi") 
          {
            companyDemand += 1;
          }
          }
          
        });
        averageDemand = averageDemand/5;
        console.log("AVG DEMAND CALLED : " , averageDemand, "Company DEMAND", companyDemand, " ROUND > ", round)
        setAveragePreviousBuy(averageDemand - companyDemand);
      }
    });
  }

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
      year: holding.year,
      frequencyBand: holding.frequencyBand
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
        // console.log(data.Holding.holdingCards[0].region)
        setCurCompanyEliScore(data.totalEligibilityPoints);
        setCurCompanyValuation(data.valuation);
        setCurCompanyBankGuarantee(data.bankGuarantee);
        if (data && data.Holding && data.Holding.holdingCards){
          setHoldings(data.Holding.holdingCards);
        }
        
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

  function findWinner() {
    const db = getDatabase();
    if(round==0 || round==1){
      const currWinners = {}
      const currQuantities = {}
      const currPrices = {}
      itemsOnBid.forEach((item) => {
        const item_id = `${item.operator}-${item.frequencyBand}`
        currWinners[item_id] = 'false'
        currQuantities[item_id] = 0
        currPrices[item_id] = 'NA'
      })
      setWinners(currWinners)
      setWinQuantities(currQuantities)
      setWinPrices(currPrices)
      return
    }

    const refPath = `Auctions/${auctionName}/provisionalWinner/${round-1}/`;
    const itemsRef = ref(db, refPath);
    // const newCartItems = [];
    get((itemsRef)).then((snapshot) => {
      const data = snapshot.val();
      console.log("Received", data);
      const winners1 = data["winners"]
      const currWinners = {...winners}
      const currQuantities = {...winQuantities}
      const currPrices = {...winPrices}
      itemsOnBid.forEach((item) => {
        const item_id = `${item.operator}-${item.frequencyBand}`
        currWinners[item_id] = 'false'
        currQuantities[item_id] = 0
        currPrices[item_id] = 'NA'
      })
      setWinners(currWinners)
      setWinQuantities(currQuantities)
      setWinPrices(currPrices)

      itemsOnBid.forEach((item) => {
        const item_id = `${item.operator}-${item.frequencyBand}`
        // currWinners[item_id] = 'false'
        if (winners1[item_id] && winners1[item_id].length > 0) {
          winners1[item_id].forEach((item1) => {
            // if(item.airtel) console.log("Winner", item.airtel)
            for(let key in item1) {
              if(key == companyName){
                console.log(item_id, key, item1[key])
                currWinners[item_id] = 'true'
                currQuantities[item_id] = item1[key]
                setWinners(currWinners)
                setWinQuantities(currQuantities)
              }
              if(key=='price' && currWinners[item_id]=='true'){
                currPrices[item_id] = item1[key]
                setWinPrices(currPrices)
                console.log("PRICE", item1[key])
              }
            }
          });
        }
      })
      
      console.log("Winners" , winners)
    })
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
      // console.log(itemQuantities);
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
      var localep = JSON.parse(localStorage.getItem("EPVALUE"));
      if(localep==null && (data!=undefined || data !=null)){
        localStorage.setItem("EPVALUE", JSON.stringify(data))
        console.log("round ",round)
        setEP(data)
      }
      else{
        setEP(localep)
      }
      
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
              epPerBlock: data[freqBand][region].epPerBlock,
              blockSize: data[freqBand][region].blockSize
            };
            newCartItems.push(newItem);
          });
        });
        setItemsOnBid(newCartItems);
      }
    });
  }, [round]); // Empty dependency array to run the effect only once on component mount
  
  useEffect( () => {
    getAverageBuy(round, auctionName,companyName);
  }, [round]);

  useEffect(() => {
    console.log("CHAL JA, " ,averagePreviousBuy);
    var roundpenalty  = JSON.parse(localStorage.getItem("ROUNDPENALTY"));
    if(averagePreviousBuy>0 && roundpenalty!=round) // apb = avg - company
    {
      localStorage.setItem("ROUNDPENALTY", JSON.stringify(round));
      const penalty = (averagePreviousBuy)*(100);
      alert("LOW DEMAND PENALTY : " + penalty);
      var localep = JSON.parse(localStorage.getItem("EPVALUE"));
      localep -= penalty;
      localStorage.setItem("EPVALUE", JSON.stringify(localep));
      handleEP(localep);
    }
    setAveragePreviousBuy(0);
  }, [averagePreviousBuy])
  const handleSubmitRound = () => {
    var localbidstates = JSON.parse(localStorage.getItem("BIDSTATESVALUE"))
    console.log("LOCALSTATES", localbidstates, winners, winPrices)
    var flag=0
    // console.log("AVERAGE PREVIOUS BUY ::::: ", averagePreviousBuy);
    // let yourBuy = 0;
    // for(const key in localbidstates)
    // {
    //   if(!localbidstates[key]) yourBuy+=1;
    // }
    // const penalty = 100;
    // console.log("YOUR BUY  :::::: ", yourBuy);

    // if(averagePreviousBuy > yourBuy)
    // {
    //   var localep = JSON.parse(localStorage.getItem("EPVALUE"));
    //   localep = localep*penalty*(averagePreviousBuy - yourBuy);
    //   localStorage.setItem("EPVALUE", JSON.stringify(localep));
    //   handleEP(localep);
    // }
    itemsOnBid.forEach((item) => {
        if(winners[`${item.operator}-${item.frequencyBand}`] == 'true' && 
            Number(item.reservedPrice)==Number(winPrices[`${item.operator}-${item.frequencyBand}`]) &&
            localbidstates[`${item.operator}-${item.frequencyBand}`]==true){
        alert("For item " + item.operator + item.frequencyBand+  " Please Select yes!")
        flag=1
        return;
      }
    })
    if(flag==1 ) return;

    console.log(purchases);
    console.log(companyName);
    console.log("check")
    const db = getDatabase();
    const refPath2 = `Auctions/${auctionName}/companyHistory`;
    const itemsRef2 = ref(db, refPath2);
    get((itemsRef2)).then((snapshot) => {
      const data = snapshot.val();
      console.log(data)
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
      <h2 className="name">{companyDetails.companyName}</h2>
      <p className="name">Eligibility Points: {EP}</p>
      <p className="holding">Current Holdings:</p>
      <div className="contains-Tabcontent">
        {companyDetails.currentHoldings.map((holding, index) => (
          
          <div key={index} className="holding-container">
            <h3>{holding.frequencyBand}</h3>
            <p>region: {holding.region}</p>
            <p>holdingUP: {holding.holdingUP}</p>
            <p>holdingP: {holding.holdingP}</p>
          </div>
        ))}
      </div> 
    </div>
  );

  
  useEffect(() => {
  // This effect will run whenever the value of round changes
  console.log(round)
  setRoundSubmitted(false);
  calculateDemand();
  findWinner();
  findWinner();
  findWinner();
}, [round]);

  useEffect(()=>{
    const db = getDatabase();
    const itemsRef= ref(db, `Auctions/${auctionName}/timerData`);
    get((itemsRef)).then((snapshot) => { 
      const data = snapshot.val()
      // if(data.round == 1){
      //   localStorage.clear()
      // }
    })
  },[])
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
            // findWinner();
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

  useEffect(()=>{
    // console.log("TERIYAKI ", EP)
  },[EP])
  const handleEP = (data) => {
    // console.log("GOT, ",data);
    setEP(data)
  }

          // console.log("this", itemsOnBid)
  return (
    <div style={{ display: "flex", justifyContent: "space-between"}}>
      <div className="mainleft">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth:"100%", paddingLeft: "20px", paddingRight: "20px"}}>
          
          <div style={{ display: "flex", flexDirection: "column"}}>
          <Tab1Content />
          </div>
        </div>
      </div>
      <div style={{ flex: 1, border: "1px solid #007bff", paddingLeft: "20px",
        paddingBottom:"20px", borderRadius:"10px", maxHeight:"95vh", marginTop:"1vh", marginRight:"1vh", maxWidth:"65%"}}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        </div><div style={{ display: "flex", alignItems: "center" }}>
          <pre className="name">        Timer              EP              Round</pre>
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
          <Tab1 round = {round} roundSubmitted = {roundSubmitted} timerStatus = {timerExpired} EP = {EP} onEP = {handleEP} onPurchase ={handlePurchase} items={itemsOnBid} quantities={quantities} winners={winners} winQuantities={winQuantities} winPrices={winPrices} auctionName = {auctionName}/>
          {/* <Tab1 round = {round} roundSubmitted = {roundSubmitted} timerStatus = {timerExpired} EP = {EP} onEP = {handleEP} onPurchase ={handlePurchase} items={itemsOnBid} quantities={quantities}/> */}
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <button disabled={timerExpired||roundSubmitted} onClick={handleSubmitRound}>Submit Round</button>
        </div>
      </div>
    </div>
  );
};

export default CompanyAuction;