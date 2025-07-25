import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="pagenotfound-container">
      <div className="pagenotfound-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Oops! Page Not Found</h2>
        <p className="error-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="home-button">
          ⬅️ Back to Home
        </Link>
        <img
          src="/Screenshot a(225).png"
          alt="Page not found"
          className="error-image"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
