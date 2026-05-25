import { createContext, useContext, useState } from "react";
import { login, logout, isLoggedIn } from "../services/authService";

// Create Context 
const AuthContext = createContext(null);

// Provider —  wrap the app
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login
  async function handleLogin(username, password) {
    setLoading(true);
    setError("");
    try {
      const data = await login(username, password);
      setToken(data.token);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Logout
  function handleLogout() {
    logout();
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{
      token,
      loading,
      error,
      setError,
      isLoggedIn: !!token,
      handleLogin,
      handleLogout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook — context 
export function useAuthContext() {
  return useContext(AuthContext);
}