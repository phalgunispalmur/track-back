import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext"; 
import "../styles/Navbar.css"; 


const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false); 
    navigate("/"); 
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">trackback.</Link>
      </div>
      <ul className="nav-links">
        {!isLoggedIn ? (
          <>
            <li><Link to="/login">login</Link></li>
            <li><Link to="/signup">signup</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/menu">menu</Link></li>
            <li><button onClick={handleLogout}>logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
