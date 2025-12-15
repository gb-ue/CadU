'use client';

import { useState, useEffect } from 'react';
import './style.css';
import PopupDescartarAlteracoes from '../DescartarAlteracoes/page';

interface Evento {
  Nome_do_Evento: string;
  Descriçao: string;
  Local: string;
  Data_Horario_Inicio: string;
  Data_Horario_Fim: string;
  Data_Lembrete: string;
  Recorrente: boolean;
  Tipo_Recorrencia?: string | null;
  Recorrente_ate?: string | null;
  grupos_convidados: number[];
  convidados: number[];
  categoria: string;
}

interface PopupCriarEventoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (evento: Evento) => void;
  // eventoInicial?: any;
}

export default function PopupCriarEvento({
  isOpen,
  onClose,
  onSave,
  // eventoInicial,
}: PopupCriarEventoProps) {
  const [title, setTitle] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");

  const [local, setLocal] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");

  const [convidadosSelecionado, setConvidadosSelecionado] = useState("");

  const [eventoRecorrente, setEventoRecorrente] = useState(false);
  const [repetir, setRepetir] = useState("");
  const [repetirAte, setRepetirAte] = useState("");
  const [lembrar, setLembrar] = useState("");

  const handleCancel = () => {
    setShowPopupDescartarAlteracoes(true);
  };

  const handleConfirmDiscard = () => {
    setShowPopupDescartarAlteracoes(false);
    onClose();
  };

  const handleCloseDiscard = () => {
    setShowPopupDescartarAlteracoes(false);
  };

  const [showPopupDescartarAlteracoes, setShowPopupDescartarAlteracoes] =
    useState(false);

  // useEffect(() => {
  //   if (!isOpen) return;

  //   if (eventoInicial) {
  //     setTitle(eventoInicial.Nome_do_Evento ?? "");
  //     setDescricao(eventoInicial.Descriçao ?? "");
  //     setLocal(eventoInicial.Local ?? "");
  //     setCategoria(eventoInicial.categoria ?? "");

  //     const inicio = new Date(eventoInicial.Data_Horario_Inicio);
  //     const fim = new Date(eventoInicial.Data_Horario_Fim);

  //     setDataInicio(inicio.toISOString().slice(0, 10));
  //     setHoraInicio(inicio.toISOString().slice(11, 16));
  //     setDataFim(fim.toISOString().slice(0, 10));
  //     setHoraFim(fim.toISOString().slice(11, 16));

  //     setEventoRecorrente(eventoInicial.Recorrente ?? false);
  //     setRepetir(eventoInicial.Tipo_Recorrencia ?? "");
  //     setRepetirAte("");
  //     setLembrar("");

  //   } else {
  //     setTitle("");
  //     setDescricao("");
  //     setLocal("");
  //     setCategoria("");
  //     setDataInicio("");
  //     setHoraInicio("");
  //     setDataFim("");
  //     setHoraFim("");
  //     setEventoRecorrente(false);
  //     setRepetir("");
  //     setRepetirAte("");
  //     setLembrar("");
  //   }

  //   setShowPopupDescartarAlteracoes(false);
  // }, [isOpen, eventoInicial]);

  useEffect(() => {
    if (!isOpen) return;

    // 🔹 LIMPAR TODOS OS CAMPOS AO ABRIR O MODAL
    setTitle("");
    setDescricao("");
    setLocal("");
    setCategoria("");

    setDataInicio("");
    setDataFim("");
    setHoraInicio("");
    setHoraFim("");

    setEventoRecorrente(false);
    setRepetir("");
    setRepetirAte("");

    setLembrar("");
    setConvidadosSelecionado("");

    setShowPopupDescartarAlteracoes(false);
  }, [isOpen]);
  
  if (!isOpen) return null;

  const calcularRecorrenciaAte = (): string | null => {
    if (!eventoRecorrente || !repetirAte) return null;

    const inicio = new Date(`${dataInicio}T${horaInicio}:00`);
    const data = new Date(inicio);

    switch (repetirAte) {
      case "1 mes":
        data.setMonth(data.getMonth() + 1);
        break;
      case "6 meses":
        data.setMonth(data.getMonth() + 6);
        break;
      case "1 ano":
        data.setFullYear(data.getFullYear() + 1);
        break;
      default:
        return null;
    }

    return data.toISOString();
  };

  const handleConfirm = () => {
    if (!title.trim() || !local.trim() || !categoria) {
      alert("Preencha Nome do Evento, Local e Categoria.");
      return;
    }

    if (!dataInicio || !horaInicio || !dataFim || !horaFim) {
      alert("Preencha data e hora de início e fim.");
      return;
    }

    const inicioISO = `${dataInicio}T${horaInicio}:00`;
    const fimISO = `${dataFim}T${horaFim}:00`;

    const dataLembrete =
      lembrar && lembrar !== "all"
        ? new Date(
            new Date(inicioISO).getTime() - Number(lembrar) * 60 * 1000
          ).toISOString()
        : new Date(inicioISO).toISOString();

    const convidados: number[] = [];
    const grupos_convidados: number[] = [];

    onSave({
      // ...(eventoInicial?.id_Evento && { id_Evento: eventoInicial.id_Evento }),
      Nome_do_Evento: title,
      Descriçao: descricao,
      Local: local,
      Data_Horario_Inicio: new Date(inicioISO).toISOString(),
      Data_Horario_Fim: new Date(fimISO).toISOString(),
      Data_Lembrete: dataLembrete,
      Recorrente: eventoRecorrente,
      Tipo_Recorrencia: eventoRecorrente ? repetir : null,
      Recorrente_ate: calcularRecorrenciaAte(),
      convidados,
      grupos_convidados,
      categoria,
    });

    onClose();
  };

  return (
    <div className="overlay">
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <div className="rosa" />

        <input
          className="titulo-popup"
          placeholder="Nome do Evento"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="lado">
          <div className="coluna">
            <div className="data-hora">
              <img src="/data.svg" className="icon" />
              <label className="texto">Data</label>
              <input
                className="input"
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
              />
              -
              <input
                className="input-data"
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
              />
            </div>

            <div className="data-hora">
              <img src="/alarm.svg" className="icon" />
              <label className="texto">Hora</label>
              <input
                className="input"
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
              />
              -
              <input
                className="input"
                type="time"
                value={horaFim}
                onChange={(e) => setHoraFim(e.target.value)}
              />
            </div>
          </div>

          <div className="coluna">
            <div className="repetir-recorrente">
              <label className="texto-2">
                <input
                  className="input2 accent-[#C4838C]"
                  type="checkbox"
                  checked={eventoRecorrente}
                  onChange={(e) => setEventoRecorrente(e.target.checked)}
                />
                Evento Recorrente
              </label>

              <select
                className="repetir"
                value={repetir}
                onChange={(e) => setRepetir(e.target.value)}
                disabled={!eventoRecorrente}
              >
                <option value="">Selecione</option>
                <option value="Diariamente">Diariamente</option>
                <option value="Semanalmente">Semanalmente</option>
                <option value="Mensalmente">Mensalmente</option>
                <option value="Anualmente">Anualmente</option>
              </select>
            </div>

            <div className="repetir-recorrente">
              <label className="texto-2">
                <img src="/repetir.svg" className="icon" />
                Repetir Até
              </label>
              <select
                className="repetir"
                value={repetirAte}
                onChange={(e) => setRepetirAte(e.target.value)}
                disabled={!eventoRecorrente}
              >
                <option value="">Sempre</option>
                <option value="1 mes">Um Mês</option>
                <option value="6 meses">Um Semestre</option>
                <option value="1 ano">Um Ano</option>
              </select>
            </div>
          </div>
        </div>

        <div className="lado">
          <div className="coluna">
            <div className="linha">
              <img src="/local.svg" className="icon" />
              <input
                className="input-baixo"
                placeholder="Local"
                value={local}
                onChange={(e) => setLocal(e.target.value)}
              />
            </div>

            <div className="linha">
              <img src="/convidados.svg" className="icon" />
              <select
                className="input-baixo"
                value={convidadosSelecionado}
                onChange={(e) => setConvidadosSelecionado(e.target.value)}
              >
                <option value="">Convidados</option>
                <option value="academico">Alunos</option>
                <option value="pessoal">Professores</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="linha">
              <img src="/tag.svg" className="icon" />
              <select
                className="input-baixo"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Categoria</option>
                <option value="Evento Acadêmico">Evento Acadêmico</option>
                <option value="Evento Pessoal">Evento Pessoal</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <label className="notificacao">
              <img src="/notificacoes.svg" className="icon" />
              Lembrar Até
              <select
                className="lembrar"
                value={lembrar}
                onChange={(e) => setLembrar(e.target.value)}
              >
                <option value="10">10 minutos</option>
                <option value="60">1 hora</option>
                <option value="1440">1 dia</option>
                <option value="all">Todos</option>
              </select>
            </label>
          </div>

          <div className="coluna">
            <div className="linha">
              <img src="/comment.svg" className="icon-1" />
              <textarea
                className="descricao"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div className="botoes">
              <button
                className="btn-cancelar"
                onClick={handleCancel}
              >
                Cancelar
              </button>

              <PopupDescartarAlteracoes
                isOpen={showPopupDescartarAlteracoes}
                onClose={handleCloseDiscard}
                onConfirm={handleConfirmDiscard}
              />

              <button
                className="btn-confirmar"
                onClick={handleConfirm}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
