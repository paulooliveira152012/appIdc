"use client";
import React, { useEffect, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
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

  const [openedOptionsNoteId, setOpenedOptionsNoteId] = useState(null);

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
      setOpenedOptionsNoteId(null);
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
    setOpenedOptionsNoteId(null);
  };

  const handleDeleteComment = async (commentId) => {
    if (!user?.userId) return;
    await deleteCommentById(commentId, user.userId);
  };

  const handleEditListing = (noteId) => {
    setNoteId(noteId);
    setShowEditModal(true);
    setOpenedOptionsNoteId(null);
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

  const toggleOptionsModal = (noteId) => {
    setOpenedOptionsNoteId((prev) => (prev === noteId ? null : noteId));
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
        const canHighlight = user?.role === "leader";
        const canOpenOptions = isOwner || canHighlight;

        const likedByMe = note?.likes?.some(
          (like) => like.userId === user?.userId,
        );

        const isOptionsOpen = openedOptionsNoteId === note.id;

        return (
          <div key={note.id} style={styles.card}>
            <div style={styles.header}>
              <div style={styles.userBlock}>
                <div style={styles.avatarContainer}>
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
                  <span style={styles.avatarLevel}>
                    {note?.createdBy?.level ?? 0}
                  </span>
                </div>

                <div>
                  <p style={styles.username}>{note?.createdBy?.username}</p>
                  <span style={styles.tag}>{note?.tag}</span>
                </div>
              </div>

              {canOpenOptions && (
                <div style={styles.optionsWrapper}>
                  <button
                    style={styles.optionsButton}
                    onClick={() => toggleOptionsModal(note.id)}
                    aria-label="Abrir opções da anotação"
                  >
                    <FiMoreHorizontal size={20} />
                  </button>

                  {isOptionsOpen && (
                    <>
                      <div
                        style={styles.optionsBackdrop}
                        onClick={() => setOpenedOptionsNoteId(null)}
                      />

                      <div style={styles.optionsModal}>
                        {isOwner && (
                          <>
                            <button
                              style={styles.optionsItem}
                              onClick={() => handleEditListing(note.id)}
                            >
                              Editar
                            </button>

                            <button
                              style={{
                                ...styles.optionsItem,
                                ...styles.optionsDeleteItem,
                              }}
                              onClick={() => handleDelete(note.id)}
                            >
                              Deletar
                            </button>
                          </>
                        )}

                        {canHighlight && (
                          <button
                            style={{
                              ...styles.optionsItem,
                              ...(note?.isHighlighted
                                ? styles.optionsHighlightActive
                                : {}),
                            }}
                            onClick={() => handleSetHighlighted(note.id)}
                          >
                            {note?.isHighlighted
                              ? "⭐ Em destaque"
                              : "Colocar em destaque"}
                          </button>
                        )}
                      </div>
                    </>
                  )}
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
    position: "relative",
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

  optionsWrapper: {
    position: "relative",
    zIndex: 5,
  },

  optionsButton: {
    width: "38px",
    height: "38px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.08)",
    backgroundColor: "#111827",
    color: "white",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  optionsBackdrop: {
    position: "fixed",
    inset: 0,
    backgroundColor: "transparent",
    zIndex: 20,
  },

  optionsModal: {
    position: "absolute",
    top: "46px",
    right: 0,
    minWidth: "210px",
    backgroundColor: "#111827",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "14px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    zIndex: 30,
  },

  optionsItem: {
    border: "none",
    borderRadius: "10px",
    padding: "12px 14px",
    backgroundColor: "transparent",
    color: "white",
    textAlign: "left",
    cursor: "pointer",
    fontWeight: 600,
  },

  optionsDeleteItem: {
    color: "#fca5a5",
    backgroundColor: "rgba(127,29,29,0.18)",
  },

  optionsHighlightActive: {
    backgroundColor: "rgba(245,158,11,0.15)",
    color: "#fcd34d",
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

  avatarContainer: {
    position: "relative",
    width: "48px",
    height: "48px",
    flexShrink: 0,
  },

  avatarLevel: {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    minWidth: "18px",
    height: "18px",
    padding: "0 4px",
    backgroundColor: "#000000b3",
    color: "white",
    borderRadius: "999px",
    border: "1px solid #f59e0b",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "11px",
    fontWeight: 700,
    lineHeight: 1,
  },
};