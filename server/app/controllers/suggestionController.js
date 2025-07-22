const Income = require("../model/income");
const Expense = require("../model/expense");

class SuggestionController {
  async getSuggestions(req, res) {
    const userId = req.user._id;

    try {
      const incomes = await Income.find({ user: userId });
      const expenses = await Expense.find({ user: userId });

      const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
      const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

      const suggestions = [];

      if (totalIncome === 0) {
        suggestions.push("No income data found. Please add your income.");
      }

      if (totalExpense > totalIncome) {
        suggestions.push(
          "You are spending more than your income. Consider cutting expenses."
        );
      } else {
        const percentSpent = (totalExpense / totalIncome) * 100;

        if (percentSpent > 80) {
          suggestions.push(
            "You're spending over 80% of your income. Try to save more."
          );
        } else if (percentSpent < 50) {
          suggestions.push(
            "Great job! You're spending less than 50% of your income."
          );
        }

        suggestions.push(
          `Suggested savings: ₹${(totalIncome * 0.2).toFixed(
            0
          )} (20% of income)`
        );
      }

      return res.status(200).json({ success: true, suggestions });
    } catch (error) {
      console.error("Suggestion Error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong." });
    }
  }
}

module.exports = new SuggestionController();
