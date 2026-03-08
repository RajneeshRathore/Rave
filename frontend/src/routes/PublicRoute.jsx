import { Navigate } from "react-router-dom";
import { useDmStore } from "../store/useDmStore";

const PublicRoute = ({ children }) => {

  const currentUser = useDmStore((state) => state.currentUser);

  if (currentUser) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;