import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  saveSession,
  getSession,
  clearSession,
} from "../api/db";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (session) setCurrentUser(session);
    setLoading(false);
  }, []);

  async function login(credentials, maybePassword) {
    let email, password;
    if (typeof credentials === "object" && credentials !== null) {
      email = credentials.email;
      password = credentials.password;
    } else {
      email = credentials;
      password = maybePassword;
    }

    const user = await loginUser({ email, password });
    saveSession(user);
    setCurrentUser(user);
    return user;
  }

  async function register(data, maybeEmail, maybePassword) {
    let name, email, password;
    if (typeof data === "object" && data !== null) {
      name = data.name;
      email = data.email;
      password = data.password;
    } else {
      name = data;
      email = maybeEmail;
      password = maybePassword;
    }

    const user = await registerUser({ name, email, password });
    saveSession(user);
    setCurrentUser(user);
    return user;
  }

  function logout() {
    clearSession();
    setCurrentUser(null);
  }

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === "admin",
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
