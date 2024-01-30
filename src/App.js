// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/adminDashboard";
import Home from "./pages/home";
import CompanyAuction from "./pages/companyAuction";
import CompanyDashboard from "./pages/CompanyDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard/:auctionName" element={<AdminDashboard />} />
        <Route path="/company-dashboard/:companyName" element={<CompanyDashboard />} />
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        <Route path="/companyAuction" element={<CompanyAuction />} />
        {/* <Route path="/company-dashboard" element={<CompanyDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
