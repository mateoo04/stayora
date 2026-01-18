import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function ProtectedAdminRoute() {
  const { isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/log-in" replace />
  }

  if (isAdmin() === false) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
