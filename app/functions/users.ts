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

export const checkin = async (userId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/interaction/checkin`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    }
  );

  const data = await response.json();
  console.log("data:", data);

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao realizar check-in.");
  }

  return data;
};