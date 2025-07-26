import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const email = state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword || !email) {
      toast.error("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:2809/api/user/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );

      if (res.data.status) {
        toast.success("Password reset successful!");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="reset-form">
        <h2>Reset Password</h2>
        <p>Enter the OTP and your new password.</p>

        <div className="form-group">
          <label>OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn-primary full-width" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
