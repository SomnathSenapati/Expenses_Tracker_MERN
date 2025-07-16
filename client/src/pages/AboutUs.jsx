import { useEffect, useState } from "react";
import axios from "axios";

const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2809/api/about/list"
        );

        // Check if data exists and has at least one item
        if (response.data.status && response.data.data.length > 0) {
          setAboutData(response.data.data[0]); // First item
        } else {
          setError("No About Us data found.");
        }
      } catch (err) {
        setError("Failed to load About Us content.");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUs();
  }, []);

  if (loading) return <p>Loading About Us...</p>;
  if (error) return <p>{error}</p>;
  if (!aboutData) return null;

  return (
    <section className="about-section">
      <h2 className="section-title">About Us</h2>
      <p className="section-subtitle">{aboutData.title}</p>

      <div className="about-content">
        {aboutData.content[0]
          .split("\r\n\r\n")
          .map((para, index) => (
            <p key={index}>{para}</p>
          ))}
      </div>
    </section>
  );
};

export default AboutUs;
