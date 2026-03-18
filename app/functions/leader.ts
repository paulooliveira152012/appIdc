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
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao atribuir pontos.");
  }

  return data;
};

export const fetchDataBasedOnDateChange = async ({
  selectedDate,
  userId,
  option,
  service,
}: {
  selectedDate: string;
  userId: string;
  option: string;
  service?: string;
}) => {
  const params = new URLSearchParams({
    userId,
    date: selectedDate,
    option,
  });

  if (service) {
    params.append("service", service);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/adm/dataBasedOnDateChange?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao buscar dados.");
  }

  return data;
};

export const registerAttendance = async ({
  service,
  leaderUserId,
  userId,
  timeZone,
  date,
  present,
}: {
  service: string;
  leaderUserId: string;
  userId: string;
  timeZone: string;
  date: string;
  present: boolean;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/adm/attendance`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service,
        leaderUserId,
        userId,
        timeZone,
        date,
        present,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao registrar presença.");
  }

  return data;
};

export const getAttendanceByDateAndService = async ({
  leaderUserId,
  service,
  date,
}: {
  leaderUserId: string;
  service: string;
  date: string;
}) => {
  const params = new URLSearchParams({
    leaderUserId,
    service,
    date,
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/adm/attendance/by-date-and-service?${params.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao buscar chamada.");
  }

  return data;
};

export const getAttendanceHistory = async ({
  leaderUserId,
  targetUserId,
  periodType,
  year,
  month,
  quarter,
  semester,
}: {
  leaderUserId: string;
  targetUserId: string;
  periodType: "month" | "quarter" | "semester" | "year";
  year: number;
  month?: number;
  quarter?: number;
  semester?: number;
}) => {
  const params = new URLSearchParams({
    leaderUserId,
    targetUserId,
    periodType,
    year: String(year),
  });

  if (month) params.append("month", String(month));
  if (quarter) params.append("quarter", String(quarter));
  if (semester) params.append("semester", String(semester));

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/adm/attendance/history?${params.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao buscar histórico de presença.");
  }

  return data;
};

export const getAttendanceHistorySummary = async ({
  leaderUserId,
  periodType,
  year,
  month,
  quarter,
  semester,
}: {
  leaderUserId: string;
  periodType: "month" | "quarter" | "semester" | "year";
  year: number;
  month?: number;
  quarter?: number;
  semester?: number;
}) => {
  const params = new URLSearchParams({
    leaderUserId,
    periodType,
    year: String(year),
  });

  if (month) params.append("month", String(month));
  if (quarter) params.append("quarter", String(quarter));
  if (semester) params.append("semester", String(semester));

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/adm/attendance/history/summary?${params.toString()}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao buscar resumo do histórico.");
  }

  return data;
};


export const setHighlightedNote = async ({
  leaderUserId,
  noteId,
}: {
  leaderUserId: string;
  noteId: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/notes/highlight`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leaderUserId,
        noteId,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao destacar anotação.");
  }

  return data;
};