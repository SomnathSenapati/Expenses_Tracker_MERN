const ErrorCode = require("../../helper/httpStatusCode");
const IncomeModel = require("../../model/income");
const ExpenseModel = require("../../model/expense");

class ListApiController {
  // Get all transactions (income + expense) for a user
  async getAllTransactions(req, res) {
    try {
      const userId = req.params.userId;

      const incomeData = await IncomeModel.find({ user: userId });
      const expenseData = await ExpenseModel.find({ user: userId });

      const combined = [
        ...incomeData.map((item) => ({ ...item._doc, type: "income" })),
        ...expenseData.map((item) => ({ ...item._doc, type: "expense" })),
      ];

      // Sort by date descending
      combined.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      res.status(ErrorCode.Ok).json({
        status: true,
        message: "Transactions fetched successfully",
        total: combined.length,
        data: combined,
      });
    } catch (error) {
      res.status(ErrorCode.InternalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }

  // Delete transaction by ID and type
  async deleteTransaction(req, res) {
    try {
      const { id, type } = req.params;

      if (type === "income") {
        await IncomeModel.findByIdAndDelete(id);
      } else if (type === "expense") {
        await ExpenseModel.findByIdAndDelete(id);
      } else {
        return res.status(400).json({ status: false, message: "Invalid type" });
      }

      res.status(ErrorCode.Ok).json({
        status: true,
        message: "Transaction deleted successfully",
      });
    } catch (error) {
      res.status(ErrorCode.InternalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }

  // Update transaction by ID and type
  async updateTransaction(req, res) {
    try {
      const { id, type } = req.params;
      const updateData = req.body;

      let updated;
      if (type === "income") {
        updated = await IncomeModel.findByIdAndUpdate(id, updateData, {
          new: true,
        });
      } else if (type === "expense") {
        updated = await ExpenseModel.findByIdAndUpdate(id, updateData, {
          new: true,
        });
      } else {
        return res.status(400).json({ status: false, message: "Invalid type" });
      }

      res.status(ErrorCode.Ok).json({
        status: true,
        message: "Transaction updated successfully",
        data: updated,
      });
    } catch (error) {
      res.status(ErrorCode.InternalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ListApiController();
