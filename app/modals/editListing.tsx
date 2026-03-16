"use client";

import React, { useEffect, useState } from "react";
import { useListing } from "../context/listingContext";

type EditListingProps = {
  listingId: string;
  onClose: () => void;
};

const EditListing = ({ listingId, onClose }: EditListingProps) => {
  const { notes, updateExistingNote } = useListing();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("outro");
  const [loading, setLoading] = useState(false);

  const note = notes.find((n) => n.id === listingId);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setTag(note.tag);
    }
  }, [note]);

  const handleSave = async () => {
    if (!note) return;

    try {
      setLoading(true);

      await updateExistingNote({
        noteId: listingId,
        userId: note.createdBy.userId,
        title,
        content,
        tag,
      });

      onClose();
    } catch (err) {
      console.error("Erro ao atualizar anotação:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={styles.modal} onClick={handleOutsideClick}>
      <div style={styles.modalContent}>
        <h2 style={styles.title}>Editar anotação</h2>

        <label style={styles.label}>Tag</label>
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          style={styles.input}
        >
          <option value="culto domingo">Culto Domingo</option>
          <option value="culto de ensino">Culto de Ensino</option>
          <option value="escola dominical">Escola Dominical</option>
          <option value="outro">Outro</option>
        </select>

        <label style={styles.label}>Título</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>Conteúdo</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
        />

        <div style={styles.buttons}>
          <button style={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>

          <button style={styles.saveButton} onClick={handleSave}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    height: "100dvh",
    position: "fixed" as const,
    width: "100%",
    top: 0,
    left: 0,
    backgroundColor: "#000000d5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "auto" as const,
    zIndex: 1000,
  },

  modalContent: {
    height: "auto",
    width: "600px",
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    padding: 30,
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
  },

  title: {
    marginBottom: 10,
  },

  label: {
    fontWeight: 600,
  },

  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  },

  textarea: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    minHeight: 120,
    resize: "vertical" as const,
  },

  buttons: {
    marginTop: 20,
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
  },

  cancelButton: {
    padding: "8px 16px",
    border: "none",
    backgroundColor: "#ccc",
    borderRadius: 6,
    cursor: "pointer",
  },

  saveButton: {
    padding: "8px 16px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default EditListing;