

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
    if (list[i]["band"] === itemToRemove["band"] && list[i]["op"] === itemToRemove["op"] 
    && list[i]["bid"] === itemToRemove["bid"]) {
      // Remove the item from the list
      list.splice(i, 1);
      // Decrement the index as the list length has decreased
      i--;
    }
  }
  // Return the modified list
  return list;
}
const Tab1 = ({ items, onPurchase, quantities }) => {

  const [selectedTab, setSelectedTab] = useState('700');
  const [bid, setBid] = useState('');
  const [wantItem, setWantItem] = useState(false);
  const tabs = [...new Set(items.map(item => item.frequencyBand))];
  const [list, setList] = useState([])
  const handleBidChange = (e) => {
    setBid(e.target.value);
  }

  useEffect(()=>{
    // console.log("tab1",list)
    onPurchase(list)
  },[list])
  const handleYesClick = (band, op) => {
    const newlist = [...list];
    newlist.push({
      band : band,
      op : op,
      bid: bid
    });
    const temp= removeDuplicateObjects(newlist)
    setList(temp)
  }
  
  const handleNoClick = (band,op) => {
    const obj = {
      band : band,
      op : op,
      bid : bid,
    }
    const newlist = [...list]
    const temp = removeItemFromList(newlist,obj)
    setList(temp)
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
      {items.filter(item => item.frequencyBand === selectedTab).map(item => (
        <div key={item.operator} className="auction-container">
        
          {/*...item details*/}
          <div className ="deets">
            <h3>{item.operator}</h3>
            <p>Frequency: {item.frequencyBand}</p>
            <p>Unpaired: {item.unpaired}</p>
            <p>Paired: {item.paired}</p>
            <p>Prev Round Demand: {quantities[`${item.operator}-${item.frequencyBand}`]}</p>
          </div>

          <div className = "auction-input">
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
              <div style={{paddingLeft:"20px", paddingBottom:"3vh"}}>
                <input 
                value={bid} 
                onChange={handleBidChange}
              />
              </div>
                <div style={{display: "flex"}}>
                <div style={{paddingLeft:"20px"}}>
                <button onClick={()=>handleYesClick(item.frequencyBand,item.operator)}>
                  Yes
                </button>
                </div>
                <div style={{paddingLeft:"20px"}}>
                <button onClick={()=>handleNoClick(item.frequencyBand,item.operator)}>
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