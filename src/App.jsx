import "./App.css";
import Header from "./components/header/Header";
import {
  checkRefreshTokenInCookies,
  logout,
  refreshAccessToken,
} from "./utils/authService";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { UserProvider } from "./contexts/userContext.jsx";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (!checkRefreshTokenInCookies()) {
        console.log("No refresh token found, logging out");
        logout();
        navigate("/login");
        return;
      }
      try {
        await refreshAccessToken();
        console.log("Access Token Refreshed on App Load");
      } catch (error) {
        console.error("Failed to refresh token on app load", error);
      }
    };

    checkAndRefreshToken();
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!checkRefreshTokenInCookies()) {
        console.log("No refresh token found, logging out");
        logout();
        navigate("/login");
        clearInterval(interval);
        return;
      }
      try {
        await refreshAccessToken();
        console.log("Access Token Refreshed");
      } catch (error) {
        console.error("Failed to refresh token", error);
      }
    }, 14 * 60 * 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <UserProvider>
      <Header />
      <Outlet />
    </UserProvider>
  );
}
