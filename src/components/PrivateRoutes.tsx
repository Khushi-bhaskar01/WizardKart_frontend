import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useUser();

  if (loading) {
    return <div className="p-10 text-center">✨ Checking Login... ✨</div>;
  }

  return user ? children : <Navigate to="/login" />;
}
// const PrivateRoute = ({ children, roles }: { children: JSX.Element, roles?: string[] }) => {
//   const { user } = useUser();
 

//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (roles && !roles.includes(user.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };