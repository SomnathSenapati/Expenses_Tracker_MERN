import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (timeLeft <= 0) {
      setError("❌ OTP expired. Please request a new one.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:2809/api/user/verify/email",
        {
          email,
          otp,
        }
      );

      if (response.status === 200) {
        setMessage("✅ Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setError("❌ Invalid OTP or verification failed.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Verification failed. Try again."
      );
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError("Please enter your email before requesting OTP.");
      return;
    }

    setIsResending(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:2809/api/user/resend-otp",
        {
          email,
        }
      );

      if (response.status === 200) {
        setMessage("📧 New OTP has been sent to your email.");
        setTimeLeft(60);
      } else {
        setError("❌ Failed to resend OTP.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error resending OTP.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Verify Your Email</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button style={styles.button} type="submit" disabled={timeLeft === 0}>
          Verify
        </button>

        {timeLeft > 0 ? (
          <p style={{ marginTop: "10px", color: "#555" }}>
            ⏳ OTP expires in {timeLeft}s
          </p>
        ) : (
          <button
            style={{
              ...styles.button,
              backgroundColor: isResending ? "#aaa" : "#1976d2",
              cursor: isResending ? "not-allowed" : "pointer",
            }}
            type="button"
            onClick={handleResendOtp}
            disabled={isResending}
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </button>
        )}
      </form>

      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

// Style object
const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#1976d2",
    color: "#fff",
    cursor: "pointer",
  },
  success: {
    color: "green",
    marginTop: "15px",
  },
  error: {
    color: "red",
    marginTop: "15px",
  },
};

export default VerifyEmail;
