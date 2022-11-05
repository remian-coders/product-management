import { Navigate } from "react-router-dom";

const AccessoryProtected = ({ role, token, children }) => {
  if (!token || (role !== "accessory" && role !== "admin")) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default AccessoryProtected;
