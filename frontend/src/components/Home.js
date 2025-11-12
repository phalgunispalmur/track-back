import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link for navigation
import "../styles/Home.css";
import megaphoneImage from "../assets/lost-found.png";

const Home = () => {
  return (
    <section className="home-container">
      <div className="text-section">
        <h2>WELCOME TO</h2>
        <h1>trackback.</h1>
        <p>
          A dedicated platform for students and faculty to report and find lost items within the university. Stay updated with recent findings.
        </p>

        {/* ✅ Add CTA button wrapped in Link */}
        <Link to="/signup" className="cta-link">
          <button className="cta-button">Get Started</button>
        </Link>
      </div>

      <div className="image-section">
        <div className="green-circle">
          <img src={megaphoneImage} alt="Lost and Found" />
        </div>
      </div>
    </section>
  );
};

export default Home;
