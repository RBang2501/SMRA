/*
Imports
The code imports necessary modules from React and Firebase, along with CSS styles.
json is imported from react-router-dom, although it's not used in the code snippet.
Helper Functions
removeDuplicateObjects: This function takes a list of objects as input and removes duplicate objects from it. It achieves this by converting each object to a string representation and using a Set to keep track of unique object representations.
removeItemFromList: This function removes a specific item from a list based on its properties (band and op).
getAverageBuy: This function calculates the average demand for spectrum bands in a specific round of an auction. It retrieves data from Firebase Realtime Database and computes the average demand for each operator.
Component: Tab1
This component is a functional component that renders a tab for bidding in an auction. Let's break down its key parts:

State Variables:
selectedTab: Tracks the currently selected tab.
bids: Stores the bid values for each item.
toggleYes: Toggles the "Yes" button state.
bidStates: Stores the state of each bid button.
wantItem: Tracks if the user wants an item.
list: Stores the list of selected items.
curEP: Stores the current EP (Energy Points).
useEffect Hook:
Initializes state variables based on local storage values or default values when the component mounts.
handleBidChange Function:
Updates the bid value when the user types in the input field.
handleYesClick Function:
Handles the logic when the user clicks "Yes" to place a bid.
Validates bid amount, EP availability, and quantity before adding the bid to the list.
Updates state variables and local storage accordingly.
handleNoClick Function:
Handles the logic when the user clicks "No" to remove a bid.
Updates state variables and local storage accordingly.
Rendering:
Renders tab buttons for different frequency bands.
Renders auction details for each item in the selected tab, including operator, block size, unpaired units, paired units, clock round price, and EP per block.
Renders input fields for bidding and "Yes" and "No" buttons for bid confirmation.
Local Storage Usage:
Local storage is used to store and retrieve bid values, EP values, bid states, and the list of selected items. This ensures that data persists across page refreshes.
*/
import React, { useEffect, useState } from 'react';
import "../Styles/CompanyAuction.css"
import { json } from 'react-router-dom';
import { getDatabase, ref, get, set, onValue } from "firebase/database";
const removeDuplicateObjects = (listOfObjects) => {
  // Create an empty Set to keep track of unique object representations
  const uniqueObjectStrings = new Set();

  // Filter the list of objects to include only unique objects
  const uniqueObjects = listOfObjects.filter(obj => {
    // Convert the object to a string representation
    const objectString = JSON.stringify(obj);
    // If the string representation is not already in the Set, add it and return true
    if (!uniqueObjectStrings.has(objectString)) {
      uniqueObjectStrings.add(objectString);
      return true;
    }
    // Otherwise, return false to filter out the duplicate object
    return false;
  });

  return uniqueObjects;
}
const removeItemFromList = (list,itemToRemove) => {
  // Find the index of the item to remove
  for (let i = 0; i < list.length; i++) {
    // Check if the current item is the one to remove
    if (list[i]["band"] === itemToRemove["band"] && list[i]["op"] === itemToRemove["op"] ) {
      // Remove the item from the list
      list.splice(i, 1);
      // Decrement the index as the list length has decreased
      i--;
    }
  }
  // Return the modified list
  return list;
}
function getAverageBuy(round, auctionName) {
  const db = getDatabase();
  const refPath2 = `Auctions/${auctionName}/companyHistory`;
  const itemsRef2 = ref(db, refPath2);
  let averageDemand = 0;
  get((itemsRef2)).then((snapshot) => {
    const data = snapshot.val();
    const itemQuantities = {};
    const itemAvailable = {};
    const priceOfEachItem = {};
    let total = 0;
    let curDemand = 0
    if(round>1){
      data["companyMapping"]["airtel"][round-1].forEach((item) => {
        total += 1
        if(item.qty > 0)
        {
          curDemand += 1
        }
      });
      averageDemand += (curDemand/total);
      curDemand = 0;
      data["companyMapping"]["rjio"][round-1].forEach((item) => {
        if(item.qty > 0)
        {
          curDemand += 1
        }
      });
      averageDemand += (curDemand/total);
      curDemand = 0;
      data["companyMapping"]["bsnl"][round-1].forEach((item) => {
        if(item.qty > 0)
        {
          curDemand += 1
        }
      });
      averageDemand += (curDemand/total);
      curDemand = 0;
      data["companyMapping"]["att"][round-1].forEach((item) => {
        if(item.qty > 0)
        {
          curDemand += 1
        }
      });
      averageDemand += (curDemand/total);
      curDemand = 0;
      data["companyMapping"]["vi"][round-1].forEach((item) => {
        if(item.qty > 0)
        {
          curDemand += 1
        }
        
      });
      averageDemand += (curDemand/total);
      averageDemand = averageDemand/5;
      console.log(itemQuantities);
      console.log(itemAvailable);
    // setQuantities(itemQuantities);    
    }
  });
  return averageDemand;
}
const Tab1 = ({round, roundSubmitted, timerStatus, items, onPurchase, quantities, onEP, EP, winners, winQuantities, winPrices, auctionName}) => {
// const Tab1 = ({ round, roundSubmitted, timerStatus, items, onPurchase, quantities, onEP, EP }) => {
  const [selectedTab, setSelectedTab] = useState('700');
  const [bids, setBids] = useState([]);
  const [toggleYes, setToggle] = useState(true);
  const [bidStates, setBidStates] = useState([])
  const [wantItem, setWantItem] = useState(false);
  const tabs = [...new Set(items.map(item => item.frequencyBand))];
  const [list, setList] = useState([])
  const [curEP, setCurEP] = useState('');
  useEffect(()=>{
    var localep = JSON.parse(localStorage.getItem("EPVALUE"));
    var locallist = JSON.parse(localStorage.getItem("LISTVALUE"))
    var localbidstates = JSON.parse(localStorage.getItem("BIDSTATESVALUE"))
    var localbids = JSON.parse(localStorage.getItem("BIDVALUES"));

    console.log("local ep : ", localep, " \nlocallist : ",locallist, " \n localbidstate : ",localbidstates, " \n local bids : ", localbids)
    const tempbids = {};
    const tempbidStates = {};
    items.forEach(item => {
      const itemId = `${item.operator}-${item.frequencyBand}`;
      if (!tempbids[itemId]) {
        tempbids[itemId] = '0';
        tempbidStates[itemId] = true;
      }
    });
    if(localep!=null && localbids!= null && locallist != null)
    {
      setCurEP(localep);
      setToggle(true)
      setBidStates(localbidstates)
      setBids(localbids)
      setList(locallist)
      onEP(localep)
    }
    else{
      setCurEP(EP);
      setToggle(true)
      setBidStates(tempbidStates)
      setBids(tempbids)
      console.log("tempbids", tempbids)
    }
    
  },[items])
  
  
  const handleBidChange = (e, index) => {
    console.log("bids", bids)
    const newBids = {}
    items.forEach(item => {
      const itemId = `${item.operator}-${item.frequencyBand}`;
        if (itemId == index) {
          newBids[index] = e.target.value;
        }
        else{
          newBids[itemId] = bids[itemId];
        }
    });
    setBids(newBids);
    console.log(newBids);
    localStorage.setItem("BIDVALUES", JSON.stringify(newBids));
  }
  
  useEffect(()=>{
    if((curEP=='' || curEP == NaN || curEP == null) == false && (EP != curEP))
    {
      onEP(curEP)
    }
  },[curEP])

  useEffect(()=>{
    // console.log("tab1",list)
    onPurchase(list)
  },[list])
  const handleYesClick = (band, op,index,item) => {
    console.log("BIDS", bids)
    if(curEP=='' || curEP == NaN || curEP == null){
      setCurEP(EP);
      console.log("Rectified :",curEP)
    }
    if(bids[index] == '' || bids[index] == null || bids[index] == NaN){
      alert("enter value")
      return;
    }
    const newlist = [...list];
    newlist.push({
      band : band,
      op : op,
      bid: bids[index]
    });
    const temp= removeDuplicateObjects(newlist)
    const reqEP = Number(item.epPerBlock)*Number(bids[index]);
    console.log("cur : ",curEP," req ", reqEP)
    if(reqEP > curEP){
      if((curEP=='' || curEP == NaN || curEP == null) )
      alert("Please Wait fetching EP, try again")
      else
      alert("Cannot add req EP is more than your current EP")
      return;
    }
    else if(bids[index]>(Number(item.paired)+Number(item.unpaired))){
      alert("Cannot add! Quantity entered is more than available spectrum")
      return;
    }
    else if(winners[`${item.operator}-${item.frequencyBand}`] == 'true' && 
            Number(item.reservedPrice)==Number(winPrices[`${item.operator}-${item.frequencyBand}`]) &&
            bids[index]<winQuantities[`${item.operator}-${item.frequencyBand}`]){
        alert("You cannot enter a lower bid than before and you are the provisional winner and the price has not changed.")
        return;
      }
    setToggle(false)
    const newBidStates = {}
    items.forEach(item => {
      const itemId = `${item.operator}-${item.frequencyBand}`;
        if (itemId == index) {
          newBidStates[index] = false;
        }
        else{
          newBidStates[itemId] = bidStates[itemId];
        }
    });
    setBidStates(newBidStates)
    const tep = (curEP-reqEP)
    if(tep<0) tep = curEP
    setCurEP(tep);
    setList(temp)
    localStorage.setItem("EPVALUE", JSON.stringify(tep));
    localStorage.setItem("LISTVALUE", JSON.stringify(temp));
    localStorage.setItem("BIDSTATESVALUE",JSON.stringify(newBidStates));
    
  }
  
  
  const handleNoClick = (band,op,index,item) => {
    const obj = {
      band : band,
      op : op,
      bid : bids[index],
    }
    const newlist = [...list]
    const temp = removeItemFromList(newlist,obj)
    var reqEP = Number(item.epPerBlock)*Number(bids[index]);
    if(bids[index] == '' || bids[index] == null || bids[index] == NaN){
      reqEP = 0
    }
    setToggle(true)
    const newBidStates = {}
    items.forEach(item => {
      const itemId = `${item.operator}-${item.frequencyBand}`;
        if (itemId == index) {
          newBidStates[index] = true;
        }
        else{
          newBidStates[itemId] = bidStates[itemId];
        }
    });
    setBidStates(newBidStates)

    const tep = (curEP + reqEP)
    setCurEP(tep);
    setList(temp);
    localStorage.setItem("EPVALUE", JSON.stringify(tep));
    localStorage.setItem("LISTVALUE", JSON.stringify(temp));
    localStorage.setItem("BIDSTATESVALUE",JSON.stringify(newBidStates));
  }

// console.log("this", items)
  return (  
    <div>
    
      {/*...tab buttons*/}
      <div style={{display: 'flex', paddingBottom: "20px"}}>
        {tabs.map(tab => (
          <div style={{ paddingLeft: "10px"}}>
            <button 
              key={tab}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          </div>
        ))}
      </div>
      <div className="auction-container-container">
      {items.filter(item => item.frequencyBand === selectedTab).map((item) => (
        <div key={item.operator} className="auction-container">
        
          {/*...item details*/}
          <div className ="deets">
            <h3>{item.operator}</h3>
            <pre>Block Size: <span className='bold'>{item.blockSize} </span></pre>
            <pre>Unpaired: <span className='bold'>{item.unpaired} units </span></pre>
            <pre>Paired: <span className='bold'>{item.paired} units </span></pre>
            <pre>Clock Round Price: <span className='bold'>{item.reservedPrice} Cr </span></pre>
            <pre>EP (per block): <span className='bold'>{item.epPerBlock} </span></pre>
            
          </div>

          <div className = "auction-input">
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <div style={{paddingLeft:"20px", paddingBottom:"3vh"}}>
                {/* <p>Provisional Winner: {winners[`${item.operator}-${item.frequencyBand}`]} ({winQuantities[`${item.operator}-${item.frequencyBand}`]} blocks at RP: {winPrices[`${item.operator}-${item.frequencyBand}`]})</p> */}
                {winners[`${item.operator}-${item.frequencyBand}`] === 'true' && (
                  <p>
                    Provisional Winner: (
                    {winQuantities[`${item.operator}-${item.frequencyBand}`]} blocks at CRP:{' '} 
                    {winPrices[`${item.operator}-${item.frequencyBand}`]} Cr
                    )
                  </p>
                )}
                {winners[`${item.operator}-${item.frequencyBand}`] === 'true' && (
                  <pre>
                    Money locked in: {Number(winQuantities[`${item.operator}-${item.frequencyBand}`]) * Number(winPrices[`${item.operator}-${item.frequencyBand}`])} Cr
                  </pre>
                )}
                <pre>Prev Round Demand: {quantities[`${item.operator}-${item.frequencyBand}`]}</pre>
                <p> </p>
                <input 
                disabled={(!bidStates[`${item.operator}-${item.frequencyBand}`])||timerStatus||roundSubmitted}
                value={bids[`${item.operator}-${item.frequencyBand}`]} 
                onChange={(e)=>
                  handleBidChange(e,`${item.operator}-${item.frequencyBand}`)
                }
              />
              </div>
                <div style={{display: "flex"}}>
                <div style={{paddingLeft:"20px"}}>
                <button disabled={(!bidStates[`${item.operator}-${item.frequencyBand}`])||timerStatus||roundSubmitted} onClick={()=>handleYesClick(item.frequencyBand,item.operator,`${item.operator}-${item.frequencyBand}`,item)}>
                  Yes
                </button>
                </div>
                <div style={{paddingLeft:"20px"}}>
                <button disabled={timerStatus||(bidStates[`${item.operator}-${item.frequencyBand}`])||roundSubmitted} onClick={()=>handleNoClick(item.frequencyBand,item.operator,`${item.operator}-${item.frequencyBand}`,item)}>
                No
                </button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      ))}
      </div>
    
    </div>
  );
}

export default Tab1;

