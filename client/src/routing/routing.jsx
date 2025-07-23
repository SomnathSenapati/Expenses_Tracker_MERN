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
import Contact from "../pages/Contact";
import Profile from "../pages/Profile";
import AddIncome from "../pages/AddIncome";
import AddExpense from "../pages/AddExpense";
import CheckoutPage from "../pages/CheckOutPage";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import List from "../pages/List";
import ServiceDetails from "../pages/ServiceDetails";
import Suggestions from "../pages/Suggestions";
import EditTransaction from "../pages/EditTransaction";

const Routing = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ paddingBottom: "60px" }}>
        {" "}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/list" element={<List />} />
          <Route path="/suggestion/" element={<Suggestions />} />

          {/* protect route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-income"
            element={
              <PrivateRoute>
                <AddIncome />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-expense"
            element={
              <PrivateRoute>
                <AddExpense />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout/:planId"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/service/:id"
            element={
              <PrivateRoute>
                <ServiceDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id/:type"
            element={
              <PrivateRoute>
                <EditTransaction />
              </PrivateRoute>
            }
          />

          {/* all else route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default Routing;
