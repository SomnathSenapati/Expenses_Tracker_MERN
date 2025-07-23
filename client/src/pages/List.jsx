import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
 import { useNavigate } from "react-router-dom";
 import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const downloadPDF = (data) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Transaction List", 14, 20);

  const headers = [["Title", "Description", "Type", "Amount", "Date"]];
  const rows = data.map((item) => [
    item.title,
    item.description,
    item.categoryType,
    `₹${item.amount}`,
    new Date(item.createdAt).toLocaleDateString(),
  ]);

  autoTable(doc, {
    head: headers,
    body: rows,
    startY: 30,
  });

  doc.save("transactions.pdf");
};

const COLORS = ["#28a745", "#dc3545"];

const List = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

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

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const navigate = useNavigate();

  const handleEdit = (item, type) => {
    navigate(`/edit/${item._id}/${type}`, {
      state: { data: item },
    });
  };

  const handleDelete = async (id, type) => {
    try {
      const token = localStorage.getItem("token");

      const endpoint = `http://localhost:2809/api/transaction/${id}/${type}`;

      await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (type === "income") {
        setIncomes((prev) => prev.filter((item) => item._id !== id));
      } else {
        setExpenses((prev) => prev.filter((item) => item._id !== id));
      }

      toast.success(`${type} deleted successfully!`);
    } catch (error) {
      console.error(`Failed to delete ${type}:`, error);
      toast.error("Failed to delete transaction");
    }
  };


  const getFilteredData = () => {
    const now = new Date();
    const filterByDate = (item) => {
      const itemDate = new Date(item.createdAt);
      switch (dateFilter) {
        case "1week":
          return itemDate >= new Date(now.setDate(now.getDate() - 7));
        case "1month":
          return itemDate >= new Date(now.setMonth(now.getMonth() - 1));
        case "3months":
          return itemDate >= new Date(now.setMonth(now.getMonth() - 3));
        case "1year":
          return itemDate >= new Date(now.setFullYear(now.getFullYear() - 1));
        default:
          return true;
      }
    };

    let combined = [
      ...incomes.map((i) => ({ ...i, categoryType: "income" })),
      ...expenses.map((e) => ({ ...e, categoryType: "expense" })),
    ];

    return combined
      .filter(filterByDate)
      .filter((item) =>
        typeFilter === "all" ? true : item.categoryType === typeFilter
      )
      .filter((item) =>
        categoryFilter === "all" ? true : item.type === categoryFilter
      );
  };

  useEffect(() => {
    const filtered = getFilteredData();
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [incomes, expenses, dateFilter, typeFilter, categoryFilter]);

  const totalIncome = filteredData
    .filter((item) => item.categoryType === "income")
    .reduce((sum, i) => sum + i.amount, 0);

  const totalExpense = filteredData
    .filter((item) => item.categoryType === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = totalIncome - totalExpense;
  const turnover = totalIncome + totalExpense;

  const chartData = [
    { name: "Income", value: totalIncome },
    { name: "Expense", value: totalExpense },
  ];

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="dashboard-section">
      <h2 className="section-title">Transaction List</h2>
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
        <div className="card">
          <h3>Total Turnover</h3>
          <p>₹ {turnover.toFixed(2)}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div style={{ maxWidth: 500, margin: "auto", marginBottom: 20 }}>
        <h4 style={{ textAlign: "center" }}>Income vs Expense</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Smart Budget Button */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <Link to={`/suggestion`}>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Smart Budgeting Suggestion
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div
        className="filters"
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="1week">Last 1 Week</option>
          <option value="1month">Last 1 Month</option>
          <option value="3months">Last 3 Months</option>
          <option value="1year">Last 1 Year</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Salary">Salary</option>
          <option value="Business">Business</option>
          <option value="Investment">Investment</option>
          <option value="Freelance">Freelance</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Table */}
      <div className="transactions">
        <h4>Filtered Transactions</h4>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={() => downloadPDF(filteredData)}
          className="bg-green-600 text-white px-4 py-2 rounded shadow"
        >
          Download PDF
        </button>

        {currentRows.length === 0 ? (
          <p>No matching records found.</p>
        ) : (
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Description</th>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((item) => (
                <tr
                  key={item._id}
                  className={
                    item.categoryType === "income"
                      ? "income-row"
                      : "expense-row"
                  }
                >
                  <td>{formatDate(item.createdAt)}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.categoryType}</td>
                  <td>{item.type}</td>
                  <td>₹{item.amount}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item, item.categoryType)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item._id, item.categoryType)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {totalPages > 1 && (
          <div
            className="pagination"
            style={{ marginTop: "1rem", display: "flex", gap: "8px" }}
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={{
                  padding: "6px 12px",
                  backgroundColor:
                    currentPage === i + 1 ? "#007bff" : "#f1f1f1",
                  color: currentPage === i + 1 ? "#fff" : "#333",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
