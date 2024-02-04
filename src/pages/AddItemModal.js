// AddItemModal.js
import React, { useState } from 'react';
import './AddItemModal.css';
import { cartItemsList } from './cartData';

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
    <div className="container">
      {/* Left Box: Add Item Details */}
      <div className="add-item-container">
        <h2>Add Item</h2>
        <form>
          <div className="input-group">
            <label>Region:</label>
            <input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Region"
            />
          </div>

          <div className="input-group">
            <label>Frequency Band:</label>
            <input
              value={freqBand}
              onChange={(e) => setFreqBand(e.target.value)}
              placeholder="Frequency Band"
            />
          </div>

          <div className="input-group">
            <label>Unpaired (on sale):</label>
            <input
              value={unpairedOnSale}
              onChange={(e) => setUnpairedOnSale(e.target.value)}
              placeholder="Unpaired (on sale)"
            />
          </div>

          <div className="input-group">
            <label>Paired (on sale):</label>
            <input
              value={pairedOnSale}
              onChange={(e) => setPairedOnSale(e.target.value)}
              placeholder="Paired (on sale)"
            />
          </div>

          <div className="input-group">
            <label>Reserved Price (per block):</label>
            <input
              value={reservedPrice}
              onChange={(e) => setReservedPrice(e.target.value)}
              placeholder="Reserved Price (per block)"
            />
          </div>

          <div className="input-group">
            <label>EP (per block):</label>
            <input
              value={epPerBlock}
              onChange={(e) => setEpPerBlock(e.target.value)}
              placeholder="EP (per block)"
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
            <div key={item.id} className="cart">
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
