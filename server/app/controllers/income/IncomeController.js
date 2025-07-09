const incomeModel = require("../../model/income");
const httpStatusCode = require("../../helper/httpStatusCode");

class IncomeController {
  // ✅ Create Income
  async createIncome(req, res) {
    try {
      const { title, description, type, amount, date } = req.body;

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

      const income = new incomeModel({
        // userId: req.user._id,
        title,
        description,
        type,
        amount,
        date: date || new Date(),
      });

      const savedIncome = await income.save();

      return res.status(httpStatusCode.Create).json({
        status: true,
        message: "Income added successfully",
        data: savedIncome,
      });
    } catch (error) {
      console.error("Create Income Error:", error);

      return res.status(httpStatusCode.InternalServerError).json({
        status: false,
        message: "Failed to create income",
        error: error.message,
      });
    }
  }

  async AllIncome(req, res) {
    try {
      const income = await incomeModel.find();
      return res.status(httpStatusCode.Ok).json({
        status:true,
        message: "All Income Fetch Successfully",
        total: income.length,
        income: income
      })
    } catch (error) {
      console.error("Create Income Error:", error);

      return res.status(httpStatusCode.InternalServerError).json({
        status: false,
        message: "Failed to create income",
        error: error.message,
      });
    }
  }
}

module.exports = new IncomeController();
