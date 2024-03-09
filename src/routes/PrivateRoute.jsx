import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/common/Header";

const PrivateRoute = () => {
  const { auth } = useAuth();

  return (
    <>
      {auth.user ? (
        <>
          <Header />
          <main className="mx-auto max-w-[1024px] py-8">
            <div className="container">
              <Outlet />
            </div>
          </main>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoute;
