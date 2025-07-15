const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2")
const incomeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      //   enum: ["Salary", "Business", "Investment", "Freelance", "Other"],
      //   default: "Other",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive"],
    },
  },
  {
    timestamps: true,
  }
);

//paginatation 
incomeSchema.plugin(mongoosePaginate)

const incomeModel = mongoose.model("income", incomeSchema);
module.exports = incomeModel;
