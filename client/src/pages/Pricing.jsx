import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2809/api/pricing/list"
        );

        if (response.data.status && response.data.data.length > 0) {
          const activePlans = response.data.data.filter(
            (plan) => plan.isActive
          );
          setPlans(activePlans);
        } else {
          setError("No pricing plans found.");
        }
      } catch (err) {
        setError("Failed to load pricing plans.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const parseFeatures = (features) => {
    return features
      .flatMap((f) => f.split(","))
      .map((f) => f.trim())
      .filter((f) => f.length > 0);
  };

  const handlePlanClick = (plan) => {
    navigate(`/checkout/${plan._id}`);
  };

  if (loading) return <p>Loading Pricing Plans...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="pricing-section">
      <h2 className="section-title">Choose Your Plan</h2>
      <p className="section-subtitle">
        Simple, transparent pricing for everyone.
      </p>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div
            className={`pricing-card ${plan.popular ? "popular" : ""}`}
            key={plan._id || index}
          >
            {plan.popular && <div className="badge">Most Popular</div>}
            <h3 className="plan-name">{plan.name}</h3>
            <p className="plan-price">{plan.price.trim()}</p>
            <ul className="plan-features">
              {parseFeatures(plan.features).map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button
              className="btn-primary full-width"
              onClick={() => handlePlanClick(plan)}
            >
              {plan.button.trim()}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
