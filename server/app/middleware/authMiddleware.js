// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../model/user"); 

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Attach user to request (excluding password)
      req.user = decoded

      if (!req.user) {
        return res.status(401).json({ message: "User not found." });
      }

      next(); 
    } catch (error) {
      console.error("Auth error:", error);
      return res.status(401).json({ message: "Invalid or expired token." });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing." });
  }
};

module.exports = { protect };
