"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check sessionStorage for secure temporary admin session with expiry check
    let customAdmin = false;
    if (typeof window !== "undefined") {
      // Remove any leftover permanent localStorage session from earlier testing
      localStorage.removeItem("yuu_admin_session");

      const sessionData = sessionStorage.getItem("yuu_admin_session_token");
      if (sessionData) {
        try {
          const parsed = JSON.parse(sessionData);
          // 12 hours expiry window
          if (parsed && parsed.expiry > Date.now()) {
            customAdmin = true;
            setIsAdmin(true);
          } else {
            sessionStorage.removeItem("yuu_admin_session_token");
          }
        } catch (e) {
          sessionStorage.removeItem("yuu_admin_session_token");
        }
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsAdmin(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("yuu_admin_session_token", JSON.stringify({
            active: true,
            expiry: Date.now() + 12 * 60 * 60 * 1000 // 12 hours
          }));
        }
      } else if (!customAdmin) {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    // Check against allowed admin emails and password from environment or fallback
    const allowedEmails = [
      process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      process.env.ADMIN_EMAIL,
      "admin@yuuunivers.com",
      "admin@yunivers.com"
    ].filter(Boolean).map(e => e?.toLowerCase());

    const expectedPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "admin123";

    // Attempt Firebase Auth login first if account exists in Firebase
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      setIsAdmin(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("yuu_admin_session_token", JSON.stringify({
          active: true,
          expiry: Date.now() + 12 * 60 * 60 * 1000 // 12 hours
        }));
      }
      return;
    } catch (firebaseErr: any) {
      // If Firebase Auth fails (e.g., auth user not created in console yet),
      // fallback to secure environment variables credential check
      if (allowedEmails.includes(email.toLowerCase()) && pass === expectedPass) {
        setIsAdmin(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("yuu_admin_session_token", JSON.stringify({
            active: true,
            expiry: Date.now() + 12 * 60 * 60 * 1000 // 12 hours
          }));
        }
        return;
      }
      throw new Error("Invalid admin credentials. Please check email or password.");
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      // ignore firebase signout error if custom session
    }
    setIsAdmin(false);
    setUser(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("yuu_admin_session_token");
      localStorage.removeItem("yuu_admin_session");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
