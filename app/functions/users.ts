export const fetchUsers = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/users`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erro ao buscar usuários");
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};