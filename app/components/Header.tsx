"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "../context/userContext";
import { handleLogout } from "../functions/auth";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { user, setUser } = useUser();

  const isHome = pathname === "/";

  const handleTitleClick = () => {
    if (!isHome) {
      router.back();
      return;
    }

    if (!user) {
      router.push("/pages/auth/login");
      return;
    }

    router.push(`/pages/profile/${user.userId}`);
  };

  const logout = () => {
    handleLogout();
    setUser(null);
    router.push("/");
  };

  console.log("user no header:", user)

  return (
    <div style={styles.header}>
      <div style={styles.title} onClick={handleTitleClick}>
        {isHome ? (
          user ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.profileImage || "/images/defaultProfile.png"}
                alt="profile"
                style={styles.avatar}
              />
            </>
          ) : (
            "Login"
          )
        ) : (
          "Voltar"
        )}
      </div>

      {user && <p onClick={logout}>logout</p>}
    </div>
  );
};

const styles = {
  header: {
    width: "100%",
    height: "60px",
    backgroundColor: "#111",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 50px",
    color: "white",
    fontSize: "20px",
    fontWeight: "600",
  },

  title: {
    margin: 0,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },

  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "cover" as const,
    border: "2px solid #3b82f6",
  },
};

export default Header;