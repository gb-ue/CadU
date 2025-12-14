"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PopupCriarEvento from "../components/CriarEvento/page";

interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
}

export default function Home() {
  const router = useRouter();
  const [showPopupCriarEvento, setShowPopupCriarEvento] = useState(false);

  const [openGroups, setOpenGroups] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [openHiddenEvents, setOpenHiddenEvents] = useState(false);

  const handleSaveEvento = (evento: Event) => {
    setShowPopupCriarEvento(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    router.push("/login");
  };

  const ChevronIcon = ({ open }: { open: boolean }) => (
    <img
      src={open ? "keyboard_arrow_down.png" : "chevron_forward.png"}
      alt="Toggle section"
      className="w-6 h-6"
    />
  );

  return (
    <div className="min-h-screen flex bg-white">
      <aside className="w-72 bg-[#EEE5E5] border-r border-black min-h-screen p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-8">
            <button className="p-2 rounded-md">
              <img src="Menu.png" alt="Menu" width={30} height={34} />
            </button>

            <img
              src="logo.svg"
              alt="Logo Calendário"
              className="h-14"
            />
          </div>

          {/*Seção de grupos, lembrar de adicionar modais de criar grupo */}
          <div className="mb-6">
            <button
              onClick={() => setOpenGroups(!openGroups)}
              className="w-full flex items-center justify-between"
            >
              <span className="text-[25px] text-[#141313] font-normal">
                Meus Grupos
              </span>
              <ChevronIcon open={openGroups} />
            </button>

            {openGroups && (
              <div className="mt-4 pl-2">
                <button className="flex items-center gap-2 text-[#141313]/80">
                  <img src="add.png" alt="Adicionar Grupo" className="w-6 h-6" />
                  <span className="text-[20px]">Adicionar Grupo</span>
                </button>
              </div>
            )}
          </div>

          {/*Seção de filtrar eventos */}
          <div className="mb-6">
            <button
              onClick={() => setOpenFilters(!openFilters)}
              className="w-full flex items-center justify-between"
            >
              <span className="text-[25px] text-[#141313] font-normal">
                Filtros
              </span>
              <ChevronIcon open={openFilters} />
            </button>

            {openFilters && (
              <div className="mt-4 pl-2">
                <label className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 accent-[#C4838C]"
                  />
                  <span className="text-[20px] text-[#141313]/80">
                    Feriados
                  </span>
                </label>
              </div>
            )}
          </div>

          {/*Seção de eventos ocultos */}
          <div className="mb-6">
            <button
              onClick={() => setOpenHiddenEvents(!openHiddenEvents)}
              className="w-full flex items-center justify-between"
            >
              <span className="text-[25px] text-[#141313] font-normal">
                Eventos Ocultos
              </span>
              <ChevronIcon open={openHiddenEvents} />
            </button>

            {openHiddenEvents && (
              <div className="mt-4 pl-2">
                <button className="flex items-center gap-2">
                  <img
                    src="Eye-off.png"
                    alt="Eventos Ocultos"
                    className="w-7 h-7"
                  />
                  <span className="text-[20px] text-[#141313]/80">
                    Mostrar Eventos
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/*Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex gap-2 items-center cursor-pointer"
        >
          <img src="Logout.png" alt="Logout" width={30} height={30} />
          <span className="text-[20px] text-[#141313]/80">Sair</span>
        </button>
      </aside>

      {/*Calendário */}
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
