import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import PageTemplate from "@/components/PageTemplate/PageTemplate";


const BoardsPage = () => {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
       <PageTemplate>
      <div>
        <h1>{user?.name}'s Boards</h1>
        <p>This page is only for logged-in users.</p>
      </div>
         </PageTemplate>
    </ProtectedRoute>
  );
};

export default BoardsPage;

