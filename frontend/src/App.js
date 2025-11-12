import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import ReportLostItem from "./components/ReportLostItem";
import SearchLostItems from "./components/SearchLostItems";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/report" element={<ReportLostItem />} />
          <Route path="/search" element={<SearchLostItems />} />
        </Routes>
         <Footer /> {/* Footer */}
      </Router>
    </AuthProvider>
  );
}

export default App;
