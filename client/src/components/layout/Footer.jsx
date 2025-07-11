import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} ExpenseTracker. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
