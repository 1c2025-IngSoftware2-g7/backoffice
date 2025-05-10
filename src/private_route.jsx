import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  // const { isLogged } = useAuth();

  // if (!isLogged) {
  //   return <Navigate to="/" replace />; // Redirect to login
  // }

  return children; // If logged, show the page
};

export default PrivateRoute;