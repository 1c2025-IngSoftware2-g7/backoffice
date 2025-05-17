import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isLogged, loggedUser } = useAuth();

  if (!isLogged) {
    return <Navigate to="/" replace />; // Redirect to login
  }

  if (loggedUser && loggedUser.role !== "admin") {
    alert('You are not authorized to access this page');
    return <Navigate to="/" replace />;
  }

  if (loggedUser && loggedUser.status !== "active") {
    alert('You no longer have access to this page. Contact your administrator.');
    return <Navigate to="/" replace />;
  }

  return children; // If logged, show the page
};

export default PrivateRoute;