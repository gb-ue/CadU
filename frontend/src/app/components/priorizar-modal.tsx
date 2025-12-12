"use client";

import React from "react";

type Props = {
  eventos?: string[];
  onCancel?: () => void;
  onConfirm?: (chosen: string | null) => void;
};

export default function Priorizar({
  eventos = ["Reunião APS", "Aula PAA"],
  onCancel,
  onConfirm,
}: Props) {
  const [chosen, setChosen] = React.useState<string | null>(null);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="priorizar-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => onCancel && onCancel()}
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-[520px] rounded-2xl bg-[#F5F2F2] shadow-lg overflow-hidden"
      >
        <div
          className="w-full py-3 text-center bg-[#C4838C]"
        >
          <h2 id="priorizar-title" className="text-base font-medium text-white">
            Choque de horários
          </h2>
        </div>

        <div className="px-8 pt-6 pb-8">
          <p className="text-sm text-[#141313] mb-6 font-medium">
            Esses eventos possuem horários conflitantes
            <br />
            Qual deles deseja priorizar?
          </p>

          <div className="flex gap-4 mb-8">
            {eventos.map((ev) => {
              const isSelected = chosen === ev;
              return (
                <button
                  key={ev}
                  onClick={() => setChosen(ev)}
                  className={`flex-1 rounded-md border px-4 py-3 text-sm font-medium transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-1`}
                  style={{
                    borderColor: isSelected ? "#C4838C" : "rgba(0,0,0,0.2)",
                    background: isSelected ? "rgba(196,131,140,0.12)" : "transparent",
                    boxShadow: isSelected ? "0 2px 6px rgba(196,131,140,0.12)" : "none",
                    color: "#111",
                  }}
                  aria-pressed={isSelected}
                >
                  {ev}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                setChosen(null);
                onCancel && onCancel();
              }}
              className="rounded-md px-6 py-2 text-sm font-medium border"
              style={{
                borderColor: "#C4838C",
                background: "transparent",
                color: "#141313",
              }}
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={() => onConfirm && onConfirm(chosen)}
              disabled={!chosen}
              className="rounded-md px-6 py-2 text-sm font-medium shadow-sm"
              style={{
                background: "#C4838C",
                color: "#141313",
                boxShadow: "0 6px 10px rgba(196,131,140,0.18)",
                opacity: 1,
              }}
              aria-disabled={!chosen}
            >
              Escolher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
