import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    if (location.state?.message) {
      setInfoMessage(location.state.message);
      const timer = setTimeout(() => setInfoMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:2809/api/user/login",
        formData
      );

      if (res.status === 200 && res.data) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("Login successful!");

        const redirectPath = location.state?.from || "/dashboard";
        setTimeout(() => navigate(redirectPath), 1000);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back 👋</h2>
        <p>
          Login to your <span className="brand-name">MoneyMate</span> account
        </p>

        {infoMessage && (
          <div
            style={{
              background: "#fff3cd",
              color: "#856404",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            {infoMessage}
          </div>
        )}

        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />
          <div style={{ marginTop: "5px", textAlign: "right" }}>
            <Link
              to="/forgot-password"
              style={{ fontSize: "14px", color: "#007bff" }}
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary full-width"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="signup-link">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
