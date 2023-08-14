import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SpinnerFullPage from "../components/SpinnerFullPage";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <SpinnerFullPage />;

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  return children;
}

export default ProtectedRoute;
