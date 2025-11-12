import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

const ReportLostItem = () => {
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !phoneNumber || !image) {
      alert("Please fill all fields and upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("phoneNumber", phoneNumber);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/items/report", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Item reported successfully!");
        navigate("/menu");
      } else {
        alert(data.error || "Error reporting item");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="form-container">
      <h2>Report Lost Item</h2>
      <input
        type="text"
        placeholder="Item Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Your Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="file"
        onChange={handleImageChange}
      />
      <div className="button-box">
        <button onClick={handleSubmit}>Report Item</button>
      </div>
    </div>
  );
};

export default ReportLostItem;
