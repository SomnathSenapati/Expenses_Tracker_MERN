import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Manage Your <br />
          Expenses Easily <br />
          With <span className="brand-name">MoneyMate</span>
        </h1>
        <p className="hero-desc">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={handleContactClick}>
            Let's Talk
          </button>
          <button className="btn-secondary">View Demo</button>
        </div>
        <div className="brands">
          <img src="/brands/severin.png" alt="brand" />
          <img src="/brands/canali.png" alt="brand" />
          <img src="/brands/praxair.png" alt="brand" />
          <img src="/brands/solarcity.png" alt="brand" />
          <img src="/brands/connex.png" alt="brand" />
          <img src="/brands/brickworks.png" alt="brand" />
        </div>
      </div>
      <div className="hero-analytics">
        <img src="hero.png" alt="brand" />
      </div>
    </section>
  );
};

export default HeroSection;
