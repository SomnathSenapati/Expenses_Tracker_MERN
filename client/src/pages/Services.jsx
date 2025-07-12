const servicesData = [
  {
    title: "Expense Tracking",
    description:
      "Easily log your daily expenses and categorize them for better visibility.",
    icon: "💸",
  },
  {
    title: "Smart Budgeting",
    description:
      "Set monthly budgets and get alerts when you're nearing your limits.",
    icon: "📊",
  },
  {
    title: "Financial Reports",
    description:
      "Visualize your spending trends with interactive charts and graphs.",
    icon: "📈",
  },
  {
    title: "Secure Backup",
    description:
      "All your data is securely backed up in the cloud and protected by encryption.",
    icon: "🔐",
  },
  {
    title: "Multi-Device Sync",
    description: "Access your data from mobile, tablet, or desktop seamlessly.",
    icon: "🔄",
  },
  {
    title: "Goal Tracking",
    description: "Set savings goals and track your progress automatically.",
    icon: "🎯",
  },
];

const Services = () => {
  return (
    <section className="services-section">
      <h2 className="section-title">Our Services</h2>
      <p className="section-subtitle">
        Everything you need to manage your money better.
      </p>

      <div className="services-grid">
        {servicesData.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
