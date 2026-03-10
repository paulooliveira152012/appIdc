"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "../context/userContext";
import { handleLogout } from "../functions/auth";


const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { user, setUser } = useUser();

  console.log("pathname:", pathname)
  const isHome = pathname === "/";
  // const isLoginPage = pathname === "/pages/auth/login";

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

  return (
    <div style={styles.header}>
      <p style={styles.title} onClick={handleTitleClick}>
        {isHome ? (user?.username ?? "Login") : "Voltar"}
      </p>

      {user && <p onClick={logout}>logout</p>}

      {/* {!user && !isLoginPage && (
        <p onClick={() => router.push("pages/auth/login")}>login</p>
      )} */}
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