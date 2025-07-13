const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "About Us",
    },
    content: {
      type: [String], 
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
