import React, { createContext, useContext, useEffect, useState } from "react";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  role?: "admin" | "user";
};

type AuthContextValue = {
  currentUser: StoredUser | null;
  token: string | null;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const CURRENT_KEY = "lumina_current_user_v1";
const TOKEN_KEY = "lumina_token_v1";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem(CURRENT_KEY);
      const rawToken = localStorage.getItem(TOKEN_KEY);
      if (rawUser) setCurrentUser(JSON.parse(rawUser));
      if (rawToken) setToken(rawToken);
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      if (currentUser) localStorage.setItem(CURRENT_KEY, JSON.stringify(currentUser));
      else localStorage.removeItem(CURRENT_KEY);
    } catch (e) {
      // ignore
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      if (token) localStorage.setItem(TOKEN_KEY, token);
      else localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      // ignore
    }
  }, [token]);

  const register = async (name: string, email: string, password: string) => {
    if (!name || !email || !password) return { success: false, message: "Preencha todos os campos" };
    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        return { success: false, message: body.message || "Falha ao registrar" };
      }
      const body = await res.json();
      setCurrentUser(body.user);
      setToken(body.token);
      return { success: true };
    } catch (e) {
      return { success: false, message: "Erro de rede" };
    }
  };

  const login = async (email: string, password: string) => {
    if (!email || !password) return { success: false, message: "Preencha todos os campos" };
    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        return { success: false, message: body.message || "Falha no login" };
      }
      const body = await res.json();
      setCurrentUser(body.user);
      setToken(body.token);
      return { success: true };
    } catch (e) {
      return { success: false, message: "Erro de rede" };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
