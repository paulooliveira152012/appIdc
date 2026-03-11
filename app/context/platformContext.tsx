"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type PlatformUser = {
  userId: string;
  username: string;
  profileImage: string;
  role: string;
  points: number;
  level: number;
  checkInStreak: number | null;
  lastCheckInAt: string | null;
  createdAt: string;
};

type PlatformContextType = {
  users: PlatformUser[];
  setUsers: React.Dispatch<React.SetStateAction<PlatformUser[]>>;
  fetchUsers: () => Promise<void>;
  loadingUsers: boolean;
  usersError: string | null;
};

const PlatformContext = createContext<PlatformContextType | undefined>(
  undefined
);

export const PlatformProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<PlatformUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      setUsersError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/users`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar usuários");
      }

      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setUsersError(
        error instanceof Error ? error.message : "Erro ao buscar usuários"
      );
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <PlatformContext.Provider
      value={{
        users,
        setUsers,
        fetchUsers,
        loadingUsers,
        usersError,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);

  if (!context) {
    throw new Error("usePlatform must be used within a PlatformProvider");
  }

  return context;
};