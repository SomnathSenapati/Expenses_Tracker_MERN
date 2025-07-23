import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditTransaction = () => {
  const { id, type } = useParams(); // type: "income" or "expense"
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    type: "", // income/expense type (like Salary, Food, etc.)
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const url =
          type === "income"
            ? `http://localhost:2809/api/income/${id}`
            : `http://localhost:2809/api/expense/${id}`;

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.data;

        setFormData({
          title: data.title || "",
          description: data.description || "",
          amount: data.amount || "",
          type: data.type || "",
        });
      } catch (error) {
        toast.error("Failed to fetch transaction");
      }
    };

    fetchTransaction();
  }, [id, type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:2809/api/transaction/${id}/${type}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(`${type} updated successfully!`);
      navigate("/list");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  // Suggest some example types
  const incomeTypes = [
    "Salary",
    "Business",
    "Investment",
    "Freelance",
    "Other",
  ];
  const expenseTypes = [
    "Food",
    "Rent",
    "Transport",
    "Shopping",
    "Utilities",
    "Other",
  ];

  return (
    <div className="edit-transaction-container">
      <h2 className="text-xl font-semibold mb-4">Edit {type}</h2>
      <form onSubmit={handleSubmit} className="edit-form flex flex-col gap-3">
        <label className="font-medium">Title</label>
        <input
          type="text"
          name="title"
          className="border p-2 rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label className="font-medium">Description</label>
        <textarea
          name="description"
          className="border p-2 rounded"
          value={formData.description}
          onChange={handleChange}
        />

        <label className="font-medium">Amount</label>
        <input
          type="number"
          name="amount"
          className="border p-2 rounded"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <label className="font-medium">Type</label>
        <select
          name="type"
          className="border p-2 rounded"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Type --</option>
          {(type === "income" ? incomeTypes : expenseTypes).map(
            (option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            )
          )}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded mt-4"
        >
          Update {type}
        </button>
      </form>
    </div>
  );
};

export default EditTransaction;
