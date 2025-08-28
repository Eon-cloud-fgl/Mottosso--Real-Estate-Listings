import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function PrivateRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axios
      .get("/api/controller/dashboard_session.php", { withCredentials: true })
      .then(() => setIsAuth(true))
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setIsAuth(false);
        } else {
          console.error("Error validando sesión:", err);
          setIsAuth(false);
        }
      });
  }, []);

  if (isAuth === null) return <p>Cargando...</p>;
  return isAuth ? children : <Navigate to="/admin/login" />;
}