import React, { useState, useEffect } from 'react';
import './AddItemModal.css';
import '../Styles/AddItemModal.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useAuth } from "./authContext";
/*
useParams():
This hook, sourced from React Router DOM, extracts parameters from the URL path in React components. Here, it retrieves the auctionName parameter from the URL.
useState():
useState() is employed to manage state within functional components in React. It declares state variables (region, freqBand, blockSize, etc.) to hold values from form fields and manage cart items.
useEffect():
useEffect() executes side effects in functional components post-render. In this code, it handles the side effect of fetching auction items from Firebase upon component mounting.
useAuth():
A custom hook granting access to authentication-related context within the application. It provides information about the current user's authentication status, retrieved here as currentUser.
useNavigate():
This hook, from React Router DOM, facilitates programmatic navigation within the application. It redirects the user to the login page if no authenticated user is present (currentUser is null).
handleSubmit():
A custom function managing form submission. It updates the Firebase database with new item details entered in the form and subsequently clears the form inputs.
clearForm():
A custom function resetting form inputs. It returns all input fields to their initial state, erasing any entered values.

region:
Type: String
Description: Stores the value of the region entered in the form input field.
freqBand:
Type: String
Description: Holds the value of the frequency band entered in the form input field.
blockSize:
Type: String
Description: Stores the value of the block size entered in the form input field.
unpairedOnSale:
Type: String
Description: Holds the value of unpaired blocks available for sale entered in the form input field.
pairedOnSale:
Type: String
Description: Stores the value of paired blocks available for sale entered in the form input field.
reservedPrice:
Type: String
Description: Holds the value of the reserved price per block entered in the form input field.
epPerBlock:
Type: String
Description: Stores the value of energy performance per block entered in the form input field.
cartItems:
Type: Array
Description: Stores an array of objects representing items added to the cart. Each object contains details such as region, frequency band, block size, etc.
currentUser:
Type: Object
Description: Stores information about the currently authenticated user.
navigate:
Type: Function
Description: A function provided by the useNavigate() hook for programmatic navigation within the application.
Other Variables:
auctionName:
Type: String
Description: Stores the name of the auction extracted from the URL path using the useParams() hook.
*/
function AddItemModal() {
  const { auctionName } = useParams();
  const [region, setRegion] = useState('');
  const [freqBand, setFreqBand] = useState('');
  const [blockSize, setBlockSize] = useState('');
  const [unpairedOnSale, setUnpairedOnSale] = useState('');
  const [pairedOnSale, setPairedOnSale] = useState('');
  const [reservedPrice, setReservedPrice] = useState('');
  const [epPerBlock, setEpPerBlock] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  // console.log(auctionName);

  useEffect(() => {
    console.log(currentUser);
    if (!currentUser) {
      navigate(`/`) // Redirect to login page{}
    } else {
      const db = getDatabase();
      const itemsRef = ref(db, `Auctions/${auctionName}/Items`);
      onValue(itemsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const newCartItems = [];
          Object.keys(data).forEach((freqBand) => {
            Object.keys(data[freqBand]).forEach((region) => {
              const newItem = {
                region: region,
                freqBand: freqBand,
                blockSize: data[freqBand][region].blockSize,
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
    }
  }, []); // Empty dependency array to run the effect only once on component mount

  const handleSubmit = () => {
    const db = getDatabase();
    set(ref(db, `Auctions/${auctionName}/Items/${freqBand}/${region}`), {
      unpairedBlocks: unpairedOnSale,
      pairedBlocks: pairedOnSale,
      reservedPrice: reservedPrice,
      epPerBlock: epPerBlock,
      blockSize: blockSize
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
            <label>Block Size</label>
            <input
              type="text"
              value={blockSize}
              onChange={(e) => setBlockSize(e.target.value)}
              placeholder="Enter Block Size"
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

      {/* Right Box: Cart */}
      <div className="cart-container" style={{ overflow: 'scroll' }}>
        <div className="cart-container">
          <h2>Cart</h2>
          <ul>
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <strong>Region:</strong> {item.region}
                <br />
                <strong>Freq Band:</strong> {item.freqBand}
                <br />
                <strong>Block Size:</strong> {item.blockSize}
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
    </div>
  );
}

export default AddItemModal;
