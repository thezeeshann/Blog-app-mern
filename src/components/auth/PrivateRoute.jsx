import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  if (token !== null) {
    return children;
  } else {
    return <Navigate t0="/login" />;
  }
};

export default PrivateRoute;
