"use client";

import Image from "next/image";

interface EventoModalProps {
  isOpen: boolean;
  onClose: () => void;
  evento: {
    titulo: string;
    inicio: Date;
    fim: Date;
    descricao?: string;
    local?: string;
    categoria: string;
    notificacao?: string;
  };
  isCriador: boolean;
}

export default function EventoModal({
  isOpen,
  onClose,
  evento,
  isCriador,
}: EventoModalProps) {
  if (!isOpen) return null;

  const categoriaCorMap: Record<string, string> = {
    "Evento Acadêmico": "#F2C94C",
    "Evento Pessoal": "#47C16B",
    "Outro": "#9B51E0",
  };

  const corCategoria = categoriaCorMap[evento.categoria] ?? "#CCC";

  const dataFormatada = evento.inicio.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  const horaFormatada = `${evento.inicio.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${evento.fim.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[420px] rounded-2xl bg-white shadow-lg overflow-hidden">
        <div className="flex justify-between px-6 pt-5">
          <div className="mt-1">
            <div
              className="w-10 h-2 rounded-full"
              style={{ backgroundColor: corCategoria }}
            />
          </div>

          <div className="flex items-center gap-3">
            {isCriador && (
              <>
                <button className="p-1 rounded-full hover:bg-black/5">
                  <Image src="/edit.png" alt="Editar" width={20} height={20} />
                </button>

                <button className="p-1 rounded-full hover:bg-black/5">
                  <Image
                    src="/Eye.png"
                    alt="Ocultar evento"
                    width={20}
                    height={20}
                  />
                </button>

                <button className="p-1 rounded-full hover:bg-black/5">
                  <Image
                    src="/delete.png"
                    alt="Deletar"
                    width={20}
                    height={20}
                  />
                </button>
              </>
            )}

            {!isCriador && (
              <>
                <button className="p-1 rounded-full hover:bg-black/5">
                  <Image
                    src="/Eye.png"
                    alt="Ocultar evento"
                    width={20}
                    height={20}
                  />
                </button>

                <button className="p-1 rounded-full hover:bg-black/5">
                  <Image
                    src="/recusar.png"
                    alt="Recusar evento"
                    width={20}
                    height={20}
                  />
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-black/5"
            >
              <Image src="/close.png" alt="Fechar" width={20} height={20} />
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2">
          <h3 className="text-lg font-semibold">{evento.titulo}</h3>

          <div className="mt-3 flex justify-between text-sm text-[#141313] capitalize">
            <span>{dataFormatada}</span>
            <span>{horaFormatada}</span>
          </div>

          <div className="mt-8 space-y-4">
            {evento.descricao && (
              <div className="flex items-start gap-4">
                <Image
                  src="/description.png"
                  alt="Descrição"
                  width={20}
                  height={20}
                />
                <p className="text-sm text-[#141313]">
                  {evento.descricao}
                </p>
              </div>
            )}

            {evento.local && (
              <div className="flex items-start gap-4">
                <Image
                  src="/location_on.png"
                  alt="Local"
                  width={20}
                  height={20}
                />
                <p className="text-sm text-[#141313]">{evento.local}</p>
              </div>
            )}

            {evento.notificacao && (
              <div className="flex items-start gap-4">
                <Image
                  src="/notifications.png"
                  alt="Notificação"
                  width={20}
                  height={20}
                />
                <p className="text-sm text-[#141313]">
                  {evento.notificacao}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
