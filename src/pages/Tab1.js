

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
const Tab1 = ({ roundSubmitted, timerStatus, items, onPurchase, quantities, onEP, EP }) => {
  useEffect(()=>{
    const tempbids = {};
    items.forEach(item => {
      const itemId = `${item.operator}-${item.frequencyBand}`;
      if (!tempbids[itemId]) {
        tempbids[itemId] = '0';
      }
    });
    setCurEP(EP);
    setToggle(true)
    console.log("tempbids", tempbids)
  },[items])
  const [selectedTab, setSelectedTab] = useState('700');
  const [bids, setBids] = useState([]);
  const [toggleYes, setToggle] = useState(true)
  const [wantItem, setWantItem] = useState(false);
  const tabs = [...new Set(items.map(item => item.frequencyBand))];
  const [list, setList] = useState([])
  const [curEP, setCurEP] = useState('');
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
    onEP(curEP)
  },[curEP])
  
  useEffect(()=>{
    // console.log("tab1",list)
    onPurchase(list)
  },[list])
  const handleYesClick = (band, op,index,item) => {
    if(bids[index] == ''){
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
    if(reqEP > curEP){
      alert("Cannot add req EP is more than you current EP")
      return;
    }
    if(bids[index]>Number(item.paired)+Number(item.unpaired)){
      alert("Cannot add! Quantity entered is more than available spectrum")
      return;
    }
    setToggle(false)
    setCurEP(curEP-reqEP);
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
    const reqEP = Number(item.epPerBlock)*Number(bids[index]);
    setToggle(true)
    setCurEP(curEP+reqEP);
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
                <p>Prev Round Demand: {quantities[`${item.operator}-${item.frequencyBand}`]}</p>
                <p> </p>
                <input 
                disabled={(!toggleYes)||timerStatus||roundSubmitted}
                value={bids[`${item.operator}-${item.frequencyBand}`]} 
                onChange={(e)=>
                  handleBidChange(e,`${item.operator}-${item.frequencyBand}`)
                }
              />
              </div>
                <div style={{display: "flex"}}>
                <div style={{paddingLeft:"20px"}}>
                <button disabled={(!toggleYes)||timerStatus||roundSubmitted} onClick={()=>handleYesClick(item.frequencyBand,item.operator,`${item.operator}-${item.frequencyBand}`,item)}>
                  Yes
                </button>
                </div>
                <div style={{paddingLeft:"20px"}}>
                <button disabled={timerStatus||(toggleYes)||roundSubmitted} onClick={()=>handleNoClick(item.frequencyBand,item.operator,`${item.operator}-${item.frequencyBand}`,item)}>
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