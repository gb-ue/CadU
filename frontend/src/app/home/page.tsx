"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState, useRef } from "react";
import PopupCriarEvento from "../components/CriarEvento/page";
import Sidebar from "../components/sidebar";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule";
import { mapEventoToCalendar } from "../mapEventoToCalendar";
import EventoModal from "../components/evento";
import EventoRecorrenteModal from "../components/evento-recorrente";

export async function createEvento(evento: any) {
  const res = await fetch("http://localhost:8080/usuario/eventos/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(evento),
  });

  if (!res.ok) throw new Error("Erro ao criar evento");
  return res.json();
}

export async function deleteEvento(idEvento: number) {
  const res = await fetch(
    `http://localhost:8080/usuario/eventos/${idEvento}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!res.ok) throw new Error("Erro ao deletar evento");
}

// async function updateEvento(id: number, evento: any) {
//   const res = await fetch(
//     `http://localhost:8080/usuario/eventos/${id}`,
//     {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify(evento),
//     }
//   );

//   if (!res.ok) throw new Error("Erro ao editar evento");
//   return res.json();
// }

export default function Home() {
  const calendarRef = useRef<FullCalendar | null>(null);

  const [showPopupCriarEvento, setShowPopupCriarEvento] = useState(false);
  // const [eventoParaEditar, setEventoParaEditar] = useState<any | null>(null);

  const [eventoSelecionado, setEventoSelecionado] = useState<any>(null);
  const [showEventoModal, setShowEventoModal] = useState(false);
  const [showEventoRecorrenteModal, setShowEventoRecorrenteModal] =
    useState(false);

  const [role, setRole] = useState<"Administrador" | "Aluno">("Aluno");
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(Number(storedUserId));
  }, []);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole === "Administrador") setRole("Administrador");
  }, []);

  const isCriador =
    userId !== null && eventoSelecionado?.id_Organizador === userId;

  // const handleSaveEvento = async (evento: any) => {
  //   try {
  //     if (evento.id_Evento) {
  //       await updateEvento(evento.id_Evento, evento);
  //     } else {
  //       await createEvento(evento);
  //     }

  //     setShowPopupCriarEvento(false);
  //     setEventoParaEditar(null);
  //     calendarRef.current?.getApi().refetchEvents();
  //   } catch (error) {
  //     console.error(error);
  //     alert("Erro ao salvar evento");
  //   }
  // };

  const handleSaveEvento = async (evento: any) => {
    try {
      await createEvento(evento);
      setShowPopupCriarEvento(false);
      calendarRef.current?.getApi().refetchEvents();
    } catch (error) {
      console.error(error);
      alert("Erro ao criar evento");
    }
  };

  const handleDeleteEvento = async () => {
    if (!eventoSelecionado) return;

    const confirmar = window.confirm(
      "Tem certeza que deseja deletar este evento?"
    );
    if (!confirmar) return;

    try {
      await deleteEvento(eventoSelecionado.id_Evento);

      setShowEventoModal(false);
      setShowEventoRecorrenteModal(false);
      setEventoSelecionado(null);

      calendarRef.current?.getApi().refetchEvents();
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar evento");
    }
  };

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      <Sidebar role={role} />

      <main className="flex-1 p-8 pt-[10vh] flex justify-center">
        <div className="mx-auto w-full max-w-7xl h-[75vh] bg-white rounded-2xl border border-black p-6 shadow-sm flex flex-col">
          <div className="flex-1 min-h-0">
            <FullCalendar
              ref={calendarRef}
              plugins={[
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin,
                listPlugin,
                rrulePlugin,
              ]}
              locales={[ptBrLocale]}
              locale="pt-br"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
              }}
              eventSources={[
                async (_, successCallback, failureCallback) => {
                  try {
                    const token = localStorage.getItem("token");

                    if (!token) {
                      console.warn("Token não encontrado");
                      successCallback([]);
                      return;
                    }

                    const res = await fetch(
                      "http://localhost:8080/usuario/eventos",
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );

                    if (!res.ok) {
                      throw new Error(`Erro ao buscar eventos: ${res.status}`);
                    }

                    const data = await res.json();

                    if (!Array.isArray(data)) {
                      console.error("Resposta inesperada do backend:", data);
                      successCallback([]);
                      return;
                    }

                    successCallback(data.map(mapEventoToCalendar));
                  } catch (error) {
                    console.error("Erro ao carregar eventos:", error);
                    failureCallback(
                      error instanceof Error
                        ? error
                        : new Error("Erro desconhecido")
                    );
                  }
                },
              ]}

              eventClick={(info) => {
                const e = info.event;

                const eventoFormatado = {
                  id_Evento: e.extendedProps.id_Evento,
                  id_Organizador: e.extendedProps.id_Organizador,

                  titulo: e.title,
                  inicio: e.start!,
                  fim: e.end!,
                  descricao: e.extendedProps.descricao ?? "",
                  local: e.extendedProps.local ?? "",
                  categoria: e.extendedProps.categoria,
                  notificacao: undefined,

                  Nome_do_Evento: e.title,
                  Descriçao: e.extendedProps.descricao ?? "",
                  Local: e.extendedProps.local ?? "",
                  Data_Horario_Inicio: e.start?.toISOString(),
                  Data_Horario_Fim: e.end?.toISOString(),
                  Data_Lembrete: e.start?.toISOString(),
                  Recorrente: e.extendedProps.recorrente,
                  Tipo_Recorrencia: e.extendedProps.tipoRecorrencia ?? null,
                  Recorrente_ate: null,
                  convidados: [],
                  grupos_convidados: [],
                };

                setEventoSelecionado(eventoFormatado);

                if (e.extendedProps.recorrente) {
                  setShowEventoRecorrenteModal(true);
                } else {
                  setShowEventoModal(true);
                }
              }}
              dateClick={() => setShowPopupCriarEvento(true)}
            />

            <PopupCriarEvento
              isOpen={showPopupCriarEvento}
              onClose={() => {
                setShowPopupCriarEvento(false);
                // setEventoParaEditar(null);
              }}
              onSave={handleSaveEvento}
              // eventoInicial={eventoParaEditar}
            />

            {showEventoModal && eventoSelecionado && (
              <EventoModal
                isOpen
                evento={eventoSelecionado}
                isCriador={isCriador}
                onClose={() => setShowEventoModal(false)}
                onDelete={handleDeleteEvento}
                // onEditar={() => {
                //   setShowEventoModal(false);
                //   setEventoParaEditar(eventoSelecionado);
                //   setShowPopupCriarEvento(true);
                // }}
              />
            )}

            {showEventoRecorrenteModal && eventoSelecionado && (
              <EventoRecorrenteModal
                isOpen
                evento={eventoSelecionado}
                isCriador={isCriador}
                onClose={() => setShowEventoRecorrenteModal(false)}
                onDelete={handleDeleteEvento}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
