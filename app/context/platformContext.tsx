"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
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
  updateUserInUsers: (updatedUser: Partial<PlatformUser> & { userId: string }) => void;
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

  const fetchUsers = useCallback(async () => {
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

      setUsers(Array.isArray(data) ? data : data?.users ?? []);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setUsersError(
        error instanceof Error ? error.message : "Erro ao buscar usuários"
      );
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  const updateUserInUsers = useCallback(
    (updatedUser: Partial<PlatformUser> & { userId: string }) => {
      setUsers((prevUsers) =>
        prevUsers.map((currentUser) =>
          currentUser.userId === updatedUser.userId
            ? { ...currentUser, ...updatedUser }
            : currentUser
        )
      );
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <PlatformContext.Provider
      value={{
        users,
        setUsers,
        fetchUsers,
        updateUserInUsers,
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