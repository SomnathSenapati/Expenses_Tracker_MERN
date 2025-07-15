const incomeModel = require("../../model/income");
const httpStatusCode = require("../../helper/httpStatusCode");

class IncomeController {
  // Create Income
  async createIncome(req, res) {
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

      const income = new incomeModel({
        // userId: req.user._id,
        title,
        description,
        type,
        amount,
        user,
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
  // fetch all income
  async AllIncome(req, res) {
    const {page} = req.query
    try {
      const income = await incomeModel.paginate({}, { limit: 10, page: Number(page) });
      return res.status(httpStatusCode.Ok).json({
        status: true,
        message: "All Income Fetch Successfully",
        total: income.length,
        income: income,
      });
    } catch (error) {
      console.error("Fetching Income Error:", error);

      return res.status(httpStatusCode.InternalServerError).json({
        status: false,
        message: "Failed to fetch income",
        error: error.message,
      });
    }
  }
  // fetch single income
  async editIncome(req, res) {
    try {
      const id = req.params.id;
      const income = await incomeModel.findById(id);
      return res.status(httpStatusCode.Ok).json({
        status: true,
        message: "Income Fetch Successfully",
        data: income,
      });
    } catch (error) {
      return res.status(httpStatusCode.InternalServerError).json({
        status: false,
        message: "Failed to fetch income",
        error: error.message,
      });
    }
  }
  // for update
  async updateIncome(req, res) {
    try {
      const id = req.params.id;

      await incomeModel.findByIdAndUpdate(id, req.body);

      return res.status(httpStatusCode.Create).json({
        status: true,
        message: "Income Updated successfully",
      });
    } catch (error) {
      return res.status(httpStatusCode.InternalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  //for delete
  async deleteIncome(req, res) {
    try {
      const id = req.params.id;

      await incomeModel.findByIdAndDelete(id);

      return res.status(httpStatusCode.Create).json({
        status: true,
        message: "Income deleted successfully",
      });
    } catch (error) {
      return res.status(httpStatusCode.InternalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new IncomeController();
