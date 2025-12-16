"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PopupAdicionarGrupos from "./AdicionarGrupos/page";
import PopupDescartarAlteracoes from "./DescartarAlteracoes/page";

interface SidebarProps {
  role: "Administrador" | "Aluno";
  filtros: {
    "Evento Acadêmico": boolean;
    "Evento Pessoal": boolean;
    "Outro": boolean;
  };
  onToggleFiltro: (
    categoria: "Evento Acadêmico" | "Evento Pessoal" | "Outro"
  ) => void;
}

interface Grupo {
  id_Grupo: number;
  Nome_Grupo: string;
  id_Organizador: number;
}

export default function Sidebar({ role, filtros, onToggleFiltro, }: SidebarProps) {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState(false);
  const [openAddGroup, setOpenAddGroup] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [openHiddenEvents, setOpenHiddenEvents] = useState(false);
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [loadingGrupos, setLoadingGrupos] = useState(false);
  const [grupoSelecionado, setGrupoSelecionado] = useState<Grupo | null>(null);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [grupoParaExcluir, setGrupoParaExcluir] = useState<Grupo | null>(null);

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

  const fetchGrupos = async () => {
    setLoadingGrupos(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("Sem token, ignorando fetch de grupos");
        setGrupos([]);
        return;
      }

      const response = await fetch("http://localhost:8080/usuario/grupos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.warn(
          "Erro ao buscar grupos. Status:",
          response.status
        );
        setGrupos([]);
        return;
      }

      const data = await response.json();
      setGrupos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.warn("Falha ao buscar grupos (ignorado):", error);
      setGrupos([]);
    } finally {
      setLoadingGrupos(false);
    }
  };


useEffect(() => {
  fetchGrupos();
}, []);

const handleDeleteGrupo = async () => {
  if (!grupoParaExcluir) return;

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:8080/usuario/grupos/${grupoParaExcluir.id_Grupo}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao deletar grupo");
    }

    setGrupos((prev) =>
      prev.filter(
        (grupo) => grupo.id_Grupo !== grupoParaExcluir.id_Grupo
      )
    );

    setOpenDeletePopup(false);
    setGrupoParaExcluir(null);
  } catch (error) {
    console.error(error);
    alert("Erro ao deletar grupo"); // opcional trocar depois por toast
  }
};


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
            <div className="mt-4 pl-2 flex flex-col gap-3">
              {/* Lista de grupos */}
              {loadingGrupos && (
                <span className="text-[16px] text-[#141313]/60">
                  Carregando...
                </span>
              )}

              {!loadingGrupos && grupos.map((grupo) => (
                <button
                  key={grupo.id_Grupo}
                  className="
                    flex items-center gap-3
                    text-left text-[20px]
                    text-[#141313]/80
                    hover:text-[#141313]
                    cursor-pointer
                  "
                  onClick={() => {
                    setGrupoSelecionado(grupo);
                    setOpenAddGroup(true);
                  }}
                >
                  <img
                    src="/Users.svg"
                    alt="Grupo"
                    className="w-5 h-5"
                  />
                  <span className="flex-1">
                    {grupo.Nome_Grupo}
                  </span>
                  <img
                  src="/Trash.svg"
                  alt="Excluir Grupo"
                  className="w-4 h-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    setGrupoParaExcluir(grupo);
                    setOpenDeletePopup(true);
                  }}
                />
                </button>
              ))}

              {/* Botão adicionar grupo */}
              {role !== "Administrador" && (
                <button
                  className="flex items-center gap-2 text-[#141313]/80 cursor-pointer mt-2"
                  onClick={() => setOpenAddGroup(true)}
                >
                  <img src="add.png" alt="Adicionar Grupo" className="w-6 h-6" />
                  <span className="text-[20px]">Adicionar Grupo</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Seção de Filtros */}
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
            <div className="mt-4 pl-2 flex flex-col gap-3">
              {(
                ["Evento Acadêmico", "Evento Pessoal", "Outro"] as const
              ).map((categoria) => (
                <label
                  key={categoria}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filtros[categoria]}
                    onChange={() => onToggleFiltro(categoria)}
                    className="w-5 h-5 accent-[#C4838C]"
                  />
                  <span className="text-[20px] text-[#141313]/80">
                    {categoria}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
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

      <PopupAdicionarGrupos
        isOpen={openAddGroup}
        onClose={() => {
          setOpenAddGroup(false);
          setGrupoSelecionado(null);
        }}
        onConfirm={() => {
          fetchGrupos();
          setGrupoSelecionado(null);
          setOpenAddGroup(false);
        }}
        grupo={
          grupoSelecionado
            ? {
                id_Grupo: grupoSelecionado.id_Grupo,
                Nome_Grupo: grupoSelecionado.Nome_Grupo,
                emails: [],
              }
            : undefined
        }
      />

      <PopupDescartarAlteracoes
        isOpen={openDeletePopup}
        titulo="Certeza que deseja excluir este grupo?"
        onClose={() => {
          setOpenDeletePopup(false);
          setGrupoParaExcluir(null);
        }}
        onConfirm={handleDeleteGrupo}
      />

    </aside>
  );
}