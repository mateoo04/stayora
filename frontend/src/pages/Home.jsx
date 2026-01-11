import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h2>Welcome, {user?.firstName}!</h2>
    </div>
  );
}
