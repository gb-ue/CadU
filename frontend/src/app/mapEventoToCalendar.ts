import { Frequency } from "rrule";

export function mapEventoToCalendar(evento: any) {
  const categoriaColorMap: Record<string, string> = {
    "Evento Acadêmico": "#F2C94C",
    "Evento Pessoal": "#47C16B",
    "Outro": "#9B51E0",
  };

  const corCategoria =
    categoriaColorMap[evento.categoria] ?? "#3788d8";

  const baseEvent: any = {
    id: String(evento.id_Evento),
    title: evento.Nome_do_Evento,

    backgroundColor: corCategoria,
    borderColor: corCategoria,
    textColor: "#141313",

    extendedProps: {
      id_Evento: evento.id_Evento,
      id_Organizador: evento.id_Organizador,
      categoria: evento.categoria,
      recorrente: evento.Recorrente,
      tipoRecorrencia: evento.Tipo_Recorrencia,
      descricao: evento.Descriçao,
      local: evento.Local,
    },
  };

  if (evento.Recorrente && evento.Tipo_Recorrencia) {
    const freqMap: Record<string, Frequency> = {
      Diariamente: Frequency.DAILY,
      Semanalmente: Frequency.WEEKLY,
      Mensalmente: Frequency.MONTHLY,
      Anualmente: Frequency.YEARLY,
    };

    return {
      ...baseEvent,
      rrule: {
        freq: freqMap[evento.Tipo_Recorrencia],
        dtstart: evento.Data_Horario_Inicio,
        until: evento.Recorrente_ate ?? undefined,
      },
      duration: {
        milliseconds:
          new Date(evento.Data_Horario_Fim).getTime() -
          new Date(evento.Data_Horario_Inicio).getTime(),
      },
    };
  }

  return {
    ...baseEvent,
    start: evento.Data_Horario_Inicio,
    end: evento.Data_Horario_Fim,
  };
}