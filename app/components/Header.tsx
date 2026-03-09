"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../context/userContext";
import { handleLogout } from "../functions/auth";

const Header = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  console.log("user no Header:", user)

  const logout = () => {
    handleLogout()
    setUser(null)
  }

  return (
    <div style={styles.header}>
      <p style={styles.title} onClick={() => router.push("/pages/auth/login")}>
        {user?.username ? user?.username : "Login"}
      </p>

      {user && (
        <p onClick={logout}>logout</p>
      )}
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
  },
};

export default Header;