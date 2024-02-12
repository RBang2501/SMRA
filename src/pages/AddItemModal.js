import React, { useState, useEffect } from 'react';
import './AddItemModal.css';
import '../Styles/AddItemModal.css';
import { getDatabase, ref, set, onValue } from "firebase/database";

function AddItemModal() {
  const [region, setRegion] = useState('');
  const [freqBand, setFreqBand] = useState('');
  const [unpairedOnSale, setUnpairedOnSale] = useState('');
  const [pairedOnSale, setPairedOnSale] = useState('');
  const [reservedPrice, setReservedPrice] = useState('');
  const [epPerBlock, setEpPerBlock] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const itemsRef = ref(db, 'Auctions/Instance1/Items');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newCartItems = [];
        Object.keys(data).forEach((freqBand) => {
          Object.keys(data[freqBand]).forEach((region) => {
            const newItem = {
              region: region,
              freqBand: freqBand,
              unpairedOnSale: data[freqBand][region].unpairedBlocks,
              pairedOnSale: data[freqBand][region].pairedBlocks,
              reservedPrice: data[freqBand][region].reservedPrice,
              epPerBlock: data[freqBand][region].epPerBlock
            };
            newCartItems.push(newItem);
          });
        });
        setCartItems(newCartItems);
      }
    });
  }, []); // Empty dependency array to run the effect only once on component mount

  const handleSubmit = () => {
    const db = getDatabase();
    set(ref(db, 'Auctions/' + "Instance1" + "/Items/" + freqBand + "/" + region), {
      unpairedBlocks: unpairedOnSale,
      pairtedBlocks: pairedOnSale,
      reservedPrice: reservedPrice,
      epPerBlock: epPerBlock
    });
    clearForm();
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
    <div className="container" style={{ height: '85vh' }}>
      <div className="cart-container">
        <h2>Add Item</h2>
        <form>
          <div className="input-group">
            <label>Region</label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Enter Region"
            />
          </div>
          <div className="input-group">
            <label>Frequency Band</label>
            <input
              type="text"
              value={freqBand}
              onChange={(e) => setFreqBand(e.target.value)}
              placeholder="Enter Frequency Band"
            />
          </div>
          <div className="input-group">
            <label>Unpaired (on sale)</label>
            <input
              type="text"
              value={unpairedOnSale}
              onChange={(e) => setUnpairedOnSale(e.target.value)}
              placeholder="Enter Unpaired Blocks On Sale"
            />
          </div>
          <div className="input-group">
            <label>Paired (on sale)</label>
            <input
              type="text"
              value={pairedOnSale}
              onChange={(e) => setPairedOnSale(e.target.value)}
              placeholder="Enter Paired Blocks On Sale"
            />
          </div>
          <div className="input-group">
            <label>Reserved Price (per block)</label>
            <input
              type="text"
              value={reservedPrice}
              onChange={(e) => setReservedPrice(e.target.value)}
              placeholder="Enter Reserved Price"
            />
          </div>
          <div className="input-group">
            <label>EP (per block)</label>
            <input
              type="text"
              value={epPerBlock}
              onChange={(e) => setEpPerBlock(e.target.value)}
              placeholder="Enter EP Per Block"
            />
          </div>
          <button type="button" onClick={handleSubmit}>Add Item</button>
        </form>
      </div>

      <div className="cart-container">
        <h2>Cart</h2>
        <ul>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
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
