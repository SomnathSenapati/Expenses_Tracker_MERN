import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:2809/api/user/register", {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      });

      if (res.status === 201 || res.status === 200) {
        toast.success("Registration successful!");
        setTimeout(() => navigate("/OtpVerify"), 1500);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p>
          Join <span className="brand-name">MoneyMate</span> and track your
          expenses smarter.
        </p>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="9876543210"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

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
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn-primary full-width"
          disabled={loading}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
