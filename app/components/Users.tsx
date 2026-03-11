"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePlatform } from "../context/platformContext";

const UsersCarousel = () => {
  const router = useRouter();
  const { users, loadingUsers, usersError } = usePlatform();

  if (loadingUsers) {
    return <p style={styles.message}>Carregando usuários...</p>;
  }

  if (usersError) {
    return <p style={styles.error}>{usersError}</p>;
  }

  if (!users?.length) {
    return <p style={styles.message}>Nenhum usuário encontrado.</p>;
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.scrollRow}>
        {users.map((user) => (
          <button
            key={user.userId}
            type="button"
            style={styles.userCard}
            onClick={() => router.push(`/pages/profile/${user.userId}`)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.profileImage || "/images/defaultProfile.png"}
              alt={user.username}
              style={styles.avatar}
            />
            <span style={styles.username}>{user.username}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersCarousel;

const styles = {
  wrapper: {
    width: "100%",
    overflow: "hidden",
  },

  scrollRow: {
    display: "flex",
    gap: "14px",
    overflowX: "auto" as const,
    padding: "0 22px",
    scrollBehavior: "smooth" as const,
  },

  userCard: {
    flex: "0 0 auto",
    width: "90px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "8px",
    color: "white",
  },

  avatar: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    objectFit: "cover" as const,
    border: "2px solid #3b82f6",
    backgroundColor: "#222",
  },

  username: {
    fontSize: "13px",
    textAlign: "center" as const,
    maxWidth: "90px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },

  message: {
    color: "white",
    opacity: 0.8,
  },

  error: {
    color: "#ff6b6b",
  },
};