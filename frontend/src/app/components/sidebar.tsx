"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  role: "Administrador" | "Aluno";
}

export default function Sidebar({ role }: SidebarProps) {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [openHiddenEvents, setOpenHiddenEvents] = useState(false);

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
    <aside
      className={`bg-[#EEE5E5] border-r border-black min-h-screen p-4 flex flex-col justify-between transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md cursor-pointer"
          >
            <img src="Menu.png" alt="Menu" width={30} height={34} />
          </button>

          {!collapsed && (
            <img src="logo.svg" alt="Logo" className="h-14" />
          )}
        </div>

        {/*Seção de grupos (adicionar só pra Aluno/Professor) */}
        <div className="mb-6">
          <button
            onClick={() => setOpenGroups(!openGroups)}
            className="w-full flex items-center justify-between cursor-pointer"
          >
            {!collapsed && (
              <span className="text-[25px] text-[#141313] font-normal">
                Meus Grupos
              </span>
            )}
            {!collapsed && <ChevronIcon open={openGroups} />}
          </button>

          {!collapsed && openGroups && (
            <div className="mt-4 pl-2 space-y-3">
              {role === "Administrador" ? (
                <div className="text-[20px] text-[#141313]/80">
                  E-mails UECE
                </div>
              ) : (
                <button className="flex items-center gap-2 text-[#141313]/80 cursor-pointer">
                  <img src="add.png" alt="Adicionar Grupo" className="w-6 h-6" />
                  <span className="text-[20px]">Adicionar Grupo</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/*Seção de filtrar eventos */}
        <div className="mb-6">
          <button
            onClick={() => setOpenFilters(!openFilters)}
            className="w-full flex items-center justify-between cursor-pointer"
          >
            {!collapsed && (
              <span className="text-[25px] text-[#141313] font-normal">
                Filtros
              </span>
            )}
            {!collapsed && <ChevronIcon open={openFilters} />}
          </button>

          {!collapsed && openFilters && (
            <div className="mt-4 pl-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 accent-[#C4838C] cursor-pointer"
                />
                <span className="text-[20px] text-[#141313]/80">
                  Feriados
                </span>
              </label>
            </div>
          )}
        </div>

        {/*Seção de Eventos Ocultos */}
        {!collapsed && role === "Aluno" && (
          <div className="mb-6">
            <button
              onClick={() => setOpenHiddenEvents(!openHiddenEvents)}
              className="w-full flex items-center justify-between cursor-pointer"
            >
              <span className="text-[25px] text-[#141313] font-normal">
                Eventos Ocultos
              </span>
              <ChevronIcon open={openHiddenEvents} />
            </button>

            {openHiddenEvents && (
              <div className="mt-4 pl-2">
                <button className="flex items-center gap-2 cursor-pointer">
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
        )}
      </div>

      {/*Logout */}
      <button
        onClick={handleLogout}
        className={`w-full flex gap-3 px-2 items-center cursor-pointer ${collapsed ? "justify-center" : "justify-start"}`}
      >
        <img src="Logout.png" alt="Logout" width={30} height={30} />
        {!collapsed && (
          <span className="text-[20px] text-[#141313]/80">Sair</span>
        )}
      </button>
    </aside>
  );
}
