const express = require("express");
const IncomeController = require("../../controllers/income/IncomeController");
const router = express.Router();

// Public Routes
router.post("/create", IncomeController.createIncome);
router.get("/all-income", IncomeController.AllIncome);

module.exports = router;
