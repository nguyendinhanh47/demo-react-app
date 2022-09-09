import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  redirectPath = '/signin',
  children,
}) => {
  const isLogin = localStorage.getItem("isLogin")

  if (!isLogin) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export const AuthRoute = ({
  redirectPath = '/',
  children,
}) => {
  const isLogin = localStorage.getItem("isLogin")

  if (isLogin) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};