import { Navigate } from "react-router-dom";

const Protected = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default Protected;
