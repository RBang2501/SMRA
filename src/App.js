// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/adminDashboard";
import Home from "./pages/home";
import CompanyAuction from "./pages/companyAuction";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard/:auctionName" element={<AdminDashboard />} />
        <Route path="/company" element={<CompanyAuction />} />
      </Routes>
    </Router>
  );
}

export default App;
