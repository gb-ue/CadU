"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import PopupCriarEvento from "../components/CriarEvento/page";
import Sidebar from "../components/sidebar";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from "@fullcalendar/rrule";
import { mapEventoToCalendar } from "../mapEventoToCalendar";
import { useRef } from "react";
import type { CalendarApi } from "@fullcalendar/core";
import EventoModal from "../components/evento";
import EventoRecorrenteModal from "../components/evento-recorrente";


// interface Event {
//   title: string;
//   start: Date | string;
//   allDay: boolean;
//   id: number;
// }

export async function createEvento(evento: any) {
  const res = await fetch("http://localhost:8080/usuario/eventos/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(evento),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar evento");
  }

  return res.json();
}


export default function Home() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [showPopupCriarEvento, setShowPopupCriarEvento] = useState(false);
  const [role, setRole] = useState<"Administrador" | "Aluno">("Aluno");
  const [eventoSelecionado, setEventoSelecionado] = useState<any>(null);
  const [showEventoModal, setShowEventoModal] = useState(false);
  const [showEventoRecorrenteModal, setShowEventoRecorrenteModal] = useState(false);

  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
  const storedUserId = localStorage.getItem("userId");
  if (storedUserId) {
    setUserId(Number(storedUserId));
  }
  }, []);

  const isCriador =
  userId !== null && eventoSelecionado?.id_Organizador === userId;

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole === "Administrador") {
      setRole("Administrador");
    }
  }, []);

  // const handleSaveEvento = (evento: Event) => {
  //   setShowPopupCriarEvento(false);
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

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar role={role} />

      <main className="flex-1 p-8 pt-[10vh] flex justify-center">
        <div className="mx-auto w-full max-w-7xl h-[75vh] bg-white rounded-2xl border border-black p-6 shadow-sm flex flex-col">
          <div className="flex-1 min-h-0">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, rrulePlugin]}
              locales={[ptBrLocale]}
              locale="pt-br"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek, timeGridDay, listWeek"
              }}
              eventSources={[
                async (info, successCallback, failureCallback) => {
                  try {
                    const res = await fetch("http://localhost:8080/usuario/eventos", {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    });

                    const data = await res.json();
                    successCallback(data.map(mapEventoToCalendar));
                  } catch(error) {
                    if (error instanceof Error) {
                      failureCallback(error);
                    } else {
                      failureCallback(new Error("Erro desconhecido ao buscar eventos"));
                    }
                  }
                },
              ]}
              nowIndicator
              slotMinTime="07:00:00"
              slotMaxTime="17:00:00"
              editable
              selectable
              expandRows
              contentHeight="auto"
              eventClick={(info) => {
                const evento = info.event;

                setEventoSelecionado({
                  id_Evento: evento.extendedProps.id_Evento,
                  id_Organizador: evento.extendedProps.id_Organizador,
                  categoria: evento.extendedProps.categoria,
                  recorrente: evento.extendedProps.recorrente,
                  titulo: evento.title,
                  inicio: evento.start,
                  fim: evento.end,
                });

                if (evento.extendedProps.recorrente) {
                  setShowEventoRecorrenteModal(true);
                } else {
                  setShowEventoModal(true);
                }
              }}
              dateClick={() => setShowPopupCriarEvento(true)}
            />

            <PopupCriarEvento
              isOpen={showPopupCriarEvento}
              onClose={() => setShowPopupCriarEvento(false)}
              onSave={handleSaveEvento}
            />

            {showEventoModal && eventoSelecionado && (
            <EventoModal
              isOpen={showEventoModal}
              onClose={() => setShowEventoModal(false)}
              evento={eventoSelecionado}
              isCriador={eventoSelecionado.id_Organizador === userId}
            />
            )}

            {showEventoRecorrenteModal && eventoSelecionado && (
            <EventoRecorrenteModal
              isOpen={showEventoRecorrenteModal}
              onClose={() => setShowEventoRecorrenteModal(false)}
              evento={eventoSelecionado}
              isCriador={eventoSelecionado.id_Organizador === userId}
            />
          )}

          </div>
        </div>
      </main>
    </div>
  );
}
