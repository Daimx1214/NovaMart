import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute
 * AUTHENTICATION check: is anyone logged in?
 * AUTHORIZATION checks:
 *   - adminOnly: only an admin may see this page (e.g. /admin)
 *   - blockAdmin: an admin is NOT allowed here (e.g. cart/checkout —
 *     the store owner should not be "shopping" on their own store)
 */
function ProtectedRoute({ children, adminOnly = false, blockAdmin = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-slate-400">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />;
  if (blockAdmin && isAdmin) return <Navigate to="/admin" replace />;

  return children;
}

export default ProtectedRoute;
