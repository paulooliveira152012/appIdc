"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/app/context/userContext";
import Header from "@/app/components/Header";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();
  const params = useParams();

  const [mounted, setMounted] = useState(false);
  const [visitedUser, setVisitedUser] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState("");

  const profileId = Array.isArray(params.id) ? params.id[0] : params.id;
  const isOwner = user?.userId === profileId;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push("/");
    }
  }, [mounted, user, router]);

  useEffect(() => {
    const fetchVisitedUser = async () => {
      if (!mounted || !user || !profileId) return;

      try {
        setLoadingProfile(true);
        setError("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${profileId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Erro ao buscar perfil.");
        }

        setVisitedUser(data?.user ?? data);
      } catch (err) {
        setError(err?.message || "Erro ao carregar perfil.");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchVisitedUser();
  }, [mounted, user, profileId]);

  if (!mounted || !user) return null;

  if (loadingProfile) {
    return (
      <div style={styles.screen}>
        <Header />
        <div style={styles.card}>
          <p>Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (error || !visitedUser) {
    return (
      <div style={styles.screen}>
        <Header />
        <div style={styles.card}>
          <p style={styles.error}>{error || "Perfil não encontrado."}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.screen}>
      <Header />

      <div style={styles.card}>
        <div style={styles.profileImageEdit}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={visitedUser.profileImage || "/images/defaultProfile.png"}
            alt="profile"
            style={styles.avatar}
          />

          {isOwner && (
            <Link href={`/pages/profile/${user?.userId}/edit`}>
              <p style={styles.editText}>Editar perfil</p>
            </Link>
          )}
        </div>

        <h1 style={styles.username}>{visitedUser.username}</h1>

        <p style={styles.role}>{isOwner ? "Seu perfil" : "Visitando perfil"}</p>

        <div style={styles.info}>
          <div style={styles.box}>
            <p style={styles.number}>Nível {visitedUser.level ?? 1}</p>
            <span style={styles.label}>Level</span>
          </div>

          <div style={styles.box}>
            <p style={styles.number}>{visitedUser.points ?? 0}</p>
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

  profileImageEdit: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
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

  editText: {
    cursor: "pointer",
    color: "#60a5fa",
    fontWeight: 600,
  },

  error: {
    color: "#f87171",
  },
};