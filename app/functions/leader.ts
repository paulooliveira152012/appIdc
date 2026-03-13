export const awardPoints = async ({
  leaderUserId,
  targetUserId,
  points,
  reason,
}: {
  leaderUserId: string;
  targetUserId: string;
  points: number;
  reason: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/interaction/award-points`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leaderUserId,
        targetUserId,
        points,
        reason,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao atribuir pontos.");
  }

  return data;
};