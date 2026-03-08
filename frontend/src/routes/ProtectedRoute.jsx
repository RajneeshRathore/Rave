import { Navigate } from "react-router-dom";
import { useDmStore } from "../store/useDmStore";

const ProtectedRoute = ({ children }) => {

  const currentUser = useDmStore((state) => state.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;