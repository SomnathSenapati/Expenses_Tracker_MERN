const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getSuggestions } = require("../controllers/suggestionController");

const router = express.Router();

router.get("/suggestions/:id", protect, getSuggestions);

module.exports = router; 