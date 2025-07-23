const incomeModel = require("../../model/income");
const httpStatusCode = require("../../helper/httpStatusCode");
const PDFDocument = require("pdfkit");

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
    const { page } = req.query;
    try {
      const income = await incomeModel.paginate(
        {},
        { limit: 10, page: Number(page) }
      );
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
      const incomeId = req.params.id;
      if (!incomeId) {
        return res.status(400).json({
          status: false,
          message: "Income ID is required",
        });
      }

      const income = await incomeModel.findById(incomeId);

      if (!income) {
        return res.status(404).json({
          status: false,
          message: "Income not found",
        });
      }

      return res.status(httpStatusCode.Ok).json({
        status: true,
        message: "Income fetched successfully",
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

  // async downloadIncomePDF (req, res){
  //   try {
  //     const incomes = await incomeModel.find({ user: req.user.id });

  //     const doc = new PDFDocument();
  //     res.setHeader("Content-Type", "application/pdf");
  //     res.setHeader(
  //       "Content-Disposition",
  //       "attachment; filename=income_data.pdf"
  //     );

  //     doc.pipe(res);

  //     doc.fontSize(20).text("Income List", { underline: true });
  //     doc.moveDown();

  //     incomes.forEach((item, index) => {
  //       doc
  //         .fontSize(12)
  //         .text(
  //           `${index + 1}. Title: ${item.title}\n   Type: ${
  //             item.type
  //           }\n   Amount: ₹${item.amount}\n   Date: ${new Date(
  //             item.createdAt
  //           ).toLocaleDateString()}`,
  //           { lineGap: 4 }
  //         );
  //       doc.moveDown();
  //     });

  //     doc.end();
  //   } catch (error) {
  //     console.error("PDF Export Error:", error);
  //     res.status(500).json({ message: "Failed to export data to PDF" });
  //   }
  // }
}

module.exports = new IncomeController();
