import { Frequency } from "rrule";

export function mapEventoToCalendar(evento: any) {
  const baseEvent: any = {
    id: String(evento.id_Evento),
    title: evento.Nome_do_Evento,
    start: evento.Data_Horario_Inicio,
    end: evento.Data_Horario_Fim,
    extendedProps: {
      id_Evento: evento.id_Evento,
      id_Organizador: evento.id_Organizador,
      categoria: evento.categoria,
      recorrente: evento.Recorrente,
      tipoRecorrencia: evento.Tipo_Recorrencia,
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
        dtstart: new Date(evento.Data_Horario_Inicio),
        until: evento.Recorrente_ate
          ? new Date(evento.Recorrente_ate)
          : undefined,
      },
      duration: {
        milliseconds:
          new Date(evento.Data_Horario_Fim).getTime() -
          new Date(evento.Data_Horario_Inicio).getTime(),
      },
    };
  }

  return baseEvent;
}
