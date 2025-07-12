const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    features: ["Track Expenses", "Set Budgets", "Basic Analytics"],
    button: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    features: [
      "Everything in Basic",
      "Advanced Reports",
      "Email Reminders",
      "Goal Tracking",
    ],
    button: "Upgrade Now",
    popular: true,
  },
  {
    name: "Premium",
    price: "$19.99/mo",
    features: [
      "Everything in Pro",
      "Bank Integration",
      "24/7 Support",
      "Export to Excel/PDF",
    ],
    button: "Go Premium",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section className="pricing-section">
      <h2 className="section-title">Choose Your Plan</h2>
      <p className="section-subtitle">
        Simple, transparent pricing for everyone.
      </p>

      <div className="pricing-grid">
        {pricingPlans.map((plan, index) => (
          <div
            className={`pricing-card ${plan.popular ? "popular" : ""}`}
            key={index}
          >
            {plan.popular && <div className="badge">Most Popular</div>}
            <h3 className="plan-name">{plan.name}</h3>
            <p className="plan-price">{plan.price}</p>
            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i}>✔ {feature}</li>
              ))}
            </ul>
            <button className="btn-primary full-width">{plan.button}</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
