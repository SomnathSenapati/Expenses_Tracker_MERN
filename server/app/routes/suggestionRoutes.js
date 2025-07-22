const express = require("express");
const router = express.Router();
const SuggestionController = require("../controllers/suggestionController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/suggestions", authMiddleware, SuggestionController.getSuggestions);

module.exports = router;
