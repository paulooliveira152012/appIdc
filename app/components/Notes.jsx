"use client";
import React, { useEffect, useState } from "react";
import { useListing } from "@/app/context/listingContext";
import { useUser } from "@/app/context/userContext";
import Image from "next/image";

const Notes = () => {
  const {
    notes,
    loading,
    error,
    fetchNotes,
    toggleLikeNote,
    addCommentToNote,
    deleteNoteById,
  } = useListing();

  const { user } = useUser();
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleLike = async (noteId) => {
    if (!user?.userId) return;
    await toggleLikeNote(noteId, user.userId);
  };

  const handleComment = async (noteId) => {
    if (!user?.userId) return;

    const text = commentInputs[noteId];
    if (!text?.trim()) return;

    await addCommentToNote({
      noteId,
      userId: user.userId,
      text,
    });

    setCommentInputs((prev) => ({
      ...prev,
      [noteId]: "",
    }));
  };

  const handleDelete = async (noteId) => {
    if (!user?.userId) return;

    const confirmed = window.confirm("Deseja deletar esta anotação?");
    if (!confirmed) return;

    await deleteNoteById(noteId, user.userId);
  };

  if (loading) {
    return <div style={styles.stateText}>Carregando anotações...</div>;
  }

  return (
    <div style={styles.feed}>
      {error && <p style={styles.error}>{error}</p>}

      {!notes.length && !loading && (
        <p style={styles.stateText}>Nenhuma anotação publicada ainda.</p>
      )}

      {notes.map((note) => {
        const isOwner = user?.userId === note?.createdBy?.userId;
        const likedByMe = note?.likes?.some(
          (like) => like.userId === user?.userId,
        );

        return (
          <div key={note.id} style={styles.card}>
            <div style={styles.header}>
              <div style={styles.userBlock}>
                <Image
                  src={
                    note?.createdBy?.profileImage ||
                    "/images/defaultProfile.png"
                  }
                  alt="profile"
                  width={48}
                  height={48}
                  style={styles.avatar}
                />

                <div>
                  <p style={styles.username}>{note?.createdBy?.username}</p>
                  <span style={styles.tag}>{note?.tag}</span>
                </div>
              </div>

              {isOwner && (
                <div style={styles.ownerActions}>
                  <button style={styles.editButton}>Editar</button>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(note.id)}
                  >
                    Deletar
                  </button>
                </div>
              )}
            </div>

            <h3 style={styles.noteTitle}>{note.title}</h3>
            <p style={styles.content}>{note.content}</p>

            <div style={styles.actions}>
              <button
                onClick={() => handleLike(note.id)}
                style={styles.actionButton}
              >
                {likedByMe ? "💙 Curtido" : "🤍 Curtir"} ({note.likesCount})
              </button>

              <span style={styles.commentsCount}>
                💬 {note.commentsCount} comentários
              </span>
            </div>

            <div style={styles.commentBox}>
              <input
                value={commentInputs[note.id] || ""}
                onChange={(e) =>
                  setCommentInputs((prev) => ({
                    ...prev,
                    [note.id]: e.target.value,
                  }))
                }
                placeholder="Escreva um comentário..."
                style={styles.commentInput}
              />

              <button
                onClick={() => handleComment(note.id)}
                style={styles.commentButton}
              >
                Comentar
              </button>
            </div>

            <div style={styles.commentsList}>
              {note.comments?.map((comment) => (
                <div key={comment.id} style={styles.commentCard}>
                  <Image
                    src={
                      comment?.user?.profileImage ||
                      "/images/defaultProfile.png"
                    }
                    alt="profile"
                    width={36}
                    height={36}
                    style={styles.commentAvatar}
                  />

                  <div>
                    <strong style={styles.commentUsername}>
                      {comment?.user?.username}
                    </strong>
                    <p style={styles.commentText}>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Notes;

const styles = {
  feed: {
    width: "100%",
    maxWidth: "820px",
    margin: "0 auto",
    padding: "20px",
  },

  stateText: {
    color: "white",
    textAlign: "center",
    padding: "30px",
  },

  card: {
    background: "#1f2937",
    borderRadius: "18px",
    padding: "18px",
    marginBottom: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "center",
    marginBottom: "12px",
  },

  userBlock: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },

  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    objectFit: "cover",
  },

  username: {
    margin: 0,
    color: "white",
    fontWeight: "700",
  },

  tag: {
    color: "#93c5fd",
    fontSize: "13px",
    textTransform: "capitalize",
  },

  ownerActions: {
    display: "flex",
    gap: "8px",
  },

  editButton: {
    border: "none",
    borderRadius: "10px",
    padding: "8px 12px",
    backgroundColor: "#374151",
    color: "white",
    cursor: "pointer",
  },

  deleteButton: {
    border: "none",
    borderRadius: "10px",
    padding: "8px 12px",
    backgroundColor: "#7f1d1d",
    color: "white",
    cursor: "pointer",
  },

  noteTitle: {
    color: "white",
    marginBottom: "8px",
  },

  content: {
    color: "#e5e7eb",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "14px",
    marginBottom: "14px",
  },

  actionButton: {
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
  },

  commentsCount: {
    color: "#cbd5e1",
    fontSize: "14px",
  },

  commentBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "14px",
  },

  commentInput: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #374151",
    backgroundColor: "#111827",
    color: "white",
  },

  commentButton: {
    border: "none",
    borderRadius: "12px",
    padding: "12px 16px",
    backgroundColor: "#16a34a",
    color: "white",
    cursor: "pointer",
  },

  commentsList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  commentCard: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: "12px",
    padding: "10px",
  },

  commentAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "cover",
  },

  commentUsername: {
    color: "white",
  },

  commentText: {
    color: "#d1d5db",
    margin: "4px 0 0 0",
  },

  error: {
    color: "#fca5a5",
    marginBottom: "16px",
  },
};
