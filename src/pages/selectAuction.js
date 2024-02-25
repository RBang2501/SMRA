import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useAuth } from "./authContext";

const SelectAuction = () => {
  const [newAuctionName, setNewAuctionName] = useState("");
  const [auctions, setAuctions] = useState([]);
  const { currentUser } = useAuth();
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate(`/`); // Redirect to login page
    } else {
      // Extract company name from URL
      const companyNameFromURL = extractCompanyNameFromURL();
      setCompanyName(companyNameFromURL);

      handleReadAuctions(); // Fetch auctions only when user is logged in
    }
  }, [currentUser]);

  const extractCompanyNameFromURL = () => {
    const pathSegments = window.location.pathname.split('/');
    return pathSegments[2]; // Assuming the company name is the third segment in the URL
  };

  const handleCreateAuction = (name) => {
    const db = getDatabase();
    set(ref(db, 'Auctions/' + name), {
      auctionName: name,
      id: auctions.length + 1
    });
    setNewAuctionName("");

    set(ref(db, `Auctions/${name}/provisionalWinner/`), {
      id: 1,
  });
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

  // Function to handle click on auction card
  const handleAuctionCardClick = (auction) => {
    const isAdmin = companyName === "admin";
    const path = isAdmin
      ? `/admin/auction/${auction.name}`
      : `/auction/${auction.name}/companyDetails/${companyName}`;
    navigate(path);
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
          {/* Button to create a new auction */}
          <button onClick={() => handleCreateAuction(newAuctionName)} style={{ padding: "5px 10px", borderRadius: "5px", border: "1px solid #007bff", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}>Create Auction</button>
          {/* List of already created auctions as cards */}
          {auctions.map((auction) => (
            <div key={auction.id} style={{ marginBottom: "10px", cursor: "pointer" }} onClick={() => handleAuctionCardClick(auction)}>
              <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", width: "200px" }}>
                <h3 style={{ margin: "0", fontSize: "16px", textAlign: "center" }}>{auction.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectAuction;
