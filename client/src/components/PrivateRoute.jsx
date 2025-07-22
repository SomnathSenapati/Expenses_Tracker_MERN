import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{
          message: "Please login to access this page",
          from: location.pathname,
        }}
        replace
      />
    );
  }

  return children;
};

export default PrivateRoute;
