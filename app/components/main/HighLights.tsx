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
};

const Highlights = () => {
  const router = useRouter();

  const platform = usePlatform() as {
    users?: PlatformUser[];
    notes?: NoteItem[];
  };

  const users = Array.isArray(platform?.users) ? platform.users : [];
  const notes = Array.isArray(platform?.notes) ? platform.notes : [];

  const latestNote = useMemo(() => {
    if (!notes.length) return null;

    return [...notes].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.updatedAt || 0).getTime();
      const dateB = new Date(b.createdAt || b.updatedAt || 0).getTime();
      return dateB - dateA;
    })[0];
  }, [notes]);

  const highestCheckInStreakUsers = useMemo(() => {
    if (!users.length) return [];

    const maxStreak = Math.max(...users.map((u) => u.checkInStreak || 0));
    return users.filter(
      (u) => (u.checkInStreak || 0) === maxStreak && maxStreak > 0,
    );
  }, [users]);

  const highestPointsUsers = useMemo(() => {
    if (!users.length) return [];

    const maxPoints = Math.max(...users.map((u) => u.points || 0));

    return users.filter((u) => (u.points || 0) === maxPoints && maxPoints > 0);
  }, [users]);

  const noteText =
    latestNote?.text ||
    latestNote?.content ||
    latestNote?.note ||
    "Nenhuma anotação encontrada.";

  return (
    <div className="highlightsPage">
      <div className="highlightsHeader">
        <h2 className="highlightsTitle">Destaques</h2>
        <p className="highlightsSubtitle">
          Resumo dos principais destaques da comunidade.
        </p>
      </div>

      <div className="highlightsGrid">
        <div className="highlightCard highlightCardLarge">
          <h3 className="highlightCardTitle">Última anotação</h3>
          {latestNote ? (
            <div className="latestNoteBox">
              {latestNote.title && (
                <p className="latestNoteTitle">{latestNote.title}</p>
              )}

              <p className="latestNoteText">{noteText}</p>

              <div className="latestNoteMeta">
                {latestNote.authorName && (
                  <span>Por: {latestNote.authorName}</span>
                )}
                {latestNote.createdAt && (
                  <span>
                    {new Date(latestNote.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <p className="highlightEmpty">
              Ainda não há anotações registradas.
            </p>
          )}
        </div>

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
      </div>
    </div>
  );
};

export default Highlights;
