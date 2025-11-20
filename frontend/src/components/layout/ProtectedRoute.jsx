import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "../ui/Loaders";

import { useAuthState, useAuthActions } from "../../redux/hooks/authHooks";

const ProtectedRoute = () => {
  // calling auth state
  const { isAuthenticated, loading, user } = useAuthState();

  // calling auth actions
  const { authFetchUser } = useAuthActions();

  const [checking, setChecking] = useState(true);

  useEffect(() => {

    // user already loaded skip restore
    if (user || isAuthenticated) {
      setChecking(false);
      return;
    }
    // try restoring session from cookie
    authFetchUser()
      .finally(() => setChecking(false));
  }, [user, isAuthenticated, authFetchUser]);

  // loader UI
  if (checking || loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // allow access
  return <Outlet />;
};

export default ProtectedRoute;
