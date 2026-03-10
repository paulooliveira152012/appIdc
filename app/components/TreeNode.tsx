"use client";

import { useEffect, useState } from "react";
import { BibleNode } from "../data/bibleTree";

type Props = {
  node: BibleNode;
};

const styles = {
  wrapper: {
    marginLeft: 20,
    marginTop: 8,
  },

  row: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap" as const,
  },

  nodeButton: {
    padding: "10px 14px",
    margin: "5px 0",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#585454",
    color: "#fff",
    textAlign: "left" as const,
    maxWidth: "100%",
    wordBreak: "break-word" as const,
  },

  infoButton: {
    backgroundColor: "#9c979745",
    height: 30,
    width: 30,
    minWidth: 30,
    borderRadius: "50%",
    border: "1px solid #ccc",
    cursor: "pointer",
    color: "#fff",
    fontWeight: 700,
  },

  modalOverlay: {
    position: "fixed" as const,
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "16px",
  },

  modalContent: {
    width: "100%",
    maxWidth: "520px",
    maxHeight: "85vh",
    overflowY: "auto" as const,
    backgroundColor: "#444444",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    color: "#fff",
    boxSizing: "border-box" as const,
  },

  modalTitle: {
    marginTop: 0,
    marginBottom: "16px",
    fontSize: "1.4rem",
    lineHeight: 1.2,
    wordBreak: "break-word" as const,
  },

  section: {
    marginBottom: "14px",
  },

  sectionTitle: {
    display: "block",
    marginBottom: "6px",
  },

  paragraph: {
    margin: 0,
    lineHeight: 1.5,
    wordBreak: "break-word" as const,
  },

  closeRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "18px",
    position: "sticky" as const,
    bottom: 0,
    backgroundColor: "#444444",
    paddingTop: "8px",
  },

  closeButton: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#111",
    color: "#fff",
  },
};

export default function TreeNode({ node }: Props) {
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const hasInfo = !!node.info;

  useEffect(() => {
    if (!infoOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setInfoOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [infoOpen]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.row}>
        <button onClick={() => setOpen(!open)} style={styles.nodeButton}>
          {node.label}
        </button>

        {hasInfo && (
          <button
            type="button"
            style={styles.infoButton}
            onClick={() => setInfoOpen(true)}
            aria-label={`Abrir informações sobre ${node.label}`}
          >
            i
          </button>
        )}
      </div>

      {open &&
        node.children?.map((child) => <TreeNode key={child.id} node={child} />)}

      {infoOpen && node.info && (
        <div style={styles.modalOverlay} onClick={() => setInfoOpen(false)}>
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${node.id}`}
          >
            <h2 id={`modal-title-${node.id}`} style={styles.modalTitle}>
              {node.label}
            </h2>

            <div style={styles.section}>
              <strong style={styles.sectionTitle}>Autor:</strong>
              <p style={styles.paragraph}>{node.info.author}</p>
            </div>

            <div style={styles.section}>
              <strong style={styles.sectionTitle}>Contexto:</strong>
              <p style={styles.paragraph}>{node.info.context}</p>
            </div>

            <div style={styles.section}>
              <strong style={styles.sectionTitle}>Propósito:</strong>
              <p style={styles.paragraph}>{node.info.purpose}</p>
            </div>

            <div style={styles.section}>
              <strong style={styles.sectionTitle}>
                Época dos acontecimentos:
              </strong>
              <p style={styles.paragraph}>{node.info.period}</p>
            </div>

            <div style={styles.section}>
              <strong style={styles.sectionTitle}>Época da escrita:</strong>
              <p style={styles.paragraph}>{node.info.writtenAt}</p>
            </div>

            <div style={styles.closeRow}>
              <button
                type="button"
                style={styles.closeButton}
                onClick={() => setInfoOpen(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}