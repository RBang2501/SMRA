import React, { useState, useEffect } from 'react';
import './loginUI.css'; // Import CSS file

function LoginUi() {

    const [showRules, setShowRules] = useState(false);
    const [showCompanyDetails, setShowCompanyDetails] = useState(false);

    // Dummy list of auction rules
    const auctionRules = [
        "Rule 1: Participants must be at least 18 years old.",
        "Rule 2: Bidding increments must be in multiples of $100.",
        "Rule 3: Winning bidders must pay within 24 hours of winning the auction."
        // Add more rules as needed
    ];
    const tabData = {
        'Tab 1': 3,
        'Tab 2': 3,
        'Tab 3': 2,
        'Tab 4': 4
    };

    const [activeTab, setActiveTab] = useState('Tab 1');
    const [timer, setTimer] = useState(0);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []); // Run this effect only once after initial render

    // Format the timer
    const formatTimer = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const companyDetails = {
        name: "Company ABC",
        address: "123 Main Street, City, Country",
        phone: "123-456-7890",
        // Add more details as needed
    };

    // Dummy list of cards
    const cardsData = [
        { name: "Card 1", region: "Region 1" },
        { name: "Card 2", region: "Region 2" },
        { name: "Card 3", region: "Region 3" },
        // Add more cards as needed
    ];

    return (
        <div className="container">
            <div className="left-half">
                <div className="leftnavbar">
                    <div className="navbar-section" onClick={() => { setShowRules(false); setShowCompanyDetails(true); }}>Company Details</div>
                    <div className="navbar-section" onClick={() => { setShowRules(true); setShowCompanyDetails(false); }}>Auction Rules</div>
                </div>
                {showRules && (
                    <div className="rules-section">
                        <h2>Auction Rules</h2>
                        <ol className="rules-list">
                            {auctionRules.map((rule, index) => (
                                <li key={index}>{rule}</li>
                            ))}
                        </ol>
                    </div>
                )}
                {showCompanyDetails && (
                    <div>
                        <div className="company-details-upper">
                            <h2>Company Details</h2>
                            <div className="company-details-content">
                                <p>Name: {companyDetails.name}</p>
                                <p>Address: {companyDetails.address}</p>
                                <p>Phone: {companyDetails.phone}</p>
                                {/* Add more company details as needed */}
                            </div>
                        </div>
                        <div className="company-details-lower">
                            <div className="company-cards">
                                {cardsData.map((card, index) => (
                                    <div key={index} className="card">
                                        <div className="card-content">
                                            <div className="card-left">
                                                <div className="top-component">
                                                    <div className="lsaName">{card.name}</div>
                                                </div>
                                                <div className="middle-component">
                                                    <div className="block-size">Price: <span className='price'>2500</span></div>
                                                </div>
                                                <div className="bottom-component">
                                                    <div className="block-size">Block Size:</div>
                                                    <div className="quantity">Quantity:</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
            <div className="right-half">
                <div className="header-row">
                    <div className="header-box">
                        <div>
                            Round 1: <span className="green">Ongoing</span>
                        </div>
                    </div>
                    <div className="top-right-box">
                        <span className="timer">Clock: {formatTimer(timer)}</span>
                    </div>
                </div>
                <div className="ep">
                    <span className="ep-label">Eligibility Points (EP): <span className='green'>45690</span></span>
                </div>

                <div className="middle-box">
                    <nav className="navbar">
                        {Object.keys(tabData).map(tab => (
                            <button
                                key={tab}
                                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => handleTabClick(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>

                    <div className="cards-container">
                        {Array.from({ length: tabData[activeTab] }).map((_, index) => (
                            <div key={index} className="card">
                                <div className="card-content">
                                    <div className="card-left">
                                        <div className="top-component">
                                            <div className="lsaName">{activeTab} Card {index + 1}</div>
                                            <button className="winner-button">Winner</button>
                                        </div>
                                        <div className="middle-component">
                                            <div className="block-size">Price: <span className='price'>2500</span></div>
                                        </div>
                                        <div className="bottom-component">
                                            <div className="block-size">Block Size:</div>
                                            <div className="quantity">Quantity:</div>
                                        </div>
                                    </div>
                                    <div className="card-right">
                                        <div className="card-input-container">
                                            <label htmlFor={`qty-input-${index + 1}`}>Qty:</label>
                                            <input type="number" id={`qty-input-${index + 1}`} placeholder="Enter number" className="card-input" />
                                        </div>
                                        <div className="button-container">
                                            <button className="lock-button">Lock</button>
                                            <button className="unlock-button">Unlock</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Content for the middle box */}
                </div>
                <button className="submit-button">Submit Round</button>
            </div>
        </div>
    );
}

export default LoginUi;
