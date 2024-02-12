

import React, { useState } from 'react';
import "../Styles/CompanyAuction.css"

const Tab1 = ({ items }) => {

  const [selectedTab, setSelectedTab] = useState('700 Mhz');
  const [bid, setBid] = useState('');
  const [wantItem, setWantItem] = useState(false);
  const tabs = [...new Set(items.map(item => item.frequencyBand))];

  
  const handleBidChange = (e) => {
    setBid(e.target.value);
  }

  const handleYesClick = () => {
    setWantItem(true);
  }
  
  const handleNoClick = () => {
    setWantItem(false);
  }


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
                <button onClick={handleYesClick}>
                  Yes
                </button>
                </div>
                <div style={{paddingLeft:"20px"}}>
                <button onClick={handleNoClick}>
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