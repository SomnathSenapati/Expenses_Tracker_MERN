import { useEffect, useState } from "react";
import axios from "axios";

const Suggestions = ({ userId }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:2809/api/suggestions/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSuggestions(res.data.suggestions);
      } catch (err) {
        console.error("Failed to fetch suggestions:", err);
      }
    };

    fetchSuggestions();
  }, [userId]);

  return (
    <div className="suggestion-box">
      <h3>💡 MoneyMate Suggestions</h3>
      <ul>
        {suggestions.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Suggestions;
