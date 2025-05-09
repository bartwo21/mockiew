"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Provider = "google" | "github" | null;

interface AuthContextType {
  loadingProvider: Provider;
  setLoadingProvider: (provider: Provider) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loadingProvider, setLoadingProvider] = useState<Provider>(null);

  return (
    <AuthContext.Provider value={{ loadingProvider, setLoadingProvider }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
