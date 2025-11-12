import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Menu.css";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <section className="menu-container">
      <h1>Lost & Found Items</h1>
      <p>Browse through recently reported lost and found items at the university.</p>
      <button className="report-button" onClick={() => navigate("/report")}>
        Report a Lost Item
      </button>
      <button className="search-button" onClick={() => navigate("/search")}>
        Search Lost Items
      </button>
    </section>
  );
};

export default Menu;
