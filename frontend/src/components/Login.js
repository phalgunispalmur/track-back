import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import "../styles/Login.css";

const Login = () => {
  const { setIsLoggedIn } = useAuth(); // Access setIsLoggedIn from context
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true"); 
        setIsLoggedIn(true); 
        alert("Login successful!");
        navigate("/menu");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
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
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
