"use client";

import React, { useState } from "react";
import { awardPoints } from "@/app/functions/leader";

type LeaderVisitedUser = {
  userId: string;
  username?: string;
  points?: number;
  level?: number;
};

type AwardSuccessUser = {
  userId: string;
  username?: string;
  email?: string;
  profileImage?: string;
  role?: string;
  points?: number;
  level?: number;
  checkInStreak?: number;
  lastCheckInAt?: string;
  createdAt?: string;
};

type LeaderPointsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  leaderUserId: string;
  visitedUser: LeaderVisitedUser | null;
  onAwardSuccess?: (
    updatedUser: AwardSuccessUser | undefined,
    message: string
  ) => void;
};

const suggestedPoints = [5, 10, 25, 50];

const LeaderPointsModal = ({
  isOpen,
  onClose,
  leaderUserId,
  visitedUser,
  onAwardSuccess,
}: LeaderPointsModalProps) => {
  const [customPoints, setCustomPoints] = useState("");
  const [awardReason, setAwardReason] = useState("");
  const [awardingPoints, setAwardingPoints] = useState(false);
  const [localError, setLocalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!isOpen || !visitedUser) return null;

  const handleAwardPoints = async () => {
    if (!leaderUserId || !visitedUser?.userId) return;

    const pointsValue = Number(customPoints);

    if (!pointsValue || pointsValue <= 0) {
      setLocalError("Informe uma quantidade de pontos válida.");
      return;
    }

    try {
      setAwardingPoints(true);
      setLocalError("");
      setSuccessMessage("");

      const result = await awardPoints({
        leaderUserId,
        targetUserId: visitedUser.userId,
        points: pointsValue,
        reason: awardReason,
      });

      setSuccessMessage(result?.message || "Pontos atribuídos com sucesso.");
      setCustomPoints("");
      setAwardReason("");

      if (onAwardSuccess) {
        onAwardSuccess(
          result?.targetUser,
          result?.message || "Pontos atribuídos com sucesso."
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLocalError(err.message);
      } else {
        setLocalError("Erro ao atribuir pontos.");
      }
    } finally {
      setAwardingPoints(false);
    }
  };

  const handleClose = () => {
    setCustomPoints("");
    setAwardReason("");
    setLocalError("");
    setSuccessMessage("");
    onClose();
  };

  return (
    <div style={styles.overlay} onClick={handleClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Atribuir pontos</h2>
            <p style={styles.subtitle}>
              Premie <strong>{visitedUser.username || "este usuário"}</strong>{" "}
              por participação, atividade ou engajamento.
            </p>
          </div>

          <button onClick={handleClose} style={styles.closeButton}>
            ✕
          </button>
        </div>

        <div style={styles.userSummary}>
          <div style={styles.summaryBox}>
            <span style={styles.summaryLabel}>Usuário</span>
            <strong style={styles.summaryValue}>
              {visitedUser.username || "-"}
            </strong>
          </div>

          <div style={styles.summaryBox}>
            <span style={styles.summaryLabel}>Pontos atuais</span>
            <strong style={styles.summaryValue}>
              {visitedUser.points ?? 0}
            </strong>
          </div>

          <div style={styles.summaryBox}>
            <span style={styles.summaryLabel}>Nível atual</span>
            <strong style={styles.summaryValue}>
              Lv. {visitedUser.level ?? 1}
            </strong>
          </div>
        </div>

        <p style={styles.sectionLabel}>Sugestões rápidas</p>

        <div style={styles.quickPointsRow}>
          {suggestedPoints.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setCustomPoints(String(value))}
              disabled={awardingPoints}
              style={{
                ...styles.quickPointButton,
                ...(customPoints === String(value)
                  ? styles.quickPointButtonActive
                  : {}),
              }}
            >
              +{value}
            </button>
          ))}
        </div>

        <p style={styles.sectionLabel}>Ou escolha outro valor</p>

        <input
          type="number"
          placeholder="Outro valor"
          value={customPoints}
          onChange={(e) => setCustomPoints(e.target.value)}
          style={styles.input}
          min="1"
        />

        <textarea
          placeholder="Motivo da pontuação"
          value={awardReason}
          onChange={(e) => setAwardReason(e.target.value)}
          style={styles.textarea}
        />

        <button
          onClick={handleAwardPoints}
          disabled={awardingPoints || !customPoints || Number(customPoints) <= 0}
          style={{
            ...styles.confirmButton,
            opacity:
              awardingPoints || !customPoints || Number(customPoints) <= 0
                ? 0.6
                : 1,
            cursor:
              awardingPoints || !customPoints || Number(customPoints) <= 0
                ? "not-allowed"
                : "pointer",
          }}
        >
          {awardingPoints ? "Atribuindo..." : "Confirmar pontos"}
        </button>

        {successMessage && <p style={styles.success}>{successMessage}</p>}
        {localError && <p style={styles.error}>{localError}</p>}
      </div>
    </div>
  );
};

export default LeaderPointsModal;

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    zIndex: 9999,
  },

  modal: {
    width: "100%",
    maxWidth: "560px",
    background: "#121826",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "22px",
    padding: "24px",
    boxShadow: "0 25px 80px rgba(0,0,0,0.45)",
    color: "#fff",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "20px",
  },

  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 800,
  },

  subtitle: {
    margin: "8px 0 0 0",
    fontSize: "14px",
    opacity: 0.8,
    lineHeight: 1.5,
  },

  closeButton: {
    border: "none",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    borderRadius: "10px",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: 700,
  },

  userSummary: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginBottom: "20px",
  },

  summaryBox: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  summaryLabel: {
    fontSize: "12px",
    opacity: 0.7,
  },

  summaryValue: {
    fontSize: "18px",
    fontWeight: 700,
  },

  sectionLabel: {
    margin: "12px 0 10px 0",
    fontSize: "14px",
    fontWeight: 700,
    opacity: 0.9,
  },

  quickPointsRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "16px",
  },

  quickPointButton: {
    border: "none",
    borderRadius: "12px",
    padding: "10px 16px",
    background: "linear-gradient(90deg, #7c3aed, #2563eb)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "15px",
  },

  quickPointButtonActive: {
    boxShadow: "0 0 0 2px rgba(255,255,255,0.18) inset",
    transform: "translateY(-1px)",
  },

  input: {
    width: "100%",
    marginBottom: "12px",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "#fff",
    outline: "none",
    fontSize: "15px",
  },

  textarea: {
    width: "100%",
    minHeight: "110px",
    marginBottom: "14px",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "#fff",
    outline: "none",
    resize: "vertical",
    fontSize: "15px",
    fontFamily: "inherit",
  },

  confirmButton: {
    width: "100%",
    border: "none",
    borderRadius: "14px",
    padding: "13px 16px",
    background: "linear-gradient(90deg, #16a34a, #15803d)",
    color: "#fff",
    fontWeight: 800,
    fontSize: "15px",
  },

  success: {
    marginTop: "14px",
    color: "#86efac",
    fontSize: "14px",
  },

  error: {
    marginTop: "14px",
    color: "#fca5a5",
    fontSize: "14px",
  },
};