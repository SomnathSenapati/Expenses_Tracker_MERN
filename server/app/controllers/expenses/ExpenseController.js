const expenseModel = require("../../model/expense");
const httpStatusCode = require("../../helper/httpStatusCode");

class ExpenseController {
  // Create expense
  async createexpense(req, res) {
    try {
      const { title, description, type, amount, user } = req.body;

      if (!title || !type || !amount) {
        return res.status(httpStatusCode.BadRequest).json({
          status: false,
          message: "Title, type, and amount are required",
        });
      }

      if (amount < 0) {
        return res.status(httpStatusCode.BadRequest).json({
          status: false,
          message: "Amount must be positive",
        });
      }

      const expense = new expenseModel({
        // userId: req.user._id,
        title,
        description,
        type,
        amount,
        user,
      });

      const savedexpense = await expense.save();

      return res.status(httpStatusCode.Create).json({
        status: true,
        message: "expense added successfully",
        data: savedexpense,
      });
    } catch (error) {
      console.error("Create expense Error:", error);

      return res.status(httpStatusCode.InternalServerError).json({
        status: false,
        message: "Failed to create expense",
        error: error.message,
      });
    }
  }
  // fetch all expense
  async Allexpense(req, res) {
    try {
      const expense = await expenseModel.find();
      return res.status(httpStatusCode.Ok).json({
        status: true,
        message: "All expense Fetch Successfully",
        total: expense.length,
        expense: expense,
      });
    } catch (error) {
      console.error("Fetching expense Error:", error);

      return res.status(httpStatusCode.InternalServerError).json({
        status: false,
        message: "Failed to fetch expense",
        error: error.message,
      });
    }
  }
  // fetch single expense
  async editexpense(req, res) {
    try {
      const id = req.params.id;
      const expense = await expenseModel.findById(id);
      return res.status(httpStatusCode.Ok).json({
        status: true,
        message: "expense Fetch Successfully",
        data: expense,
      });
    } catch (error) {
      return res.status(httpStatusCode.InternalServerError).json({
        status: false,
        message: "Failed to fetch expense",
        error: error.message,
      });
    }
  }
  // for update
  async updateexpense(req, res) {
    try {
      const id = req.params.id;

      await expenseModel.findByIdAndUpdate(id, req.body);

      return res.status(httpStatusCode.Create).json({
        status: true,
        message: "expense Updated successfully",
      });
    } catch (error) {
      return res.status(httpStatusCode.InternalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  //for delete
  async deleteexpense(req, res) {
    try {
      const id = req.params.id;

      await expenseModel.findByIdAndDelete(id);

      return res.status(httpStatusCode.Create).json({
        status: true,
        message: "expense deleted successfully",
      });
    } catch (error) {
      return res.status(httpStatusCode.InternalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ExpenseController();
