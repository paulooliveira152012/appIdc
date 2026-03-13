"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useUser } from "@/app/context/userContext";
import Header from "@/app/components/Header";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { checkin } from "@/app/functions/users";

const POINTS_PER_LEVEL = 100;

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();
  const params = useParams();

  const [mounted, setMounted] = useState(false);
  const [visitedUser, setVisitedUser] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [checkinResult, setCheckinResult] = useState(null);
  const [checkingIn, setCheckingIn] = useState(false);
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${profileId}`,
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

  const handleCheckin = async () => {
    if (!user?.userId || checkingIn) return;

    try {
      setCheckingIn(true);
      setError("");

      const result = await checkin(user.userId);

      if (!result) {
        throw new Error("Não foi possível realizar o check-in.");
      }

      if (result?.message && result?.user) {
        setCheckinResult(result);
        setVisitedUser(result.user);
      } else {
        throw new Error(result?.message || "Erro ao realizar check-in.");
      }
    } catch (err) {
      setError(err?.message || "Erro ao realizar check-in.");
    } finally {
      setCheckingIn(false);
    }
  };

  const currentPoints = visitedUser?.points ?? 0;
  const currentLevel = visitedUser?.level ?? 1;
  const currentStreak = visitedUser?.checkInStreak ?? 0;

  const progress = useMemo(() => {
    const pointsInCurrentLevel = currentPoints % POINTS_PER_LEVEL;
    return (pointsInCurrentLevel / POINTS_PER_LEVEL) * 100;
  }, [currentPoints]);

  const pointsToNextLevel = useMemo(() => {
    const remainder = currentPoints % POINTS_PER_LEVEL;
    return remainder === 0 ? POINTS_PER_LEVEL : POINTS_PER_LEVEL - remainder;
  }, [currentPoints]);

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

  if (error && !visitedUser) {
    return (
      <div style={styles.screen}>
        <Header />
        <div style={styles.card}>
          <p style={styles.error}>{error || "Perfil não encontrado."}</p>
        </div>
      </div>
    );
  }

  if (!visitedUser) {
    return (
      <div style={styles.screen}>
        <Header />
        <div style={styles.card}>
          <p style={styles.error}>Perfil não encontrado.</p>
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

        <div style={styles.levelCard}>
          <div style={styles.levelHeader}>
            <span style={styles.levelBadge}>Nível {currentLevel}</span>
            <span style={styles.levelText}>
              Faltam {pointsToNextLevel} pontos para o próximo nível
            </span>
          </div>

          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>

          <p style={styles.progressInfo}>{currentPoints} pontos totais</p>
        </div>

        {isOwner && (
          <button
            onClick={handleCheckin}
            disabled={checkingIn}
            style={{
              ...styles.checkinButton,
              opacity: checkingIn ? 0.7 : 1,
              cursor: checkingIn ? "not-allowed" : "pointer",
            }}
          >
            {checkingIn ? "Fazendo check-in..." : "Fazer check-in diário"}
          </button>
        )}

        {checkinResult && (
          <div style={styles.rewardCard}>
            <p style={styles.rewardTitle}>🎉 {checkinResult.message}</p>

            <div style={styles.rewardGrid}>
              <div style={styles.rewardBox}>
                <span style={styles.rewardNumber}>
                  +{checkinResult.pointsEarned}
                </span>
                <span style={styles.rewardLabel}>Pontos ganhos</span>
              </div>

              <div style={styles.rewardBox}>
                <span style={styles.rewardNumber}>{checkinResult.streak}</span>
                <span style={styles.rewardLabel}>Sequência</span>
              </div>

              <div style={styles.rewardBox}>
                <span style={styles.rewardNumber}>
                  +{checkinResult.basePoints}
                </span>
                <span style={styles.rewardLabel}>Base</span>
              </div>

              <div style={styles.rewardBox}>
                <span style={styles.rewardNumber}>
                  +{checkinResult.bonusPoints}
                </span>
                <span style={styles.rewardLabel}>Bônus</span>
              </div>
            </div>

            {checkinResult.bonusPoints > 0 && (
              <p style={styles.bonusMessage}>
                Você recebeu bônus por manter sua sequência. Continue assim.
              </p>
            )}
          </div>
        )}

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.info}>
          <div style={styles.box}>
            <p style={styles.number}>🔥 {currentStreak}</p>
            <span style={styles.label}>Sequência atual</span>
          </div>

          <div style={styles.box}>
            <p style={styles.number}>{currentPoints}</p>
            <span style={styles.label}>Pontos</span>
          </div>

          <div style={styles.box}>
            <p style={styles.number}>Lv. {currentLevel}</p>
            <span style={styles.label}>Nível</span>
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
    background:
      "linear-gradient(180deg, #0f172a 0%, #111827 45%, #0b1120 100%)",
    color: "white",
    paddingBottom: "40px",
  },

  profileImageEdit: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "12px",
  },

  card: {
    maxWidth: "560px",
    margin: "40px auto",
    padding: "32px",
    background: "rgba(28, 28, 28, 0.92)",
    borderRadius: "20px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },

  avatar: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #3b82f6",
    marginBottom: "10px",
  },

  username: {
    margin: "8px 0 4px 0",
    fontSize: "30px",
    fontWeight: 700,
  },

  role: {
    opacity: 0.7,
    marginBottom: "24px",
    fontSize: "15px",
  },

  levelCard: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "18px",
    marginBottom: "20px",
    textAlign: "left",
  },

  levelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "12px",
  },

  levelBadge: {
    background: "linear-gradient(90deg, #2563eb, #60a5fa)",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: 700,
    fontSize: "14px",
  },

  levelText: {
    fontSize: "14px",
    opacity: 0.85,
  },

  progressBar: {
    width: "100%",
    height: "12px",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: "999px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #22c55e, #3b82f6)",
    transition: "width 0.4s ease",
  },

  progressInfo: {
    marginTop: "10px",
    fontSize: "13px",
    opacity: 0.75,
  },

  checkinButton: {
    width: "100%",
    border: "none",
    borderRadius: "14px",
    padding: "14px 18px",
    background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "20px",
  },

  rewardCard: {
    background:
      "linear-gradient(180deg, rgba(34,197,94,0.14), rgba(59,130,246,0.10))",
    border: "1px solid rgba(74, 222, 128, 0.35)",
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "24px",
  },

  rewardTitle: {
    fontSize: "18px",
    fontWeight: 700,
    marginBottom: "16px",
  },

  rewardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
  },

  rewardBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: "14px",
    padding: "14px 10px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  rewardNumber: {
    fontSize: "24px",
    fontWeight: 800,
    color: "#86efac",
  },

  rewardLabel: {
    fontSize: "13px",
    opacity: 0.8,
  },

  bonusMessage: {
    marginTop: "14px",
    color: "#bbf7d0",
    fontSize: "14px",
    fontWeight: 500,
  },

  info: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap",
    marginTop: "10px",
  },

  box: {
    flex: "1 1 140px",
    minWidth: "140px",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "16px",
    textAlign: "center",
  },

  number: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
  },

  label: {
    fontSize: "14px",
    opacity: 0.65,
  },

  editText: {
    cursor: "pointer",
    color: "#60a5fa",
    fontWeight: 600,
  },

  error: {
    color: "#fca5a5",
    marginTop: "14px",
  },
};
