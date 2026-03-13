"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useCallback } from "react";

type NoteUser = {
  userId: string;
  username?: string;
  profileImage?: string;
};

type NoteComment = {
  id: string;
  text: string;
  createdAt?: string;
  user: NoteUser;
};

type NoteLike = {
  userId: string;
};

type NoteItem = {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy: NoteUser;
  likesCount: number;
  commentsCount: number;
  likes: NoteLike[];
  comments: NoteComment[];
};

type CreateNotePayload = {
  userId: string;
  title: string;
  content: string;
  tag: string;
};

type AddCommentPayload = {
  noteId: string;
  userId: string;
  text: string;
};

type UpdateNotePayload = {
  noteId: string;
  userId: string;
  title: string;
  content: string;
  tag: string;
};

type ListingContextType = {
  notes: NoteItem[];
  loading: boolean;
  error: string;
  fetchNotes: () => Promise<void>;
  createNewNote: (payload: CreateNotePayload) => Promise<void>;
  toggleLikeNote: (noteId: string, userId: string) => Promise<void>;
  addCommentToNote: (payload: AddCommentPayload) => Promise<void>;
  deleteNoteById: (noteId: string, userId: string) => Promise<void>;
  updateExistingNote: (payload: UpdateNotePayload) => Promise<void>;
  clearListingError: () => void;
};

const ListingContext = createContext<ListingContextType | undefined>(undefined);

export const ListingProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const clearListingError = () => setError("");

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notes`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Erro ao buscar anotações.");
      }

      setNotes(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao buscar anotações.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewNote = async (payload: CreateNotePayload) => {
    try {
      setError("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Erro ao criar anotação.");
      }

      if (data?.note) {
        setNotes((prev) => [data.note, ...prev]);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        throw err;
      }

      setError("Erro ao criar anotação.");
      throw new Error("Erro ao criar anotação.");
    }
  };

  const toggleLikeNote = async (noteId: string, userId: string) => {
    try {
      setError("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notes/${noteId}/likes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Erro ao curtir anotação.");
      }

      await fetchNotes();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao curtir anotação.");
      }
    }
  };

  const addCommentToNote = async ({
    noteId,
    userId,
    text,
  }: AddCommentPayload) => {
    try {
      setError("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notes/${noteId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, text }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Erro ao comentar.");
      }

      await fetchNotes();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao comentar.");
      }
    }
  };

  const deleteNoteById = async (noteId: string, userId: string) => {
    try {
      setError("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notes/${noteId}?userId=${userId}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Erro ao deletar anotação.");
      }

      setNotes((prev) => prev.filter((note) => note.id !== noteId));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao deletar anotação.");
      }
    }
  };

  const updateExistingNote = async ({
    noteId,
    userId,
    title,
    content,
    tag,
  }: UpdateNotePayload) => {
    try {
      setError("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notes/${noteId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, title, content, tag }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Erro ao editar anotação.");
      }

      await fetchNotes();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro ao editar anotação.");
      }
    }
  };

  return (
    <ListingContext.Provider
      value={{
        notes,
        loading,
        error,
        fetchNotes,
        createNewNote,
        toggleLikeNote,
        addCommentToNote,
        deleteNoteById,
        updateExistingNote,
        clearListingError,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};

export const useListing = () => {
  const context = useContext(ListingContext);

  if (!context) {
    throw new Error("useListing must be used inside a ListingProvider");
  }

  return context;
};
