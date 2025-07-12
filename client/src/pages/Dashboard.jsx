const Dashboard = () => {
  return (
    <section className="dashboard-section">
      <h2 className="section-title">Dashboard Overview</h2>
      <p className="section-subtitle">
        Welcome back! Here's your financial snapshot.
      </p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Expenses</h3>
          <p>$1,200</p>
        </div>
        <div className="card">
          <h3>Total Income</h3>
          <p>$2,500</p>
        </div>
        <div className="card">
          <h3>Savings</h3>
          <p>$1,300</p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
