export const createNote = async ({
  userId,
  title,
  content,
  tag,
}: {
  userId: string;
  title: string;
  content: string;
  tag: string;
}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, title, content, tag }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao criar anotação.");
  }

  return data;
};

export const getAllNotes = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao buscar anotações.");
  }

  return data;
};

export const toggleLikeNote = async (noteId: string, userId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${noteId}/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao curtir anotação.");
  }

  return data;
};

export const addCommentToNote = async ({
  noteId,
  userId,
  text,
}: {
  noteId: string;
  userId: string;
  text: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notes/${noteId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, text }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao comentar.");
  }

  return data;
};

export const updateNote = async ({
  noteId,
  userId,
  title,
  content,
  tag,
}: {
  noteId: string;
  userId: string;
  title: string;
  content: string;
  tag: string;
}) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, title, content, tag }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao editar anotação.");
  }

  return data;
};

export const deleteNote = async (noteId: string, userId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notes/${noteId}?userId=${userId}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao deletar anotação.");
  }

  return data;
};

