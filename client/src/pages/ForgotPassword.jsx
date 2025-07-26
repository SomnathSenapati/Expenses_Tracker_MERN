import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:2809/api/user/forgot-password",
        {
          email,
        }
      );

      if (res.data.status) {
        toast.success("OTP sent to your email.");
        setTimeout(() => {
          navigate("/reset-password", { state: { email } });
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="forgot-form">
        <h2>Forgot Password</h2>
        <p>Enter your registered email to receive OTP</p>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button className="btn-primary full-width" disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
