// src/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuthHook.jsx";

// Used in <Routes> to guard sections of the app.
// If user is not authenticated -> redirect to /login.
const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Loader while checking localStorage on initial load.
    return (
      <div className="centered">
        <div className="spinner" />
        <p>Loading session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated -> render child routes.
  return <Outlet />;
};

export default ProtectedRoute;
