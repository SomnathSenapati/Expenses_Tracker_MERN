import { useEffect, useState } from "react";
import axios from "axios";

const Features = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2809/api/features/list"
        );

        if (response.data.status && response.data.data.length > 0) {
          const activeFeatures = response.data.data.filter((f) => f.isActive);
          setFeatures(activeFeatures);
        } else {
          setError("No features available.");
        }
      } catch (err) {
        setError("Failed to load features.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  if (loading) return <p>Loading features...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="features-section">
      <h2 className="section-title">Awesome Features</h2>
      <p className="section-subtitle">
        Packed with tools to help you manage your finances better.
      </p>

      <div className="features-grid">
        {features.map((feature) => (
          <div className="feature-card" key={feature._id}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
