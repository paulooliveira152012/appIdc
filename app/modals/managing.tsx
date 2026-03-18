"use client";
import React, { useMemo, useState, useEffect } from "react";
import "@/app/style/styles.css";
import { usePlatform } from "../context/platformContext";
import { registerAttendance } from "../functions/leader";
import { useUser } from "../context/userContext";
import { fetchDataBasedOnDateChange } from "../functions/leader";

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

  // buscar dados de atividade com base na data
  useEffect(() => {
  const loadData = async () => {
    if (!selectedDate || !user?.userId || !option) {
      return;
    }

    try {
      const data = await fetchDataBasedOnDateChange({
        selectedDate,
        userId: user.userId,
        option,
        service: option === "Chamada" || option === "Histórico de presença"
          ? selectedService
          : undefined,
      });

      if (option === "Chamada") {
        const mappedStatus: Record<string, "present" | "absent"> = {};

        for (const attendance of data.attendances || []) {
          mappedStatus[attendance.userId] = attendance.present
            ? "present"
            : "absent";
        }

        setAttendanceStatus(mappedStatus);
      }
    } catch (error) {
      console.error(error);
      setAttendanceStatus({});
    }
  };

  loadData();
}, [selectedDate, selectedService, user?.userId, option]);

  const availableUsers = useMemo(() => {
    return Array.isArray(users) ? users : [];
  }, [users]);

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
                        <img
                          src={member.profileImage || "/default-avatar.png"}
                          alt={member.username}
                          className="attendanceAvatar"
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
                        {status === "present" ? (
                          <div className="attendanceStatusBadge presentStatusBadge">
                            <span className="attendanceCheckmark">✓</span>
                            Presença marcada
                          </div>
                        ) : status === "absent" ? (
                          <div className="attendanceStatusBadge absentStatusBadge">
                            <span className="attendanceCheckmark">✓</span>
                            Falta marcada
                          </div>
                        ) : (
                          <>
                            <button
                              className="presenceButton"
                              onClick={() =>
                                handleAttendance(member.userId, true)
                              }
                              disabled={isLoading}
                            >
                              {isLoading ? "Salvando..." : "Presença"}
                            </button>

                            <button
                              className="absenceButton"
                              onClick={() =>
                                handleAttendance(member.userId, false)
                              }
                              disabled={isLoading}
                            >
                              {isLoading ? "Salvando..." : "Falta"}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {option === "Histórico de presença" && (
            <div>
              <h3>Histórico de presença</h3>
              <p>
                Aqui você poderá consultar o histórico de presença de cada
                usuário por serviço.
              </p>
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
