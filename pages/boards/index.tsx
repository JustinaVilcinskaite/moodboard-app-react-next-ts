import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const BoardsPage = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div>
        <h1>{user?.name}'s Boards</h1>
        <p>This page is only for logged-in users.</p>
      </div>
    </ProtectedRoute>
  );
};

export default BoardsPage;