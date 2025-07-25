import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    setIsLoggedIn(!!token);

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.name || "User");
      } catch (err) {
        console.error("Failed to parse user:", err);
        setUserName("User");
      }
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        💸 MoneyMate
      </Link>

      <ul className="navbar-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/services"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Services
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/features"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Features
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pricing"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Pricing
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About Us
          </NavLink>
        </li>
      </ul>

      <div className="navbar-auth">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="btn-login">
              Log In
            </Link>
            <Link to="/register" className="btn-signup">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <div
              className="action-buttons"
              style={{ display: "flex", gap: "10px", marginRight: "20px" }}
            >
              <Link to="/add-income" className="btn-action btn-income">
                Add Income
              </Link>
              <Link to="/add-expense" className="btn-action btn-expense">
                Add Expense
              </Link>
            </div>

            <div className="profile-dropdown">
              <div
                className="welcome-text"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                Welcome, {userName}
                <span
                  className="profile-icon"
                  style={{ marginLeft: "8px", cursor: "pointer" }}
                >
                  👤
                </span>
              </div>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/dashboard" className="dropdown-item">
                    Dashboard
                  </Link>
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <button
                    className="dropdown-item logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;