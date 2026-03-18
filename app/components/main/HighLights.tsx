"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import "@/app/style/styles.css";
import { useRouter } from "next/navigation";
import { usePlatform } from "@/app/context/platformContext";

type PlatformUser = {
  userId: string;
  username: string;
  profileImage?: string;
  role?: string;
  points?: number;
  level?: number;
  checkInStreak?: number;
  createdAt?: string;
  lastCheckInAt?: string;
};

type NoteItem = {
  id?: string;
  text?: string;
  content?: string;
  note?: string;
  title?: string;
  createdAt?: string;
  updatedAt?: string;
  authorName?: string;
  createdBy?: {
    userId?: string;
    username?: string;
    profileImage?: string;
  };
};

const Highlights = () => {
  const router = useRouter();

  const { users, highlightedNote } = usePlatform() as {
    users?: PlatformUser[];
    highlightedNote?: NoteItem | null;
  };

  const safeUsers = Array.isArray(users) ? users : [];

  const highestCheckInStreakUsers = useMemo(() => {
    if (!safeUsers.length) return [];

    const maxStreak = Math.max(...safeUsers.map((u) => u.checkInStreak || 0));

    return safeUsers.filter(
      (u) => (u.checkInStreak || 0) === maxStreak && maxStreak > 0,
    );
  }, [safeUsers]);

  const highestPointsUsers = useMemo(() => {
    if (!safeUsers.length) return [];

    const maxPoints = Math.max(...safeUsers.map((u) => u.points || 0));

    return safeUsers.filter(
      (u) => (u.points || 0) === maxPoints && maxPoints > 0,
    );
  }, [safeUsers]);

  const highlightedNoteText =
    highlightedNote?.text ||
    highlightedNote?.content ||
    highlightedNote?.note ||
    "Nenhuma anotação destacada.";

  return (
    <div className="highlightsPage">
      <div className="highlightsHeader">
        <h2 className="highlightsTitle">Destaques</h2>
        <p className="highlightsSubtitle">
          Resumo dos principais destaques da comunidade.
        </p>
      </div>

      <div className="highlightsGrid">
        <div className="highlightCard">
          <h3 className="highlightCardTitle">Maior streak de check-in</h3>

          {highestCheckInStreakUsers.length > 0 ? (
            <div className="highlightUsersList">
              {highestCheckInStreakUsers.map((member) => (
                <div key={member.userId} className="highlightUserRow">
                  <div className="highlightUserInfo">
                    <Image
                      src={member.profileImage || "/default-avatar.png"}
                      alt={member.username}
                      onClick={() =>
                        router.push(`/pages/profile/${member.userId}`)
                      }
                      width={48}
                      height={48}
                      className="highlightAvatar"
                    />
                    <div>
                      <p className="highlightUserName">{member.username}</p>
                      <p className="highlightUserMeta">
                        Streak: {member.checkInStreak || 0}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="highlightEmpty">Nenhum streak encontrado ainda.</p>
          )}
        </div>

        <div className="highlightCard">
          <h3 className="highlightCardTitle">Maior pontuação</h3>

          {highestPointsUsers.length > 0 ? (
            <div className="highlightUsersList">
              {highestPointsUsers.map((member) => (
                <div key={member.userId} className="highlightUserRow">
                  <div className="highlightUserInfo">
                    <Image
                      src={member.profileImage || "/default-avatar.png"}
                      alt={member.username}
                      onClick={() =>
                        router.push(`/pages/profile/${member.userId}`)
                      }
                      width={48}
                      height={48}
                      className="highlightAvatar"
                    />
                    <div>
                      <p className="highlightUserName">{member.username}</p>
                      <p className="highlightUserMeta">
                        Pontos: {member.points || 0}
                      </p>
                      <p className="highlightUserMeta">
                        Level: {member.level || 0}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="highlightEmpty">Nenhum usuário encontrado.</p>
          )}
        </div>

        <div className="highlightCard highlightCardLarge">
          <h3 className="highlightCardTitle">Anotação destacada</h3>

          {highlightedNote ? (
            <div className="latestNoteBox">
              {highlightedNote.createdBy && (
  <div className="highlightedAuthorBox">
    <Image
      src={
        highlightedNote.createdBy.profileImage || "/default-avatar.png"
      }
      alt={highlightedNote.createdBy.username || "Autor da anotação"}
      onClick={() =>
        highlightedNote.createdBy?.userId &&
        router.push(`/pages/profile/${highlightedNote.createdBy.userId}`)
      }
      width={52}
      height={52}
      className="highlightedAuthorAvatar"
    />

    <div className="highlightedAuthorText">
      <p className="highlightedAuthorName">
        {highlightedNote.createdBy.username || "Usuário"}
      </p>
      <p className="highlightedAuthorMeta">Autor da anotação destacada</p>
    </div>
  </div>
)}

              {highlightedNote.title && (
                <p className="latestNoteTitle">{highlightedNote.title}</p>
              )}

              <p className="latestNoteText">{highlightedNoteText}</p>

              <div className="latestNoteMeta">
                {highlightedNote.createdAt && (
                  <span>
                    {new Date(highlightedNote.createdAt).toLocaleDateString(
                      "pt-BR",
                    )}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <p className="highlightEmpty">Ainda não há anotação destacada.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
