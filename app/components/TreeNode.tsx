"use client";

import { useState } from "react";
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
  },

  nodeButton: {
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#585454",
  },

  infoButton: {
    backgroundColor: "#9c979745",
    height: 30,
    width: 30,
    borderRadius: "50%",
    border: "1px solid #ccc",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed" as const,
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "20px",
  },

  modalContent: {
    width: "100%",
    maxWidth: "520px",
    backgroundColor: "#444444",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },

  modalTitle: {
    marginTop: 0,
    marginBottom: "16px",
  },

  section: {
    marginBottom: "14px",
  },

  closeButton: {
    marginTop: "12px",
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

  return (
    <div style={styles.wrapper}>
      <div style={styles.row}>
        <button onClick={() => setOpen(!open)} style={styles.nodeButton}>
          {node.label}
        </button>

        {hasInfo && (
          <button style={styles.infoButton} onClick={() => setInfoOpen(true)}>
            i
          </button>
        )}
      </div>

      {open &&
        node.children?.map((child) => <TreeNode key={child.id} node={child} />)}

      {infoOpen && node.info && (
        <div style={styles.modalOverlay} onClick={() => setInfoOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>{node.label}</h2>

            <div style={styles.section}>
              <strong>Autor:</strong>
              <p>{node.info.author}</p>
            </div>

            <div style={styles.section}>
              <strong>Contexto:</strong>
              <p>{node.info.context}</p>
            </div>

            <div style={styles.section}>
              <strong>Propósito:</strong>
              <p>{node.info.purpose}</p>
            </div>

            <div style={styles.section}>
              <strong>Época:</strong>
              <p>{node.info.period}</p>
            </div>

            <div style={styles.section}>
              <strong>Época dos acontecimentos:</strong>
              <p>{node.info.period}</p>
            </div>

            <div style={styles.section}>
              <strong>Época da escrita:</strong>
              <p>{node.info.writtenAt}</p>
            </div>

            <button
              style={styles.closeButton}
              onClick={() => setInfoOpen(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
