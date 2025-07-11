import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Home from "../pages/Home";
import NotFound from "../components/NotFound"

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default Routing;
