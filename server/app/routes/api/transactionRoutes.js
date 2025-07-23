const express = require("express");
const ListApiController = require("../../controllers/api/ListApiController");
const router = express.Router();

router.get("/transactions/:userId", ListApiController.getAllTransactions);
router.delete("/transaction/:id/:type", ListApiController.deleteTransaction);
router.put("/transaction/:id/:type", ListApiController.updateTransaction);

module.exports = router;
