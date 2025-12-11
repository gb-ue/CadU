"use client";

import Image from "next/image";

type EventoRecorrente = {
  titulo?: string;
  data?: string;
  hora?: string;
  descricao?: string;
  notificacao?: string;
  local?: string;
  onClose?: () => void;
};

export default function EventoRecorrenteModal({
  titulo = "Aula de APS",
  data = "Toda terça-feira e quinta-feira",
  hora = "9:20 - 11:00",
  descricao = "Aula",
  notificacao = "15 minutos antes",
  local = "P-07",
  onClose,
}: EventoRecorrente) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
    >
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => onClose && onClose()}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[420px] rounded-2xl bg-white shadow-lg overflow-hidden">
        <div className="flex items-start justify-between px-6 pt-5">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <div className="w-10 h-2 rounded-full bg-[#F2C94C]" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Faltas"
              onClick={() => console.log("Faltas")}
              className="p-1 rounded-full hover:bg-black/5 cursor-pointer"
            >
              <Image
                src="/faltas.png"
                alt="Faltas"
                width={20}
                height={20}
              />
            </button>

            <button
              type="button"
              aria-label="Editar"
              onClick={() => console.log("Editar")}
              className="p-1 rounded-full hover:bg-black/5 cursor-pointer"
            >
              <Image
                src="/edit.png"
                alt="Editar"
                width={20}
                height={20}
              />
            </button>

            <button
              type="button"
              aria-label="Visualizar"
              onClick={() => console.log("Visualizar")}
              className="p-1 rounded-full hover:bg-black/5 cursor-pointer"
            >
              <Image
                src="/Eye.png"
                alt="Visualizar"
                width={20}
                height={20}
              />
            </button>

            <button
              type="button"
              aria-label="Deletar"
              onClick={() => console.log("Deletar")}
              className="p-1 rounded-full hover:bg-black/5 cursor-pointer"
            >
              <Image
                src="/delete.png"
                alt="Deletar"
                width={20}
                height={20}
              />
            </button>

            <button
              type="button"
              aria-label="Fechar"
              onClick={() => onClose && onClose()}
              className="p-1 rounded-full hover:bg-black/5 cursor-pointer"
            >
              <Image
                src="/close.png"
                alt="Fechar"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2">
          <h3 className="text-lg font-semibold text-[#111]">{titulo}</h3>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-[#141313]">{data}</span>
            <span className="text-sm text-[#141313]">{hora}</span>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-4">
              <Image
                src="/description.png"
                alt="Descrição"
                width={20}
                height={20}
              />
              <p className="text-sm text-[#141313]">{descricao}</p>
            </div>

            <div className="flex items-start gap-4">
              <Image
                src="/notifications.png"
                alt="Notificações"
                width={20}
                height={20}
              />
              <p className="text-sm text-[#141313]">{notificacao}</p>
            </div>

            <div className="flex items-start gap-4">
              <Image
                src="/location_on.png"
                alt="Local"
                width={20}
                height={20}
              />
              <p className="text-sm text-[#141313]">{local}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
