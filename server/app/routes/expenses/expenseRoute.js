const express = require("express");
const ExpenseController = require("../../controllers/expenses/ExpenseController");
const router = express.Router();

// Public Routes
router.post("/expense/create", ExpenseController.createexpense);
router.get("/expense", ExpenseController.Allexpense);
router.get("/expense/:id", ExpenseController.editexpense);
router.post("/expense/update/:id", ExpenseController.updateexpense);
router.post("/expense/delete/:id", ExpenseController.deleteexpense);

module.exports = router;
