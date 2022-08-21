import { Navigate } from "react-router-dom";

const Protected = ({ role, token, children }) => {
  if (!token || role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;
