const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    button: {
      type: String,
      default: "Subscribe",
    },
    popular: {
      type: Boolean,
      default: false,
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

const pricingModel = mongoose.model("pricing", pricingSchema);
module.exports = pricingModel;
