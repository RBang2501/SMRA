// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/adminDashboard";
import Home from "./pages/home";
import CompanyAuction from "./pages/companyAuction";
import CompanyDashboard from "./pages/CompanyDashboard";
import { AuthProvider} from "./pages/authContext"; 
import SelectAuction from "./pages/selectAuction";

function App() {
  return (
    <AuthProvider> {/* Wrap the entire application with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/selectAuction" element={<SelectAuction />} />
          <Route path="/company-dashboard/:companyName" element={<CompanyDashboard />} />
          {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
          <Route path="/companyAuction" element={<CompanyAuction />} />
          {/* <Route path="/company-dashboard" element={<CompanyDashboard />} /> */}
        </Routes>
      </Router>
    </AuthProvider> 
  );
}

export default App;
