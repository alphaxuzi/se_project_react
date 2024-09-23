import { Navigate } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ProtectedRoute = ({ children }) => {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;