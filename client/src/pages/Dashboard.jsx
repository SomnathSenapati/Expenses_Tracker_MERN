import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomePage, setIncomePage] = useState(1);
  const [expensePage, setExpensePage] = useState(1);
  const [totalIncomePages, setTotalIncomePages] = useState(1);
  const [totalExpensePages, setTotalExpensePages] = useState(1);

  const token = localStorage.getItem("token");

  const fetchIncome = async (page = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:2809/api/income?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const incomeData = res.data.income;
      setIncomes(incomeData.docs);
      setIncomePage(incomeData.page);
      setTotalIncomePages(incomeData.totalPages);
    } catch (err) {
      console.error("Failed to fetch incomes:", err);
    }
  };

  const fetchExpenses = async (page = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:2809/api/expense?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const expenseData = res.data.expense;
      setExpenses(expenseData.docs);
      setExpensePage(expenseData.page);
      setTotalExpensePages(expenseData.totalPages);
    } catch (err) {
      console.error("Failed to fetch expenses:", err);
    }
  };

  useEffect(() => {
    fetchIncome(incomePage);
    fetchExpenses(expensePage);
  }, []);

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;

  // Pagination handlers
  const handleIncomePrev = () => {
    if (incomePage > 1) fetchIncome(incomePage - 1);
  };

  const handleIncomeNext = () => {
    if (incomePage < totalIncomePages) fetchIncome(incomePage + 1);
  };

  const handleExpensePrev = () => {
    if (expensePage > 1) fetchExpenses(expensePage - 1);
  };

  const handleExpenseNext = () => {
    if (expensePage < totalExpensePages) fetchExpenses(expensePage + 1);
  };

  return (
    <div className="dashboard-section">
      <h2 className="section-title">Your Dashboard</h2>
      <p className="section-subtitle">Manage your income and expenses</p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Income</h3>
          <p>₹ {totalIncome.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Total Expense</h3>
          <p>₹ {totalExpense.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Balance</h3>
          <p>₹ {balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="dashboard-lists">
        <div className="transactions">
          <h4>
            Recent Incomes (Page {incomePage} of {totalIncomePages})
          </h4>
          {incomes.length === 0 ? (
            <p>No income records found.</p>
          ) : (
            incomes.slice(0, 5).map((item) => (
              <p key={item._id}>
                {item.title} — ₹{item.amount}
              </p>
            ))
          )}

          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <button
              onClick={handleIncomePrev}
              disabled={incomePage <= 1}
              className="btn-secondary"
            >
              Prev
            </button>
            <button
              onClick={handleIncomeNext}
              disabled={incomePage >= totalIncomePages}
              className="btn-secondary"
            >
              Next
            </button>
          </div>
        </div>

        <div className="transactions">
          <h4>
            Recent Expenses (Page {expensePage} of {totalExpensePages})
          </h4>
          {expenses.length === 0 ? (
            <p>No expense records found.</p>
          ) : (
            expenses.slice(0, 5).map((item) => (
              <p key={item._id}>
                {item.title} — ₹{item.amount}
              </p>
            ))
          )}

          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <button
              onClick={handleExpensePrev}
              disabled={expensePage <= 1}
              className="btn-secondary"
            >
              Prev
            </button>
            <button
              onClick={handleExpenseNext}
              disabled={expensePage >= totalExpensePages}
              className="btn-secondary"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;