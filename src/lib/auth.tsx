import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  password: string; // stored in localStorage (NOT secure) — for demo only
};

type AuthContextValue = {
  users: User[];
  currentUser: User | null;
  register: (name: string, email: string, password: string) => { success: boolean; message?: string };
  login: (email: string, password: string) => { success: boolean; message?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USERS_KEY = "lumina_users_v1";
const CURRENT_KEY = "lumina_current_user_v1";

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      const parsed: User[] = raw ? JSON.parse(raw) : [];
      setUsers(parsed);
      const cur = localStorage.getItem(CURRENT_KEY);
      setCurrentUser(cur ? JSON.parse(cur) : null);
    } catch (e) {
      console.error("Failed to load auth from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.error("Failed to save users", e);
    }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) localStorage.setItem(CURRENT_KEY, JSON.stringify(currentUser));
      else localStorage.removeItem(CURRENT_KEY);
    } catch (e) {
      console.error("Failed to save current user", e);
    }
  }, [currentUser]);

  const register = (name: string, email: string, password: string) => {
    if (!email || !password || !name) return { success: false, message: "Preencha todos os campos" };
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { success: false, message: "E-mail já cadastrado" };
    const newUser: User = { id: generateId(), name, email, password };
    setUsers([newUser, ...users]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const login = (email: string, password: string) => {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) return { success: false, message: "Credenciais inválidas" };
    setCurrentUser(user);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ users, currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
