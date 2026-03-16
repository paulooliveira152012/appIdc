"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "../context/userContext";

type LikeItem = {
  userId: string;
  username?: string;
  profileImage?: string;
};

type CommentUser = {
  userId: string;
  username?: string;
  profileImage?: string;
};

type CommentItem = {
  id: string;
  text: string;
  createdAt?: string;
  user?: CommentUser;
};

type CommentsLikesProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "likes" | "comments";
  likes?: LikeItem[];
  comments?: CommentItem[];
  currentUserId?: string;
  onDeleteComment?: (commentId: string) => void | Promise<void>;
};

const CommentsLikes = ({
  isOpen,
  onClose,
  type,
  likes = [],
  comments = [],
  onDeleteComment,
}: CommentsLikesProps) => {
  const router = useRouter();
  const { user } = useUser();

  if (!isOpen) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDeleteCommentClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    commentId: string,
  ) => {
    e.stopPropagation();

    const confirmed = window.confirm("Deseja apagar este comentário?");
    if (!confirmed) return;

    await onDeleteComment?.(commentId);
  };

  const title = type === "likes" ? "Curtidas" : "Comentários";
  const data = type === "likes" ? likes : comments;

  return (
    <div style={styles.overlay} onClick={handleOutsideClick}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <button onClick={onClose} style={styles.closeButton}>
            ✕
          </button>
        </div>

        {!data.length ? (
          <p style={styles.emptyText}>
            {type === "likes"
              ? "Ninguém curtiu ainda."
              : "Ainda não há comentários."}
          </p>
        ) : (
          <div style={styles.list}>
            {type === "likes" &&
              likes.map((like) => (
                <div
                  key={like.userId}
                  style={styles.item}
                  onClick={() => router.push(`/pages/profile/${like.userId}`)}
                >
                  <Image
                    src={like.profileImage || "/images/defaultProfile.png"}
                    alt="profile"
                    width={44}
                    height={44}
                    style={styles.avatar}
                  />
                  <div style={styles.itemContent}>
                    <p style={styles.username}>{like.username}</p>
                    <span style={styles.subText}>Curtiu esta anotação</span>
                  </div>
                </div>
              ))}

            {type === "comments" &&
              comments.map((comment) => {
                const isCommentOwner =
                  user?.userId && comment.user?.userId === user?.userId;

                console.log("userId:", user?.userId);

                console.log("comment.user?.userId:", comment.user?.userId);

                return (
                  <div key={comment.id} style={styles.itemColumn}>
                    <div
                      style={styles.commentRow}
                      onClick={() =>
                        comment.user?.userId &&
                        router.push(`/pages/profile/${comment.user.userId}`)
                      }
                    >
                      <div style={styles.commentMain}>
                        <Image
                          src={
                            comment.user?.profileImage ||
                            "/images/defaultProfile.png"
                          }
                          alt="profile"
                          width={44}
                          height={44}
                          style={styles.avatar}
                        />
                        <div style={styles.itemContent}>
                          <p style={styles.username}>
                            {comment.user?.username}
                          </p>
                          <p style={styles.commentText}>{comment.text}</p>
                        </div>
                      </div>

                      {isCommentOwner && (
                        <button
                          style={styles.deleteCommentButton}
                          onClick={(e) =>
                            handleDeleteCommentClick(e, comment.id)
                          }
                          aria-label="Apagar comentário"
                          title="Apagar comentário"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsLikes;

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.65)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    zIndex: 1200,
  },

  modal: {
    width: "100%",
    maxWidth: "560px",
    maxHeight: "80vh",
    overflowY: "auto",
    backgroundColor: "#1f2937",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
    padding: "20px",
    color: "white",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  title: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 700,
  },

  closeButton: {
    border: "none",
    backgroundColor: "rgba(255,255,255,0.06)",
    color: "white",
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "18px",
  },

  emptyText: {
    color: "#cbd5e1",
    textAlign: "center",
    padding: "20px 0",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: "14px",
    padding: "12px",
  },

  itemColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  commentRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "12px",
    cursor: "pointer",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: "14px",
    padding: "12px",
  },

  commentMain: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    flex: 1,
    minWidth: 0,
  },

  itemContent: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
    minWidth: 0,
  },

  avatar: {
    borderRadius: "50%",
    height: 50,
    width: 50,
    objectFit: "cover",
  },

  username: {
    margin: 0,
    fontWeight: 700,
    color: "white",
  },

  subText: {
    fontSize: "13px",
    color: "#cbd5e1",
  },

  commentText: {
    margin: 0,
    color: "#e5e7eb",
    whiteSpace: "pre-wrap",
    lineHeight: 1.5,
    wordBreak: "break-word",
  },

  deleteCommentButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "18px",
    lineHeight: 1,
    padding: "6px",
    borderRadius: "8px",
  },
};
