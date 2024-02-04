// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AddItemModal from './AddItemModal';
// import ItemTable from './ItemTable';

function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [auctionName, setAuctionName] = useState('Default Auction Name');
  const location = useLocation();

  useEffect(() => {
    // Extract auctionName from the path parameters
    const { pathname } = location;
    const parts = pathname.split('/');
    const lastPart = parts[parts.length - 1];

    // Set auctionName to the last part of the path
    setAuctionName(lastPart || 'Default Auction Name');
  }, [location.pathname]);

  const openModal = () => {
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addItem = (item) => {
    setItems([...items, item]);
    closeModal();
  };
  const deleteAuction = () =>{
    console.log("Delete Auction");
  }

  return (
    <div className="admin-dashboard">
      <h1>Auction Instance: {auctionName}</h1>
      <button onClick={deleteAuction}>Delete Auction</button>
      <br/>
      <br/>
      <br/>
      <br/>
      <button onClick={openModal}>Add Item</button>
     
      {isModalOpen && <AddItemModal onAdd={addItem} onCancel={closeModal} />}
    </div>
  );
}

export default AdminDashboard;


















// // Home.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Home() {
//   const [auctionName, setAuctionName] = useState('');
//   const navigate = useNavigate();

//   const createAuction = () => {
//     // Perform any actions you need with the auction name
//     console.log('Creating auction:', auctionName);

//     // Navigate to Admin Dashboard with auction name as a parameter
//     navigate(`/admin-dashboard/${auctionName}`);
//   };

//   return (
//     <div className="home-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
//       <input
//         type="text"
//         placeholder="Auction Name"
//         value={auctionName}
//         onChange={(e) => setAuctionName(e.target.value)}
//         style={{ fontSize: '20px', padding: '10px', marginBottom: '20px' }}
//       />
//       <button onClick={createAuction} style={{ fontSize: '24px', padding: '15px' }}>
//         Create Auction
//       </button>
//     </div>
//   );
// }

// export default Home;

