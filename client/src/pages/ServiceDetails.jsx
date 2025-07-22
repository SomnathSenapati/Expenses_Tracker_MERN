import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `http://localhost:2809/api/service/${id}`
        );

        if (response.data.status) {
          setService(response.data.data);
        } else {
          setError("Service not found.");
        }
      } catch (err) {
        setError("Failed to load service.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) return <p>Loading service...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="service-details">
      <h2>{service.title}</h2>
      <div className="service-icon">{service.icon}</div>
      <p>{service.description}</p>
    </div>
  );
};

export default ServiceDetails;
