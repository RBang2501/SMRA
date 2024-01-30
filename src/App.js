import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import AdminDashboard from "./pages/adminDashboard";
import AdminAuction from "./pages/adminAuction";
import CompanyAuction from "./pages/companyAuction";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />}></Route>
        <Route path="/adminDashboard" element={<AdminDashboard />}></Route>
        <Route path="/adminAuction" element={<AdminDashboard />}></Route>
        <Route path="/companyAuction" element={<AdminDashboard />}></Route>

      </Routes>
    </Router>
  );
}

export default App;