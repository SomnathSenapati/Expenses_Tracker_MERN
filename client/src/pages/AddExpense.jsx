import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Food");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage)?._id : null;

    if (!user) {
      alert("User not found. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:2809/api/expense/create",
        {
          user,
          title,
          description,
          type,
          amount: parseFloat(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Income added:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding income:", error);
      alert("Failed to add income");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Expense</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="e.g. Grocery Shopping"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Optional note"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="₹"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
          />
        </div>

        <button type="submit" className="btn-primary full-width">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;