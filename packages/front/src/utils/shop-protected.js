import { Navigate } from "react-router-dom";

const ShopProtected = ({ role, token, children }) => {
  if (!token || (role !== "cashier" && role !== "admin")) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
export default ShopProtected;
