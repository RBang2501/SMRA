// // Tab.js

// import React, { useState } from 'react';

// const Tab = ({ items }) => {

//   const [selectedTab, setSelectedTab] = useState('700 Mhz');

//   const tabs = [...new Set(items.map(item => item.frequencyBand))];
  
//   return (
//     <div>
//       <div style={{display: 'flex'}}>
//         {tabs.map(tab => (
//           <button 
//             key={tab}
//             onClick={() => setSelectedTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {items.filter(item => item.frequencyBand === selectedTab).map(item => (
//         <div key={item.operator}>
//           <h3>{item.operator}</h3>
//           <p>Frequency: {item.frequencyBand}</p>
//           <p>Unpaired: {item.unpaired}</p>
//           <p>Paired: {item.paired}</p>
//         </div>
//       ))}

//     </div>
//   );
// }

// export default Tab;

// Tab.js

import React, { useState } from 'react';


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

  //...tabs buttons

  return (  
    <div>
    
      {/*...tab buttons*/}
      <div style={{display: 'flex'}}>
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {items.filter(item => item.frequencyBand === selectedTab).map(item => (
        <div key={item.operator} style={{border: "1px solid #ccc", padding: "10px" }}>
        
          {/*...item details*/}
          <h3>{item.operator}</h3>
          <p>Frequency: {item.frequencyBand}</p>
          <p>Unpaired: {item.unpaired}</p>
          <p>Paired: {item.paired}</p>
          
          <input 
            value={bid} 
            onChange={handleBidChange}
          />
          
          <button onClick={handleYesClick}>
            Yes
          </button>

          <button onClick={handleNoClick}>
           No
          </button>

        </div>
      ))}
    
    </div>
  );
}

export default Tab1;