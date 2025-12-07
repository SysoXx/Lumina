import React, { createContext, useContext, useEffect, useState } from "react";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  salt: string; // base64
  hash: string; // base64
  role?: "admin" | "user";
};

type AuthContextValue = {
  users: StoredUser[];
  currentUser: StoredUser | null;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const USERS_KEY = "lumina_users_v1";
const CURRENT_KEY = "lumina_current_user_v1";

const PBKDF2_ITER = 120000; // iterations
const SALT_BYTES = 16;
const HASH_BYTES = 32;

function arrayBufferToBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string) {
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function deriveKey(password: string, salt: ArrayBuffer) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const derived = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt, iterations: PBKDF2_ITER, hash: "SHA-256" },
    keyMaterial,
    HASH_BYTES * 8
  );
  return derived; // ArrayBuffer
}

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      const parsed: StoredUser[] = raw ? JSON.parse(raw) : [];
      setUsers(parsed);
      const cur = localStorage.getItem(CURRENT_KEY);
      setCurrentUser(cur ? JSON.parse(cur) : null);

      // If there are no users, create a seeded admin account for development
      if (!parsed || parsed.length === 0) {
        (async () => {
          try {
            const defaultName = "Admin";
            const defaultEmail = "admin@local";
            const defaultPassword = "admin123";
            const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
            const derived = await deriveKey(defaultPassword, salt.buffer);
            const newUser: StoredUser = {
              id: generateId(),
              name: defaultName,
              email: defaultEmail,
              salt: arrayBufferToBase64(salt.buffer),
              hash: arrayBufferToBase64(derived),
              role: "admin",
            };
            setUsers([newUser]);
            setCurrentUser(newUser);
          } catch (e) {
            console.error("Failed to create seeded admin user", e);
          }
        })();
      }
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

  const register = async (name: string, email: string, password: string) => {
    if (!email || !password || !name) return { success: false, message: "Preencha todos os campos" };
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { success: false, message: "E-mail já cadastrado" };
    const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
    const derived = await deriveKey(password, salt.buffer);
    const newUser: StoredUser = { id: generateId(), name, email, salt: arrayBufferToBase64(salt.buffer), hash: arrayBufferToBase64(derived), role: "user" };
    setUsers([newUser, ...users]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const login = async (email: string, password: string) => {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return { success: false, message: "Credenciais inválidas" };
    try {
      const saltBuffer = base64ToArrayBuffer(user.salt);
      const derived = await deriveKey(password, saltBuffer);
      const derivedBase64 = arrayBufferToBase64(derived);
      if (derivedBase64 !== user.hash) return { success: false, message: "Credenciais inválidas" };
      setCurrentUser(user);
      return { success: true };
    } catch (e) {
      return { success: false, message: "Erro ao processar credenciais" };
    }
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
