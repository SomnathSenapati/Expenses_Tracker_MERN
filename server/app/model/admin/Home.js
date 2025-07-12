const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    headingLine1: { type: String, required: true }, 
    headingLine2: { type: String, required: true }, 
    headingLine3: { type: String, required: true }, 
    brandHighlight: { type: String, required: true }, 
    description: { type: String, required: true },
    ctaPrimaryText: { type: String, default: "Let's Talk" },
    ctaPrimaryLink: { type: String, default: "/contact" },
    ctaSecondaryText: { type: String, default: "View Demo" },
    ctaSecondaryLink: { type: String, default: "#" },
    analyticsImage: { type: String }, 
    // brandLogos: [{ type: String }], 
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const heroModel = mongoose.model("hero", heroSchema);
module.exports = heroModel;
