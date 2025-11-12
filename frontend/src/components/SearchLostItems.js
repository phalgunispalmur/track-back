import React, { useState, useEffect } from "react";
import "../styles/Search.css";

const SearchLostItems = () => {
  const [lostItems, setLostItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/items/search");
        const data = await res.json();
        setLostItems(data);
      } catch (err) {
        console.error("Error fetching lost items:", err);
      }
    };

    fetchLostItems();
  }, []);

  const handleStatusChange = async (itemId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/items/status/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updatedItem = await res.json();
        setLostItems((prevItems) =>
          prevItems.map((it) => (it._id === itemId ? updatedItem : it))
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/items/${itemId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLostItems((prevItems) => prevItems.filter((it) => it._id !== itemId));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <section className="search-container">
      <h1>Search Lost Items</h1>
      <div className="lost-items-list">
        {lostItems.length > 0 ? (
          lostItems.map((item) => (
            <div className="lost-item" key={item._id}>
              {item.image && (
                <img
                  src={`http://localhost:5000/uploads/${item.image}`}
                  alt="Lost item"
                  onClick={() => setSelectedImage(`http://localhost:5000/uploads/${item.image}`)}
                  style={{ cursor: "pointer" }}
                />
              )}
              <div className="item-details">
                <p>{item.description}</p>
                <p>Contact: {item.phoneNumber}</p>
                <p>
                  Reported on:{" "}
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <label>
                  Status:{" "}
                  <select
                    value={item.status || "Not Collected"}
                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  >
                    <option value="Not Collected">Not Collected</option>
                    <option value="Collected">Collected</option>
                  </select>
                </label>
                {item.status === "Collected" && (
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No lost items found.</p>
        )}
      </div>

      {/* {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <img src={selectedImage} alt="Full View" />
          </div>
        </div>
      )} */}
    </section>
  );
};

export default SearchLostItems;
