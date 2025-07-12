const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "About Us",
    },
    subtitle: {
      type: String,
      required: true,
      default: "The team behind MoneyMate",
    },
    content: {
      type: [String], // Array of paragraphs
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const aboutModel = mongoose.model("about", aboutSchema);
module.exports = aboutModel;
