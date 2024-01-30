// Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [auctionName, setAuctionName] = useState('');
  const navigate = useNavigate();

  const createAuction = () => {
    // Perform any actions you need with the auction name
    console.log('Creating auction:', auctionName);

    // Navigate to Admin Dashboard with auction name as a parameter
    navigate(`/admin-dashboard/${encodeURIComponent(auctionName)}`);
  };

  return (
    <div className="home-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <input
        type="text"
        placeholder="Auction Name"
        value={auctionName}
        onChange={(e) => setAuctionName(e.target.value)}
        style={{ fontSize: '20px', padding: '10px', marginBottom: '20px' }}
      />
      <button onClick={createAuction} style={{ fontSize: '24px', padding: '15px' }}>
        Create Auction
      </button>
    </div>
  );
}

export default Home;
