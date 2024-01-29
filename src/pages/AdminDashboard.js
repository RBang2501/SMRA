import React, { useState } from 'react';
import AddItemModal from './AddItemModal';
import ItemTable from './ItemTable'; 

function AdminDashboard() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const addItem = (item) => {
    setItems([...items, item]);
    closeModal();
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={openModal}>Add Item</button>
      
      <ItemTable items={items} />
      
      {isModalOpen && 
        <AddItemModal
          onAdd={addItem}
          onCancel={closeModal} 
        />
      }
    </div>
  );
}

export default AdminDashboard;