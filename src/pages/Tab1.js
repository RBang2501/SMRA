

import React, { useEffect, useState } from 'react';
import "../Styles/CompanyAuction.css"
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
const Tab1 = ({ roundSubmitted, timerStatus, items, onPurchase, quantities, onEP, EP, winners }) => {
  const [selectedTab, setSelectedTab] = useState('700');
  const [bids, setBids] = useState([]);
  const [toggleYes, setToggle] = useState(true);
  const [bidStates, setBidStates] = useState([])
  const [wantItem, setWantItem] = useState(false);
  const tabs = [...new Set(items.map(item => item.frequencyBand))];
  const [list, setList] = useState([])
  const [curEP, setCurEP] = useState('');
  useEffect(()=>{
    const tempbids = {};
    const tempbidStates = {};
    items.forEach(item => {
      const itemId = `${item.operator}-${item.frequencyBand}`;
      if (!tempbids[itemId]) {
        tempbids[itemId] = '0';
        tempbidStates[itemId] = true;
      }
    });
    setCurEP(EP);
    setToggle(true)
    setBidStates(tempbidStates)
    console.log("tempbids", tempbids)
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

    const tep = (curEP+ reqEP)
    setCurEP(tep);
    setList(temp);
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
            <p>Frequency: {item.frequencyBand}</p>
            <p>Unpaired: {item.unpaired}</p>
            <p>Paired: {item.paired}</p>
            <p>EP(per block): {item.epPerBlock}</p>
            
          </div>

          <div className = "auction-input">
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <div style={{paddingLeft:"20px", paddingBottom:"3vh"}}>
                <p>Provisional Winner: {winners[`${item.frequencyBand}_${item.operator}`]}</p>
                <p>Prev Round Demand: {quantities[`${item.operator}-${item.frequencyBand}`]}</p>
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