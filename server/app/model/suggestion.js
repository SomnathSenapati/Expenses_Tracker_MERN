const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const suggestionModel = mongoose.model("Suggestion", suggestionSchema);
module.exports = suggestionModel;
