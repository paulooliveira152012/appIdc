"use client";
import React, { useState } from "react";
import { useUser } from "@/app/context/userContext";
import { useListing } from "@/app/context/listingContext";

const tags = ["culto domingo", "culto de ensino", "escola dominical", "célula", "outro"];

const NewNote = () => {
  const { user } = useUser();
  const { createNewNote, error, clearListingError } = useListing();

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("outro");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePublish = async () => {
    if (!user?.userId) return;

    try {
      setLoading(true);
      setMessage("");
      clearListingError();

      await createNewNote({
        userId: user.userId,
        title,
        content: note,
        tag,
      });

      setTitle("");
      setNote("");
      setTag("outro");
      setMessage("Anotação publicada com sucesso.");
    } catch {
      // erro já tratado no contexto
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Compartilhar anotação</h1>
        <p style={styles.subtitle}>
          Escreva aqui suas anotações do culto para compartilhar com os jovens.
        </p>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Tag</label>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            style={styles.select}
          >
            {tags.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label style={styles.label}>Título</label>
          <input
            type="text"
            placeholder="Ex: Palavra sobre fé"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Sua anotação</label>
          <textarea
            placeholder="Escreva sua anotação aqui..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={styles.textarea}
          />

          <button onClick={handlePublish} style={styles.button} disabled={loading}>
            {loading ? "Publicando..." : "Publicar anotação"}
          </button>

          {message && <p style={styles.success}>{message}</p>}
          {error && <p style={styles.error}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "calc(100vh - 140px)",
    backgroundColor: "#111827",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
  },

  card: {
    width: "100%",
    maxWidth: "700px",
    backgroundColor: "#1f2937",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },

  title: {
    color: "white",
    fontSize: "28px",
    marginBottom: "8px",
  },

  subtitle: {
    color: "#cbd5e1",
    marginBottom: "24px",
  },

  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  label: {
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
  },

  select: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #374151",
    backgroundColor: "#111827",
    color: "white",
    fontSize: "15px",
    outline: "none",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #374151",
    backgroundColor: "#111827",
    color: "white",
    fontSize: "15px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    minHeight: "220px",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #374151",
    backgroundColor: "#111827",
    color: "white",
    fontSize: "15px",
    outline: "none",
    resize: "vertical",
  },

  button: {
    marginTop: "8px",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
    color: "white",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
  },

  success: {
    marginTop: "14px",
    color: "#86efac",
  },

  error: {
    marginTop: "14px",
    color: "#fca5a5",
  },
};

export default NewNote;