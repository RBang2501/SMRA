// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AddItemModal from './AddItemModal';
import { getDatabase, ref, set, update, remove } from "firebase/database";


function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [auctionName, setAuctionName] = useState('Default Auction Name');
  const location = useLocation();
  const [isInitCompany, setIsInitCompany] = useState(false);
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
    console.log("Deleting Auction !")
    const db = getDatabase();
    remove(ref(db, 'Auctions/' + auctionName));
    console.log("Deleted Auction Successfully !");

  }

    const handleStartTimer = () => {
    const db = getDatabase();
    const startTime = Date.now();
    set(ref(db, 'Auctions/' + "Instance1" + "/timerData"), {
      start: startTime,
      time: 1
    });
    }
    const handleInit = ()=>{
      if(!isInitCompany){
        console.log("Companies initialised");
        InitCompanyHistory();
        setIsInitCompany(true);
      }
    }
    const InitCompanyHistory = () => {
      const db = getDatabase();
      const startTime = Date.now();
      const companyMapping = {
        'rjio': [],
        'airtel': [],
        'vi': [],
        'att': [],
        'bsnl': []
      };
      const refPath = 'Auctions/Instance1/companyHistory'
      db.ref(refPath).once('value', (snapshot) => {
        const companyMapping = snapshot.val();
        if (companyMapping == null) {
          set(ref(db, 'Auctions/' + "Instance1" + "/companyHistory"), {
            companyMapping
          });
        }
        else{
          console.log("Already set");
        }
      })
  };

  return (
    <div className="admin-dashboard">
      <h2>Auction Instance: {auctionName}</h2>
      <button onClick={deleteAuction} style={{ position: 'fixed', top: '10%', right: '20px', transform: 'translateY(-50%)' }}>Delete Auction</button>
      <button onClick={handleStartTimer} style={{ marginLeft: '50px' }}>Start Timer</button>
      <button onClick={openModal} style={{ marginLeft: '50px' }}>Add Item</button>
      <button onClick={handleInit} style={{marginLeft:'50px'}}>Init Company History</button>
      {isModalOpen && <AddItemModal onAdd={addItem} onCancel={closeModal} />}
      
    </div>
  );
}

export default AdminDashboard;