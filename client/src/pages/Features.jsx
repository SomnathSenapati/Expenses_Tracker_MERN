const featuresData = [
  {
    title: "Real-Time Dashboard",
    description:
      "Monitor your expenses, budgets, and savings progress live from one central dashboard.",
    icon: "📊",
  },
  {
    title: "Automatic Categorization",
    description:
      "Smart categorization of transactions so you can understand your spending better.",
    icon: "🧠",
  },
  {
    title: "Reminders & Notifications",
    description:
      "Get notified before bill due dates or when nearing budget limits.",
    icon: "⏰",
  },
  {
    title: "Dark Mode",
    description:
      "Reduce eye strain with our beautiful and user-friendly dark interface.",
    icon: "🌙",
  },
  {
    title: "Export Reports",
    description:
      "Download your reports in PDF/Excel format to review or share with others.",
    icon: "📁",
  },
  {
    title: "Bank Integration",
    description:
      "Connect your bank accounts securely for seamless transaction syncing.",
    icon: "🏦",
  },
];

const Features = () => {
  return (
    <section className="features-section">
      <h2 className="section-title">Awesome Features</h2>
      <p className="section-subtitle">
        Packed with tools to help you manage your finances better.
      </p>

      <div className="features-grid">
        {featuresData.map((feature, index) => (
          <div className="feature-card" key={index}>
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