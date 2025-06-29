import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Alert } from "@mui/material";
import { removeUserLoginData } from "./utils/storage";

const PrivateRoute = ({ children }) => {
  const { isLogged, loggedUser } = useAuth();

  if (!isLogged) {
    return <Navigate to="/" replace />; // Redirect to login
  }

  if (loggedUser && loggedUser.role !== "admin") {
    return <Navigate to="/unutho" replace />;
  }

  return children; // If logged, show the page
};

export default PrivateRoute;
