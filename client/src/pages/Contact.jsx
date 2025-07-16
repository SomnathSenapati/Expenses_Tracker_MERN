import { useState, useEffect } from "react";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await fetch("http://localhost:2809/api/contact/list");
        const json = await res.json();
        if (json.status && json.data.length > 0) {
          setContactInfo(json.data[0]);
        }
      } catch (err) {
        console.error("Error fetching contact info:", err);
      }
    };

    fetchContactInfo();
  }, []);


  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:2809/api/contact/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");

      const result = await res.json();
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
      setStatus("Failed to send message.");
    }
  };

  return (
    <section className="contact-wrapper">
      <h2 className="section-title">Contact Us</h2>
      <p className="section-subtitle">We’d love to hear from you.</p>

      {contactInfo && (
        <div className="contact-info">
          <p>
            <strong>Email:</strong> {contactInfo.email}
          </p>
          <p>
            <strong>Phone:</strong> {contactInfo.phone}
          </p>
          <p>
            <strong>Address:</strong> {contactInfo.address}
          </p>
        </div>
      )}

      {status && <p className="form-status">{status}</p>}

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
        />
        <button type="submit" className="btn-primary full-width">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;


// import { useState } from "react";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitted:", formData);
//     // can integrate with backend or email service here
//     setFormData({ name: "", email: "", message: "" });
//   };

//   return (
//     <section className="contact-section">
//       <h2 className="section-title">Contact Us</h2>
//       <p className="section-subtitle">We’d love to hear from you.</p>

//       <form className="contact-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           required
//           placeholder="Your Name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           name="email"
//           required
//           placeholder="Your Email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <textarea
//           name="message"
//           required
//           placeholder="Your Message"
//           rows="5"
//           value={formData.message}
//           onChange={handleChange}
//         ></textarea>
//         <button type="submit" className="btn-primary full-width">
//           Send Message
//         </button>
//       </form>
//     </section>
//   );
// };

// export default Contact;
