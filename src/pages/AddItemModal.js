// AddItemModal.js
import React, { useState } from 'react';
import './AddItemModal.css';
import { cartItemsList } from './cartData';
import '../Styles/AddItemModal.css';

function AddItemModal() {
  const [region, setRegion] = useState('');
  const [freqBand, setFreqBand] = useState('');
  const [unpairedOnSale, setUnpairedOnSale] = useState('');
  const [pairedOnSale, setPairedOnSale] = useState('');
  const [reservedPrice, setReservedPrice] = useState('');
  const [epPerBlock, setEpPerBlock] = useState('');

  const handleSubmit = () => {
    const newItem = {
      id: cartItemsList.length + 1,
      region,
      freqBand,
      unpairedOnSale,
      pairedOnSale,
      reservedPrice,
      epPerBlock,
    };

    cartItemsList.push(newItem);
    clearForm();

    console.log(cartItemsList);
  };

  const clearForm = () => {
    setRegion('');
    setFreqBand('');
    setUnpairedOnSale('');
    setPairedOnSale('');
    setReservedPrice('');
    setEpPerBlock('');
  };

  return (
    <div className="container" style = {{height: '85vh'}}>
      {/* Left Box: Add Item Details */}
        <div className="cart-container">
        <h2>Add Item</h2>
        <form>
          <div className="input-group">
            <label>Region</label>
            <input
              type = "text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Ayodhya"
            />
          </div>

          <div className="input-group">
            <label>Frequency Band</label>
            <input
            type = "text"
              value={freqBand}
              onChange={(e) => setFreqBand(e.target.value)}
              placeholder="1000 Mhz"
            />
          </div>

          <div className="input-group">
            <label>Unpaired (on sale)</label>
            <input
              type = "text"
              value={unpairedOnSale}
              onChange={(e) => setUnpairedOnSale(e.target.value)}
              placeholder="10"
            />
          </div>

          <div className="input-group">
            <label>Paired (on sale)</label>
            <input
              type = "text"
              value={pairedOnSale}
              onChange={(e) => setPairedOnSale(e.target.value)}
              placeholder="20"
            />
          </div>

          <div className="input-group">
            <label>Reserved Price (per block)</label>
            <input
              type = "text"
              value={reservedPrice}
              onChange={(e) => setReservedPrice(e.target.value)}
              placeholder="3000000"
            />
          </div>

          <div className="input-group">
            <label>EP (per block)</label>
            <input
              type = "text"
              value={epPerBlock}
              onChange={(e) => setEpPerBlock(e.target.value)}
              placeholder="2000"
            />
          </div>

          <button type="button" onClick={handleSubmit}>
            Add Item
          </button>
        </form>
      </div>

      {/* Right Box: Cart */}
      <div className="cart-container">
        <h2>Cart</h2>
        <ul>
          {cartItemsList.map((item) => (
            <div key={item.id} className="cart-item">
              <strong>Region:</strong> {item.region}
              <br />
              <strong>Freq Band:</strong> {item.freqBand}
              <br />
              <strong>Unpaired (on sale):</strong> {item.unpairedOnSale}
              <br />
              <strong>Paired (on sale):</strong> {item.pairedOnSale}
              <br />
              <strong>Reserved Price:</strong> {item.reservedPrice}
              <br />
              <strong>EP:</strong> {item.epPerBlock}
              <br />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddItemModal;
