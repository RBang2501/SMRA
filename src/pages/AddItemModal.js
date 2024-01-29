import React, { useState } from 'react';

function AddItemModal({ onAdd, onCancel }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    const item = {
      name, 
      description,
      quantity,
      price
    };
    
    onAdd(item);
  }

  return (
    <div className="modal">
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name"
      />
      
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"  
      />

      <input 
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity" 
      />

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)} 
        placeholder="Price"
      />

      <button onClick={handleSubmit}>Add Item</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default AddItemModal;