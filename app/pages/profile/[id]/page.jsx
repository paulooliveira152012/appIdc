"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useUser } from "@/app/context/userContext";
import Header from "@/app/components/Header";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { checkin } from "@/app/functions/users";
// import { awardPoints } from "@/app/functions/leader";
import LeaderPointsModal from "@/app/modals/leaderPoints";

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
  const isLeader = user?.role === "leader";

  const [showLeaderPointsModal, setShowLeaderPointsModal] = useState(false);
  const [awardMessage, setAwardMessage] = useState("");

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

        console.log("data no perfil:", data);

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
    if (!user?.userId || checkingIn || hasCheckedInToday) return;

    try {
      setCheckingIn(true);
      setError("");

      const result = await checkin(user.userId);

      if (!result) {
        throw new Error("Não foi possível realizar o check-in.");
      }

      setCheckinResult(result);

      if (result?.user) {
        setVisitedUser(result.user);
      }
    } catch (err) {
      setError(err?.message || "Erro ao realizar check-in.");
    } finally {
      setCheckingIn(false);
    }
  };

  const handleAwardSuccess = (updatedUser, message) => {
    if (updatedUser) {
      setVisitedUser(updatedUser);
    }

    setAwardMessage(message || "Pontos atribuídos com sucesso.");
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

  const hasCheckedInToday = useMemo(() => {
    if (!visitedUser?.lastCheckInAt) return false;

    const lastCheck = new Date(visitedUser.lastCheckInAt);
    const now = new Date();

    return lastCheck.toDateString() === now.toDateString();
  }, [visitedUser?.lastCheckInAt]);

  const checkinButtonText = useMemo(() => {
    if (checkingIn) return "Fazendo check-in...";
    if (hasCheckedInToday) return "Check-in realizado hoje";
    return "Fazer check-in diário";
  }, [checkingIn, hasCheckedInToday]);

  if (!mounted || !user) return null;

  console.log("user no landing:", user);

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
          <div style={styles.profileImageSide}>
            <div style={styles.avatarContainer}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={visitedUser.profileImage || "/images/defaultProfile.png"}
                alt="profile"
                style={styles.avatar}
                onClick={() =>
                  router.push(
                    `/pages/preview/image?src=${encodeURIComponent(
                      visitedUser.profileImage || "/images/defaultProfile.png",
                    )}`,
                  )
                }
              />

              <span style={styles.avatarLevel}>{visitedUser.level ?? 1}</span>
            </div>

            {isOwner && (
              <Link href={`/pages/profile/${user?.userId}/edit`}>
                <p style={styles.editText}>Editar perfil</p>
              </Link>
            )}
          </div>

          {isOwner === false && isLeader && (
            <button
              onClick={() => setShowLeaderPointsModal(true)}
              style={styles.openLeaderModalButton}
            >
              Atribuir pontos
            </button>
          )}
        </div>

        {awardMessage && <p style={styles.success}>{awardMessage}</p>}

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
          <>
            <button
              onClick={handleCheckin}
              disabled={checkingIn || hasCheckedInToday}
              style={{
                ...styles.checkinButton,
                ...(hasCheckedInToday ? styles.checkinButtonDone : {}),
                opacity: checkingIn ? 0.7 : 1,
                cursor:
                  checkingIn || hasCheckedInToday ? "not-allowed" : "pointer",
              }}
            >
              {checkinButtonText}
            </button>

            {hasCheckedInToday && (
              <p style={styles.checkinDoneText}>
                ✅ Seu check-in de hoje já foi contabilizado.
              </p>
            )}
          </>
        )}

        <div style={styles.box}>
          <p style={styles.number}>{visitedUser.attendanceStreak ?? 0}</p>
          <span style={styles.label}>Sequência de presença</span>
        </div>

        {checkinResult && (
          <div style={styles.rewardCard}>
            <p style={styles.rewardTitle}>🎉 {checkinResult.message}</p>

            <div style={styles.rewardGrid}>
              <div style={styles.rewardBox}>
                <span style={styles.rewardNumber}>
                  +{checkinResult.pointsEarned ?? 0}
                </span>
                <span style={styles.rewardLabel}>Pontos ganhos</span>
              </div>

              <div style={styles.rewardBox}>
                <span style={styles.rewardNumber}>
                  {checkinResult.streak ?? currentStreak}
                </span>
                <span style={styles.rewardLabel}>Sequência</span>
              </div>

              <div style={styles.rewardBox}>
                <span style={styles.rewardNumber}>
                  +{checkinResult.basePoints ?? 0}
                </span>
                <span style={styles.rewardLabel}>Base</span>
              </div>

              <div style={styles.rewardBox}>
                <span style={styles.rewardNumber}>
                  +{checkinResult.bonusPoints ?? 0}
                </span>
                <span style={styles.rewardLabel}>Bônus</span>
              </div>
            </div>

            {(checkinResult.bonusPoints ?? 0) > 0 && (
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

      <LeaderPointsModal
        isOpen={showLeaderPointsModal}
        onClose={() => setShowLeaderPointsModal(false)}
        leaderUserId={user?.userId || ""}
        visitedUser={visitedUser}
        onAwardSuccess={handleAwardSuccess}
      />
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
    marginBottom: "10px",
    transition: "all 0.2s ease",
  },

  checkinButtonDone: {
    background: "linear-gradient(90deg, #15803d, #16a34a)",
  },

  checkinDoneText: {
    marginTop: "4px",
    marginBottom: "20px",
    fontSize: "14px",
    color: "#86efac",
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

  openLeaderModalButton: {
    width: "100%",
    border: "none",
    borderRadius: "14px",
    padding: "13px 18px",
    background: "linear-gradient(90deg, #7c3aed, #2563eb)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "18px",
    cursor: "pointer",
  },

  success: {
    color: "#86efac",
    marginBottom: "16px",
    fontSize: "14px",
  },

  profileImageSide: {
  display: "flex",
  flexDirection: "column" ,
  alignItems: "center",
  gap: "8px",
},

avatarContainer: {
  position: "relative" ,
  width: "140px",
  height: "140px",
},

avatarLevel: {
  position: "absolute",
  top: "4px",
  right: "4px",
  minWidth: "32px",
  height: "32px",
  padding: "0 8px",
  backgroundColor: "#000000b3",
  color: "white",
  borderRadius: "999px",
  border: "2px solid #f59e0b",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "14px",
  fontWeight: 700,
  lineHeight: 1,
  zIndex: 2,
},
};
