import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log(planId)

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2809/api/pricing/${planId}`
        );

        if (response.data.status && response.data.data) {
          setPlan(response.data.data);
        } else {
          setError("Plan not found.");
        }
      } catch (err) {
        setError("Failed to load plan details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlanDetails();
  }, [planId]);

  const parseFeatures = (features) => {
    return features
      .flatMap((f) => f.split(","))
      .map((f) => f.trim())
      .filter((f) => f.length > 0);
  };

  if (loading) return <p>Loading plan details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-card">
        <h3>{plan.name}</h3>
        <p className="price">{plan.price}</p>
        <ul>
          {parseFeatures(plan.features).map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
        <button
          className="btn-primary"
          onClick={() => alert("Proceeding to payment...")}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
