import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, set, onValue } from "firebase/database";

const SelectAuction = () => {
  const [newAuctionName, setNewAuctionName] = useState("");
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    // Fetch existing auctions when the component mounts
    handleReadAuctions();
  }, []);

  const handleCreateAuction = (name) => {
    const db = getDatabase();
    set(ref(db, 'Auctions/' + name), {
      auctionName: name,
      id: auctions.length + 1
    });
    setNewAuctionName("");
  };

  const handleReadAuctions = () => {
    const db = getDatabase();
    const starCountRef = ref(db, 'Auctions/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const auctionsArray = Object.keys(data).map(key => ({
          id: data[key].id,
          name: data[key].auctionName
        }));
        setAuctions(auctionsArray);
      }
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "20px" }}>
        <h1>Select an Auction</h1>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Input box for creating a new auction */}
          <input
            type="text"
            value={newAuctionName}
            onChange={(e) => setNewAuctionName(e.target.value)}
            placeholder="Enter Auction Name"
            style={{ marginBottom: "10px", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          {/* Button to read existing auctions */}
          <button onClick={() => handleReadAuctions()} style={{ padding: "5px 10px", borderRadius: "5px", border: "1px solid #007bff", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}>Read Auction</button>
          {/* Button to create a new auction */}
          <button onClick={() => handleCreateAuction(newAuctionName)} style={{ padding: "5px 10px", borderRadius: "5px", border: "1px solid #007bff", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}>Create Auction</button>
          {/* List of already created auctions as cards */}
          {auctions.map((auction) => (
            <div key={auction.id} style={{ border: "1px solid #ccc", borderRadius: "5px", margin: "10px", padding: "10px", width: "200px" }}>
              <Link to={`/auction/${auction.id}`} style={{ textDecoration: "none", color: "#333" }}>
                <h3 style={{ margin: "0", fontSize: "16px", textAlign: "center" }}>{auction.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectAuction;
