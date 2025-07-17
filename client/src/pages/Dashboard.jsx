import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userid = user?._id;

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:2809/api/user/dashboard/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIncomes(res.data.income || []);
      setExpenses(res.data.expense || []);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    }
  };

  useEffect(() => {
    if (userid && token) {
      fetchDashboardData();
    }
  }, [userid, token]);

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

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
          <h4>Recent Incomes</h4>
          {incomes.length === 0 ? (
            <p>No income records found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {incomes.map((item) => (
                  <tr key={item._id}>
                    <td>{formatDate(item.createdAt)}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.type}</td>
                    <td>₹{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="transactions">
          <h4>Recent Expenses</h4>
          {expenses.length === 0 ? (
            <p>No expense records found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((item) => (
                  <tr key={item._id}>
                    <td>{formatDate(item.createdAt)}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.type}</td>
                    <td>₹{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;