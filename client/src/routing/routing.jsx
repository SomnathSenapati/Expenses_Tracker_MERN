import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Home from "../pages/Home";
import NotFound from "../components/NotFound"
import Login from "../pages/Login";
import Register from "../pages/Register";
import Services from "../pages/Services";
import Features from "../pages/Features";
import Pricing from "../pages/Pricing";
import AboutUs from "../pages/AboutUs";
import Dasdboard from "../pages/Dashboard";
import Contact from "../pages/Contact";

const Routing = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ paddingBottom: "60px" }}>
        {" "}
        {/* to prevent footer overlap */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/dashboard" element={<Dasdboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default Routing;
