"use client";
import React, { useEffect, useMemo, useState } from "react";
import "@/app/style/styles.css";
import { usePlatform } from "../context/platformContext";
import {
  getAttendanceByDateAndService,
  getAttendanceHistory,
  getAttendanceHistorySummary,
  registerAttendance,
} from "../functions/leader";
import { useUser } from "../context/userContext";
import Image from "next/image";

type ManagingModalProps = {
  option: string;
  onClose: () => void;
};

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

type AttendanceHistoryItem = {
  id: string;
  userId: string;
  service: string;
  present: boolean;
  localAttendanceDate: string;
  createdAt: string;
  markedByLeaderId: string;
};

type AttendanceHistorySummaryItem = {
  userId: string;
  username: string;
  profileImage?: string;
  role?: string;
  total: number;
  presents: number;
  absents: number;
  attendanceRate: number;
};

type AttendanceSummary = {
  total: number;
  presents: number;
  absents: number;
  attendanceRate: number;
};

const ManagingModal = ({ option, onClose }: ManagingModalProps) => {
  const { users } = usePlatform() as { users: PlatformUser[] };
  const { user } = useUser();

  const [selectedService, setSelectedService] = useState("Culto");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const [attendanceStatus, setAttendanceStatus] = useState<
    Record<string, "present" | "absent">
  >({});

  const [attendanceHistorySummary, setAttendanceHistorySummary] = useState<
    AttendanceHistorySummaryItem[]
  >([]);

  const [selectedHistoryUserId, setSelectedHistoryUserId] =
    useState<string>("");
  const [historyPeriodType, setHistoryPeriodType] = useState<
    "month" | "quarter" | "semester" | "year"
  >("month");
  const [historyYear, setHistoryYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [historyMonth, setHistoryMonth] = useState<number>(
    new Date().getMonth() + 1,
  );
  const [historyQuarter, setHistoryQuarter] = useState<number>(1);
  const [historySemester, setHistorySemester] = useState<number>(1);

  const [attendanceHistory, setAttendanceHistory] = useState<
    AttendanceHistoryItem[]
  >([]);

  const [historySummary, setHistorySummary] = useState<AttendanceSummary>({
    total: 0,
    presents: 0,
    absents: 0,
    attendanceRate: 0,
  });

  const availableUsers = useMemo(() => {
    return Array.isArray(users) ? users : [];
  }, [users]);

  useEffect(() => {
    setFeedback("");
    setLoadingUserId(null);

    if (option !== "Chamada") {
      setAttendanceStatus({});
    }

    if (option !== "Histórico de presença") {
      setAttendanceHistory([]);
      setHistorySummary({
        total: 0,
        presents: 0,
        absents: 0,
        attendanceRate: 0,
      });
    }
  }, [option]);

  useEffect(() => {
    const loadAttendance = async () => {
      if (option !== "Chamada") return;
      if (!selectedDate || !selectedService || !user?.userId) return;

      try {
        const data = await getAttendanceByDateAndService({
          leaderUserId: user.userId,
          date: selectedDate,
          service: selectedService,
        });

        const mappedStatus: Record<string, "present" | "absent"> = {};

        for (const attendance of data.attendances || []) {
          mappedStatus[attendance.userId] = attendance.present
            ? "present"
            : "absent";
        }

        setAttendanceStatus(mappedStatus);
      } catch (error) {
        console.error(error);
        setAttendanceStatus({});
      }
    };

    loadAttendance();
  }, [option, selectedDate, selectedService, user?.userId]);

  useEffect(() => {
    const loadHistory = async () => {
      if (option !== "Histórico de presença") return;
      if (!user?.userId || !selectedHistoryUserId) return;

      try {
        const data = await getAttendanceHistory({
          leaderUserId: user.userId,
          targetUserId: selectedHistoryUserId,
          periodType: historyPeriodType,
          year: historyYear,
          month: historyPeriodType === "month" ? historyMonth : undefined,
          quarter: historyPeriodType === "quarter" ? historyQuarter : undefined,
          semester:
            historyPeriodType === "semester" ? historySemester : undefined,
        });

        setAttendanceHistory(data.attendances || []);
        setHistorySummary(
          data.summary || {
            total: 0,
            presents: 0,
            absents: 0,
            attendanceRate: 0,
          },
        );
      } catch (error) {
        console.error(error);
        setAttendanceHistory([]);
        setHistorySummary({
          total: 0,
          presents: 0,
          absents: 0,
          attendanceRate: 0,
        });
      }
    };

    loadHistory();
  }, [
    option,
    user?.userId,
    selectedHistoryUserId,
    historyPeriodType,
    historyYear,
    historyMonth,
    historyQuarter,
    historySemester,
  ]);
  useEffect(() => {
    const loadHistorySummary = async () => {
      if (option !== "Histórico de presença") return;
      if (!user?.userId) return;

      try {
        const data = await getAttendanceHistorySummary({
          leaderUserId: user.userId,
          periodType: historyPeriodType,
          year: historyYear,
          month: historyPeriodType === "month" ? historyMonth : undefined,
          quarter: historyPeriodType === "quarter" ? historyQuarter : undefined,
          semester:
            historyPeriodType === "semester" ? historySemester : undefined,
        });

        setAttendanceHistorySummary(data.summary || []);
      } catch (error) {
        console.error(error);
        setAttendanceHistorySummary([]);
      }
    };

    loadHistorySummary();
  }, [
    option,
    user?.userId,
    historyPeriodType,
    historyYear,
    historyMonth,
    historyQuarter,
    historySemester,
  ]);

  const handleAttendance = async (targetUserId: string, present: boolean) => {
    try {
      if (!user?.userId) {
        setFeedback("Usuário líder não identificado.");
        return;
      }

      setFeedback("");
      setLoadingUserId(targetUserId);

      await registerAttendance({
        userId: targetUserId,
        service: selectedService,
        leaderUserId: user.userId,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        date: selectedDate,
        present,
      });

      setAttendanceStatus((prev) => ({
        ...prev,
        [targetUserId]: present ? "present" : "absent",
      }));

      setFeedback(
        present
          ? "Presença registrada com sucesso."
          : "Falta registrada com sucesso.",
      );
    } catch (error: unknown) {
      console.error(error);

      let errorMessage = "Não foi possível registrar a chamada.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setFeedback(errorMessage);
    } finally {
      setLoadingUserId(null);
    }
  };

  return (
    <div className="managingModalOverlay">
      <div className="managingModal">
        <div className="managingModalHeader">
          <h2 className="managingModalTitle">{option}</h2>
          <button className="closeModalButton" onClick={onClose}>
            X
          </button>
        </div>

        <div className="managingModalBody">
          {option === "Chamada" && (
            <div className="attendanceSection">
              <h3>Registrar chamada</h3>
              <p>Marque presença ou falta dos membros por evento e data.</p>

              <div className="attendanceFilters">
                <div className="attendanceField">
                  <label className="attendanceLabel">Tipo de evento</label>
                  <select
                    className="attendanceInput"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="Culto">Culto</option>
                    <option value="Escola Bíblica">Escola Bíblica</option>
                    <option value="Oração">Oração</option>
                    <option value="Jovens">Jovens</option>
                    <option value="Evangelismo">Evangelismo</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div className="attendanceField">
                  <label className="attendanceLabel">Data</label>
                  <input
                    type="date"
                    className="attendanceInput"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>

              {feedback && <p className="attendanceFeedback">{feedback}</p>}

              <div className="attendanceUsersList">
                {availableUsers.map((member) => {
                  const status = attendanceStatus[member.userId];
                  const isLoading = loadingUserId === member.userId;

                  return (
                    <div key={member.userId} className="attendanceUserCard">
                      <div className="attendanceUserInfo">
                        <Image
                          src={member.profileImage || "/default-avatar.png"}
                          alt={member.username}
                          className="attendanceAvatar"
                          width={50}
                          height={50}
                        />
                        <div>
                          <p className="attendanceUserName">
                            {member.username}
                          </p>
                          <p className="attendanceUserMeta">
                            Role: {member.role || "user"} • Pontos:{" "}
                            {member.points || 0}
                          </p>
                        </div>
                      </div>

                      <div className="attendanceActions">
                        <button
                          className={`presenceButton ${
                            status === "present"
                              ? "selectedAttendanceButton"
                              : ""
                          }`}
                          onClick={() => handleAttendance(member.userId, true)}
                          disabled={isLoading || status === "present"}
                        >
                          {isLoading ? "Salvando..." : "Presença"}
                        </button>

                        <button
                          className={`absenceButton ${
                            status === "absent"
                              ? "selectedAttendanceButton"
                              : ""
                          }`}
                          onClick={() => handleAttendance(member.userId, false)}
                          disabled={isLoading || status === "absent"}
                        >
                          {isLoading ? "Salvando..." : "Falta"}
                        </button>
                      </div>

                      {status && (
                        <div
                          className={
                            status === "present"
                              ? "attendanceStatusBadge presentStatusBadge"
                              : "attendanceStatusBadge absentStatusBadge"
                          }
                        >
                          <span className="attendanceCheckmark">✓</span>
                          {status === "present"
                            ? "Status atual: Presença"
                            : "Status atual: Falta"}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {option === "Histórico de presença" && (
            <div className="attendanceSection">
              <h3>Histórico de presença</h3>
              <p>
                Visualize o resumo de todos os usuários e clique em um para ver
                os detalhes.
              </p>

              <div className="attendanceFilters">
                <div className="attendanceField">
                  <label className="attendanceLabel">Período</label>
                  <select
                    className="attendanceInput"
                    value={historyPeriodType}
                    onChange={(e) =>
                      setHistoryPeriodType(
                        e.target.value as
                          | "month"
                          | "quarter"
                          | "semester"
                          | "year",
                      )
                    }
                  >
                    <option value="month">Mês</option>
                    <option value="quarter">Trimestre</option>
                    <option value="semester">Semestre</option>
                    <option value="year">Ano</option>
                  </select>
                </div>

                <div className="attendanceField">
                  <label className="attendanceLabel">Ano</label>
                  <input
                    type="number"
                    className="attendanceInput"
                    value={historyYear}
                    onChange={(e) => setHistoryYear(Number(e.target.value))}
                  />
                </div>

                {historyPeriodType === "month" && (
                  <div className="attendanceField">
                    <label className="attendanceLabel">Mês</label>
                    <select
                      className="attendanceInput"
                      value={historyMonth}
                      onChange={(e) => setHistoryMonth(Number(e.target.value))}
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {historyPeriodType === "quarter" && (
                  <div className="attendanceField">
                    <label className="attendanceLabel">Trimestre</label>
                    <select
                      className="attendanceInput"
                      value={historyQuarter}
                      onChange={(e) =>
                        setHistoryQuarter(Number(e.target.value))
                      }
                    >
                      <option value={1}>1º trimestre</option>
                      <option value={2}>2º trimestre</option>
                      <option value={3}>3º trimestre</option>
                      <option value={4}>4º trimestre</option>
                    </select>
                  </div>
                )}

                {historyPeriodType === "semester" && (
                  <div className="attendanceField">
                    <label className="attendanceLabel">Semestre</label>
                    <select
                      className="attendanceInput"
                      value={historySemester}
                      onChange={(e) =>
                        setHistorySemester(Number(e.target.value))
                      }
                    >
                      <option value={1}>1º semestre</option>
                      <option value={2}>2º semestre</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="historyTableWrapper">
                {attendanceHistorySummary.length === 0 ? (
                  <p className="attendanceFeedback">
                    Nenhum dado encontrado para este período.
                  </p>
                ) : (
                  <table className="historyTable">
                    <thead>
                      <tr>
                        <th>Usuário</th>
                        <th>Total</th>
                        <th>Presenças</th>
                        <th>Faltas</th>
                        <th>% Presença</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceHistorySummary.map((item) => (
                        <tr
                          key={item.userId}
                          className="historyTableRow"
                          onClick={() => setSelectedHistoryUserId(item.userId)}
                        >
                          <td>
                            <div className="historyUserCell">
                              <Image
                                src={item.profileImage || "/default-avatar.png"}
                                alt={item.username}
                                width={36}
                                height={36}
                                className="attendanceAvatar"
                              />
                              <span>{item.username}</span>
                            </div>
                          </td>
                          <td>{item.total}</td>
                          <td>{item.presents}</td>
                          <td>{item.absents}</td>
                          <td>{item.attendanceRate}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {selectedHistoryUserId && (
                <div className="historyDetailsSection">
                  <h4>Detalhes do usuário</h4>

                  <div className="cardsGrid">
                    <div className="card">
                      <h3>Total</h3>
                      <p>{historySummary.total}</p>
                    </div>
                    <div className="card">
                      <h3>Presenças</h3>
                      <p>{historySummary.presents}</p>
                    </div>
                    <div className="card">
                      <h3>Faltas</h3>
                      <p>{historySummary.absents}</p>
                    </div>
                    <div className="card">
                      <h3>% Presença</h3>
                      <p>{historySummary.attendanceRate}%</p>
                    </div>
                  </div>

                  <div className="attendanceUsersList">
                    {attendanceHistory.length === 0 ? (
                      <p className="attendanceFeedback">
                        Nenhum registro encontrado.
                      </p>
                    ) : (
                      attendanceHistory.map((item) => (
                        <div key={item.id} className="attendanceUserCard">
                          <div className="attendanceUserInfo">
                            <div>
                              <p className="attendanceUserName">
                                {item.service}
                              </p>
                              <p className="attendanceUserMeta">
                                {new Date(
                                  item.localAttendanceDate,
                                ).toLocaleDateString("pt-BR")}
                              </p>
                            </div>
                          </div>

                          <div className="attendanceActions">
                            <div
                              className={
                                item.present
                                  ? "attendanceStatusBadge presentStatusBadge"
                                  : "attendanceStatusBadge absentStatusBadge"
                              }
                            >
                              <span className="attendanceCheckmark">✓</span>
                              {item.present ? "Presente" : "Faltou"}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {option === "Pontuações" && (
            <div>
              <h3>Pontuações</h3>
              <p>
                Aqui você poderá recompensar usuários com pontos e acompanhar a
                pontuação atual.
              </p>
            </div>
          )}

          {option === "Eventos" && (
            <div>
              <h3>Eventos</h3>
              <p>
                Aqui você poderá criar e gerenciar atividades do calendário da
                igreja.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagingModal;
