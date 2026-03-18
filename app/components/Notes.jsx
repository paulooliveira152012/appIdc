"use client";
import React, { useEffect, useState } from "react";
import { useListing } from "@/app/context/listingContext";
import { useUser } from "@/app/context/userContext";
import Image from "next/image";
import EditListing from "../modals/editListing";
import CommentsLikes from "../modals/commentsLikes";
import { useRouter } from "next/navigation";
import { setHighlightedNote } from "@/app/functions/leader";
import { usePlatform } from "@/app/context/platformContext";

const Notes = () => {
  const {
    notes,
    loading,
    error,
    fetchNotes,
    toggleLikeNote,
    addCommentToNote,
    deleteNoteById,
    deleteCommentById,
  } = useListing();

  const { user } = useUser();
  const { fetchHighlightedNote } = usePlatform();
  const [commentInputs, setCommentInputs] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [noteId, setNoteId] = useState("");
  const [showInteractionsModal, setShowInteractionsModal] = useState(false);
  const [interactionType, setInteractionType] = useState("likes");
  const [selectedLikes, setSelectedLikes] = useState([]);
  const [selectedComments, setSelectedComments] = useState([]);

  const router = useRouter();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleLike = async (noteId) => {
    if (!user?.userId) return;
    await toggleLikeNote(noteId, user.userId);
  };

  const handleSetHighlighted = async (noteId) => {
    try {
      if (!user?.userId) return;

      await setHighlightedNote({
        leaderUserId: user.userId,
        noteId,
      });

      await fetchNotes();
      await fetchHighlightedNote();
    } catch (error) {
      console.error("Erro ao destacar anotação:", error);
    }
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

  const handleDeleteComment = async (commentId) => {
    if (!user?.userId) return;

    // const confirmed = window.confirm("Deseja deletar este comentário?");
    // if (!confirmed) return;

    await deleteCommentById(commentId, user.userId);
  };

  const handleEditListing = (noteId) => {
    setNoteId(noteId);
    setShowEditModal(true);
  };

  const openLikesModal = (likes) => {
    setInteractionType("likes");
    setSelectedLikes(likes || []);
    setSelectedComments([]);
    setShowInteractionsModal(true);
  };

  const openCommentsModal = (comments) => {
    setInteractionType("comments");
    setSelectedComments(comments || []);
    setSelectedLikes([]);
    setShowInteractionsModal(true);
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

        console.log("highLightedNote:", note);

        return (
          <div key={note.id} style={styles.card}>
            <div style={styles.header}>
              <div style={styles.userBlock}>
                <Image
                  src={
                    note?.createdBy?.profileImage ||
                    "/images/defaultProfile.png"
                  }
                  onClick={() =>
                    router.push(`/pages/profile/${note?.createdBy?.userId}`)
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
                  <button
                    style={styles.editButton}
                    onClick={() => handleEditListing(note.id)}
                  >
                    Editar
                  </button>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(note.id)}
                  >
                    Deletar
                  </button>
                </div>
              )}

              {/* quero remover esse daqui de cima */}
              {user?.role === "leader" && (
                <button
                  style={
                    note?.isHighlighted
                      ? styles.highlightedButtonActive
                      : styles.highlightButton
                  }
                  onClick={() => handleSetHighlighted(note.id)}
                >
                  {note?.isHighlighted ? "⭐ Em destaque" : "Destacar"}
                </button>
              )}
            </div>

            <h3 style={styles.noteTitle}>{note.title}</h3>
            <p style={styles.content}>{note.content}</p>

            <div style={styles.actions}>
              <button
                onClick={() => handleLike(note.id)}
                style={styles.actionButton}
              >
                {likedByMe ? "💙 Curtido" : "🤍 Curtir"}
              </button>

              <div style={styles.countsRow}>
                <button
                  style={styles.countButton}
                  onClick={() => openLikesModal(note.likes)}
                >
                  ❤️ {note.likesCount}
                </button>

                <button
                  style={styles.countButton}
                  onClick={() => openCommentsModal(note.comments)}
                >
                  💬 {note.commentsCount}
                </button>
              </div>
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
          </div>
        );
      })}

      {showEditModal && (
        <EditListing
          listingId={noteId}
          onClose={() => setShowEditModal(false)}
        />
      )}

      <CommentsLikes
        isOpen={showInteractionsModal}
        onClose={() => setShowInteractionsModal(false)}
        type={interactionType}
        likes={selectedLikes}
        comments={selectedComments}
        currentUserId={user?.userId}
        onDeleteComment={async (commentId) => {
          await handleDeleteComment(commentId);

          setSelectedComments((prev) =>
            prev.filter((comment) => comment.id !== commentId),
          );
        }}
      />
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
    cursor: "pointer",
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
    gap: "12px",
    flexWrap: "wrap",
  },

  actionButton: {
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
  },

  countsRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  countButton: {
    border: "none",
    borderRadius: "10px",
    padding: "8px 12px",
    backgroundColor: "rgba(255,255,255,0.06)",
    color: "#e5e7eb",
    cursor: "pointer",
    fontWeight: 600,
  },

  commentBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "4px",
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

  error: {
    color: "#fca5a5",
    marginBottom: "16px",
  },

  highlightButton: {
    border: "none",
    borderRadius: "999px",
    padding: "8px 14px",
    backgroundColor: "#374151",
    color: "white",
    cursor: "pointer",
    fontWeight: 600,
  },

  highlightedButtonActive: {
    border: "none",
    borderRadius: "999px",
    padding: "8px 14px",
    backgroundColor: "#f59e0b", // laranja
    color: "#111827",
    cursor: "pointer",
    fontWeight: 700,
  },
};
