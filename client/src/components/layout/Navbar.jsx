import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
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
        <Link to="/login" className="btn-login">
          Log In
        </Link>
        <Link to="/register" className="btn-signup">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
