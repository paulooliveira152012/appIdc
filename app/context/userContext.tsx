"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  userId: string;
  username: string;
  email: string;
    profileImage?: string;
  level?: number;
  points?: number;
} | null;

type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

const getInitialUser = (): User => {
  if (typeof window === "undefined") return null;

  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Erro ao ler user do localStorage:", error);
    localStorage.removeItem("user");
    return null;
  }
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(getInitialUser);
  console.log("user do userContext:", user)
  return (
    <UserContext.Provider value={{ user, setUser }}>
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