import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { register } from "../services/authService";
import { useState } from "react";

export function useAuth() {
  const { token, loading, error, setError, isLoggedIn, handleLogin, handleLogout } = useAuthContext();
  const navigate = useNavigate();
  const [registerLoading, setRegisterLoading] = useState(false);

  // Login
  async function login(username, password) {
    if (!username || !password) {
      setError("Enter Username and password");
      return;
    }
    const success = await handleLogin(username, password);
    if (success) navigate("/dashboard");
  }

  // Register
  async function registerUser(username, password) {
    if (!username || !password) {
      setError("Enter Username and password");
      return false;
    }
    setRegisterLoading(true);
    setError("");
    try {
      await register(username, password);
      navigate("/login");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setRegisterLoading(false);
    }
  }

  // Logout
  function logout() {
    handleLogout();
    navigate("/get-started");
  }

  return {
    token,
    loading: loading || registerLoading,
    error,
    isLoggedIn,
    login,
    registerUser,
    logout,
  };
}