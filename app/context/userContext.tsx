"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  userId: string;
  username: string;
  email: string;
  profileImage?: string;
  level?: number;
  points?: number;
  lastCheckInAt?: string;
  checkInStreak?: number;
  role?: string;
  timeZone?: string;
} | null;

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  hydrated: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {

  const [user, setUser] = useState<User>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erro ao ler user do localStorage:", error);
      localStorage.removeItem("user");
    } finally {
      setHydrated(true);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, hydrated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside a UserProvider");
  }

  return context;
};