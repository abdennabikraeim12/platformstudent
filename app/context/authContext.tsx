// src/contexts/AuthContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import api, { setAuthToken } from "../api";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data on mount if token exists
  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setAuthToken(token);
        
        // Option 1: Utilisation de /auth/me
        const response = await api.get("/auth/me");
        setUser(response.data);
        
        // Option 2: Décodage du token (si /auth/me n'est pas disponible)
        // const decoded = jwtDecode(token);
        // setUser({
        //   id: decoded.sub,
        //   name: decoded.name || decoded.email,
        //   email: decoded.email,
        //   role: decoded.role
        // });
        
      } catch (error) {
        console.error("Failed to fetch user:", error);
        if (error.response?.status !== 404) {
          localStorage.removeItem("token");
          setAuthToken(null);
          setUser(null);
        }
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      setAuthToken(access_token);
      const userResponse = await api.get("/auth/me");
      setUser(userResponse.data);
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error("Login failed");
      throw error;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    try {
      await api.post("/auth/register", { name, email, password, role });
      toast.success("Registration successful. Please log in.");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
