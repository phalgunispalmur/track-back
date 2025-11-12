import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext"; 
import "../styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");  
        setIsLoggedIn(true);                         
        navigate("/menu");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="University Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="button-box">
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
};

export default Signup;
