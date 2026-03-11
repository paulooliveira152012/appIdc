"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/app/context/userContext";
import Header from "@/app/components/Header";
import { useRouter, useParams } from "next/navigation";

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();
  const params = useParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const profileId = Array.isArray(params.id) ? params.id[0] : params.id;
  const isOwner = user?.userId === profileId;

  useEffect(() => {
    if (mounted && !user) {
      router.push("/");
    }
  }, [mounted, user, router]);

  if (!mounted || !user) return null;

  return (
    <div style={styles.screen}>
      <Header />

      <div style={styles.card}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user.profileImage || "/images/defaultProfile.png"}
          alt="profile"
          style={styles.avatar}
        />

        <h1 style={styles.username}>{user.username}</h1>

        <p style={styles.role}>
          {isOwner ? "Seu perfil" : "Visitando perfil"}
        </p>

        <div style={styles.info}>
          <div style={styles.box}>
            <p style={styles.number}>Nível {user.level ?? 1}</p>
            <span style={styles.label}>Level</span>
          </div>

          <div style={styles.box}>
            <p style={styles.number}>{user.points ?? 0}</p>
            <span style={styles.label}>Pontos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

const styles = {
  screen: {
    minHeight: "100vh",
    backgroundColor: "#111",
    color: "white",
  },

  card: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "40px",
    backgroundColor: "#1c1c1c",
    borderRadius: "12px",
    textAlign: "center",
  },

  avatar: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #3b82f6",
    marginBottom: "20px",
  },

  username: {
    margin: 0,
    fontSize: "28px",
  },

  role: {
    opacity: 0.7,
    marginBottom: "30px",
  },

  info: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
  },

  box: {
    textAlign: "center",
  },

  number: {
    fontSize: "22px",
    fontWeight: "bold",
    margin: 0,
  },

  label: {
    fontSize: "14px",
    opacity: 0.6,
  },
};