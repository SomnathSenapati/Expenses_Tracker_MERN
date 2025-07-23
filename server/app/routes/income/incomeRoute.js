const express = require("express");
const IncomeController = require("../../controllers/income/IncomeController");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();

// Public Routes
router.post("/income/create", IncomeController.createIncome);
router.get("/income", IncomeController.AllIncome);
router.get("/income/:id", IncomeController.editIncome);
router.post("/income/update/:id", IncomeController.updateIncome);
router.post("/income/delete/:id", IncomeController.deleteIncome);
// router.get("/download/pdf", authMiddleware, IncomeController.downloadIncomePDF);

module.exports = router;
