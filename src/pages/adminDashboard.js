// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AddItemModal from './AddItemModal';
import ItemTable from './ItemTable';

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

  const createAuction = () => {
    console.log('Creating auction!');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addItem = (item) => {
    setItems([...items, item]);
    closeModal();
  };

  return (
    <div className="admin-dashboard">
      <h1>Auction Instance: {auctionName}</h1>
      <button onClick={openModal}>Add Item</button>
      <ItemTable items={items} />
      {isModalOpen && <AddItemModal onAdd={addItem} onCancel={closeModal} />}
    </div>
  );
}

export default AdminDashboard;
