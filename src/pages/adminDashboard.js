// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AddItemModal from './AddItemModal';


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



















