"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import PopupCriarEvento from "../components/CriarEvento/page";
import Sidebar from "../components/sidebar";

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

export default function Home() {
  const [showPopupCriarEvento, setShowPopupCriarEvento] = useState(false);
  const [role, setRole] = useState<"Administrador" | "Aluno">("Aluno");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole === "Administrador") {
      setRole("Administrador");
    }
  }, []);

  const handleSaveEvento = (evento: Event) => {
    setShowPopupCriarEvento(false);
  };

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar role={role} />

      <main className="flex-1 p-8 mt-10">
        <div className="mx-auto w-full max-w-7xl h-[75vh] bg-white rounded-2xl border border-black p-6 shadow-sm">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            events={{}}
            nowIndicator
            editable
            selectable
            height="100%"
            dateClick={() => setShowPopupCriarEvento(true)}
          />

          <PopupCriarEvento
            isOpen={showPopupCriarEvento}
            onClose={() => setShowPopupCriarEvento(false)}
            onSave={handleSaveEvento}
          />
        </div>
      </main>
    </div>
  );
}
