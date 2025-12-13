"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useState } from "react";
import { useRouter } from "next/navigation";
import PopupCriarEvento from "../components/CriarEvento/page";

interface Event{
   title: string;
   start: Date | string;
   allDay: boolean;
   id: number;
}

export default function Home() {
  const router = useRouter();
  const [showPopupCriarEvento, setShowPopupCriarEvento] = useState(false);
  // const [events, setEvents] = useState([
  //   {title: 'Aniversário', id: '1'},
  //   {title: 'Dia das Crianças', id: '2'},
  //   {title: 'Prova de Arquitetura de Computadores', id: '3'}
  // ])

  // const [allEvents, setAllEvents] = useState<Event[]>([])
  // const [showModal, setShowModal] = useState(false)
  // const [showDeleteModal, setShowDeleteModal] = useState(false)
  // const [idToDelete, setIdToDelete] = useState<number | null>(null)
  // const [newEvent, setNewEvent] = useState<Event>({
  //   title: '',
  //   start: '',
  //   allDay: false,
  //   id: 0
  // })

  const handleSaveEvento = (evento: Event) => {
  // Lógica para salvar o evento
  setShowPopupCriarEvento(false);
};

  return (
    <div className="min-h-screen flex bg-white">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#EEE5E5] border-r border-black min-h-screen p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between">
              <button className="mb-6 p-2 rounded-md inline-flex items-center gap-2">
                <img src="Menu.png" alt="Menu Sidebar" width="30" height="34" />
              </button>
              
          </div>

          <div className="mt-6">
            <h3 className="text-[25px] text-[#141313] font-normal mb-3">Filtros</h3>
            <label className="flex items-center gap-3 mb-3">
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-[#C4838C]" />
              <span className="text-[20px] text-[#141313]/80">Feriados</span>
            </label>
          </div>

          <div className="mt-8">
            <h3 className="text-[25px] text-[#141313] font-normal mb-3">Eventos Ocultos</h3>
            <button className="flex items-center gap-2 text-sm text-gray-600">
              <img src="Eye-off.png" alt="Eventos Ocultos" width="28" height="28" />
              <span className="text-[20px] text-[#141313]/80">Mostrar Eventos</span>
            </button>
          </div>
        </div>

        <div className="mt-6">
          <button className="w-full flex gap-2 cursor-pointer" 
            onClick={() => { localStorage.removeItem("token"); 
                localStorage.removeItem("userId"); 
                localStorage.removeItem("role"); 
                router.push("/login"); }} 
          >
            <img src="Logout.png" alt="Logout" width="30" height="30" />
            <span className="text-[20px] text-[#141313]/80">Sair</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 mt-10">
        <div className="mx-auto w-full max-w-7xl h-[75vh] bg-white rounded-2xl border border-black p-6 shadow-sm">
          <FullCalendar
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin
            ]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'resourceTimelineWeek,dayGridMonth,timeGridWeek'
            }}
            events={{}}
            nowIndicator={true}
            editable={true}
            droppable={true}
            selectable={true}
            selectMirror={true}
            height="100%"
            contentHeight="auto"
            // dateClick={{}}
            // drop={}
            // eventClick={}
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