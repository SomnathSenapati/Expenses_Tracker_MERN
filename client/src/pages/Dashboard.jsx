import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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

      const monthlyIncomes = (res.data.income || []).filter((i) => {
        const date = new Date(i.createdAt);
        return (
          date.getMonth() === parseInt(selectedMonth) &&
          date.getFullYear() === parseInt(selectedYear)
        );
      });

      const monthlyExpenses = (res.data.expense || []).filter((e) => {
        const date = new Date(e.createdAt);
        return (
          date.getMonth() === parseInt(selectedMonth) &&
          date.getFullYear() === parseInt(selectedYear)
        );
      });

      setIncomes(monthlyIncomes);
      setExpenses(monthlyExpenses);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    }
  };

  useEffect(() => {
    if (userid && token) {
      fetchDashboardData();
    }
  }, [userid, token, selectedMonth, selectedYear]);

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );

  const pieData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];
  const COLORS = ["#4CAF50", "#F44336"];

  return (
    <div className="dashboard-section">
      <h2 className="section-title">Your Dashboard</h2>
      <p className="section-subtitle">
        Income & Expenses for {months[selectedMonth]} {selectedYear}
      </p>

      {/* Month & Year Select */}
      <div className="month-year-filter">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month, idx) => (
            <option key={idx} value={idx}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Income/Expense/Balance Cards */}
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

      {/* Pie Chart */}
      <div style={{ width: "100%", height: 300, marginTop: "40px" }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* View Transactions Button */}
      <button
        className="view-transaction-btn"
        onClick={() => navigate("/list")}
      >
        View Transactions History
      </button>
    </div>
  );
};

export default Dashboard;
