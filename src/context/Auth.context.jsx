import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { verifyToken } from "../services/auth-service";
export const AuthContext = createContext(null)

export function AuthProvider({ children }) {


  const [token, setToken] = useState(localStorage.getItem("token") || sessionStorage.getItem("token"))

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")) || JSON.parse(sessionStorage.getItem("userInfo")) || null);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        setIsLoading(true);
        if (!token) {
          setIsAuthenticated(false);
          setUserInfo(null);
          setIsLoading(false);
          return;
        }

        const response = await verifyToken(token);
        if (response.success) {
          setIsAuthenticated(true);
          setUserInfo(response.data.decoded);
          localStorage.setItem("userInfo", JSON.stringify(response.data.decoded));
        } else {
          setIsAuthenticated(false);
          setToken(null);
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          sessionStorage.removeItem("userInfo");
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [token]);

  function logOut() {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      iconColor: "#d33",
      showCancelButton: true,
      confirmButtonColor: "#d33", // green
      cancelButtonColor: "#ccc",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        setToken(null);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        sessionStorage.removeItem("userInfo");


        Swal.fire({
          title: "Logged out!",
          text: "You have been successfully logged out 👋",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }

  return <AuthContext.Provider value={{ token, setToken, logOut, isAuthenticated, userInfo, isLoading }}>
    {children}
  </AuthContext.Provider>
}