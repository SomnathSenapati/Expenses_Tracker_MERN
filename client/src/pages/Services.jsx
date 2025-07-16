import { useEffect, useState } from "react";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2809/api/service/list"
        );

        if (response.data.status && response.data.data.length > 0) {
          const activeServices = response.data.data.filter(
            (service) => service.isActive
          );
          setServices(activeServices);
        } else {
          setError("No services available.");
        }
      } catch (err) {
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="services-section">
      <h2 className="section-title">Our Services</h2>
      <p className="section-subtitle">
        Everything you need to manage your money better.
      </p>

      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service._id}>
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
