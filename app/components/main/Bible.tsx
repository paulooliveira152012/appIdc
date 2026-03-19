"use client";
import React, { useEffect, useState } from "react";
import { BibleReference } from "@/app/data/bibleTree";

type BibleProps = {
  onClose: () => void;
  title: string;
  reference: BibleReference;
};

type BibleVerse = {
  verse: number;
  text: string;
};

type BibleResponse = {
  reference?: string;
  verses: BibleVerse[];
};

const Bible = ({ onClose, title, reference }: BibleProps) => {
  const [data, setData] = useState<BibleResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBibleText = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://bible-api.com/data/almeida/${reference.bookId}/${reference.chapter}`,
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.error || "Erro ao buscar texto bíblico.");
        }

        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao buscar texto bíblico.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBibleText();
  }, [reference]);

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.topRow}>
          <div>
            <h2 style={styles.title}>{title}</h2>
            <p style={styles.reference}>
              {reference.bookId} {reference.chapter}
            </p>
          </div>

          <button onClick={onClose} style={styles.closeButton}>
            Fechar
          </button>
        </div>

        {loading && <p>Carregando...</p>}
        {error && <p style={styles.error}>{error}</p>}

        {data && (
          <div style={styles.verses}>
            {data.verses.map((verse) => (
              <p key={verse.verse} style={styles.verse}>
                <strong>{verse.verse}</strong> {verse.text}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed" as const,
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  container: {
    width: "100%",
    maxWidth: "900px",
    maxHeight: "90vh",
    overflowY: "auto" as const,
    backgroundColor: "#111",
    color: "white",
    borderRadius: "18px",
    padding: "24px",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "20px",
  },

  title: {
    margin: 0,
  },

  reference: {
    marginTop: "6px",
    opacity: 0.8,
  },

  closeButton: {
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    backgroundColor: "#ef4444",
    color: "white",
    cursor: "pointer",
  },

  verses: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
  },

  verse: {
    lineHeight: 1.7,
    margin: 0,
  },

  error: {
    color: "#fca5a5",
  },
};

export default Bible;