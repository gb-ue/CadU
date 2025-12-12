'use client';

import { useState } from 'react';
import './style.css';
import PopupDescartarAlteracoes from '../DescartarAlteracoes/page';

interface Evento {
   title: string;
   start: string;
   end: string;
   allDay: boolean;
   id: number;
}

interface PopupCriarEventoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (evento: Evento) => void;
}

export default function PopupCriarEvento({ isOpen, onClose, onSave }: PopupCriarEventoProps) {
  
  if (!isOpen) return null;

  // states separados mas mantendo a estrutura
  const [title, setTitle] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [allDay, setAllDay] = useState(false);

  const [categoria, setCategoria] = useState("");
  const [convidados, setConvidados] = useState("");
  const [descricao, setDescricao] = useState("");

  const [eventoRecorrente, setEventoRecorrente] = useState(false);
  const [repetir, setRepetir] = useState("");
  const [repetirAte, setRepetirAte] = useState("");
  const [lembrar, setLembrar] = useState("");
  const [showPopupDescartarAlteracoes, setShowPopupDescartarAlteracoes] = useState(false);

  const handleConfirm = () => {

    const novoEvento: Evento = {
      id: Date.now(),
      title,
      start: `${dataInicio}T${horaInicio}`,
      end: `${dataFim}T${horaFim}`,
      allDay,
    };

    onSave(novoEvento);
    onClose();
  };

  return (
    <div className='overlay' onClick={onClose}>
        <div className='popup' onClick={(e) => e.stopPropagation()}>
            <div className='rosa'></div>

            <input 
              className='titulo-popup'
              placeholder='Nome do Evento'
              value={title}
              id='titulo'
              onChange={(e)=>setTitle(e.target.value)}
            />

            <div className='lado'>
                <div className='coluna'>
                    <div className='data-hora'>
                        <img src='/data.svg' className='icon'/>
                        <label className='texto'>Data</label>
                        <input className='input' type="date" value={dataInicio} onChange={(e)=>setDataInicio(e.target.value)}/>
                        -
                        <input className='input-data' type="date" value={dataFim} onChange={(e)=>setDataFim(e.target.value)}/>
                    </div>
                    <div className='data-hora'>
                        <img src='/alarm.svg' className='icon'/>
                        <label className='texto'>Hora</label>
                        <input className='input' type="time" value={horaInicio} onChange={(e)=>setHoraInicio(e.target.value)}/>
                        -
                        <input className='input' type="time" value={horaFim} onChange={(e)=>setHoraFim(e.target.value)}/>
                    </div>
                </div>

                <div className='coluna'>
                    <div className='repetir-recorrente'>
                        <label className='texto-2'>
                        <input
                            className='input2 accent-[#C4838C]'
                            type="checkbox"
                            checked={eventoRecorrente}
                            onChange={(e) => setEventoRecorrente(e.target.checked)}
                        />
                        Evento Recorrente</label>
                        <select 
                          className='repetir'
                          value={repetir}
                          onChange={(e)=>setRepetir(e.target.value)}
                        >
                            <option value="Diariamente">Diariamente</option>
                            <option value="Semanalmente">Semanalmente</option>
                            <option value="Mensalmente">Mensalmente</option>
                            <option value="Anualmente">Anualmente</option>
                        </select>
                    </div>
                    <div className='repetir-recorrente'>
                        <label className='texto-2'><img src='/repetir.svg' className='icon'/>Repetir Até</label>
                        <select 
                          className='repetir'
                          value={repetirAte}
                          onChange={(e)=>setRepetirAte(e.target.value)}
                        >
                            <option value="">Sempre</option>
                            <option value="1 ano">Um Ano</option>
                            <option value="6 meses">Um Semestre</option>
                            <option value="1 mes">Um Mês</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='lado'>
                <div className='coluna'>
                    <div className='linha'>
                        <img src='/local.svg' className='icon'/>
                        <input className='input-baixo' placeholder='Local' />
                    </div>
                    <div className='linha'>
                        <img src='/convidados.svg' className='icon'/>
                        <select
                        className='input-baixo'
                        value={convidados}
                        onChange={(e)=>setConvidados(e.target.value)}
                        >
                        <option value="">Convidados</option>
                            <option value="academico">Alunos</option>
                            <option value="pessoal">Professores</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>
                    <div className='linha'>
                        <img src='/tag.svg' className='icon'/>
                        <select 
                        className='input-baixo'
                        value={categoria}
                        onChange={(e)=>setCategoria(e.target.value)}
                        >
                            <option value="">Categoria</option>
                            <option value="academico">Evento Acadêmico</option>
                            <option value="pessoal">Evento Pessoal</option>
                            <option value="outro">Outro</option>
                        </select>
                    </div>

                    <label className='notificacao'>
                        <img src='/notificacoes.svg' className='icon'/>
                        Lembrar Até
                        <select 
                          className='lembrar'
                          value={lembrar}
                          onChange={(e)=>setLembrar(e.target.value)}
                        >
                            <option value="10">10 minutos</option>
                            <option value="60">1 hora</option>
                            <option value="1440">1 dia</option>
                            <option value="all">Todos</option>
                        </select>
                    </label>
                </div>
                <div className='coluna'>
                    <div className='linha'>
                        <img src='/comment.svg' className='icon-1'/>
                        <textarea 
                            className='descricao'
                            placeholder='Descrição'
                            value={descricao}
                            onChange={(e)=>setDescricao(e.target.value)}
                        />
                    </div>
                    <div className='botoes'>
                        <button className='btn-cancelar' onClick={() => setShowPopupDescartarAlteracoes(true)}>Cancelar</button>
                        <PopupDescartarAlteracoes 
                            isOpen={showPopupDescartarAlteracoes}
                            onClose={() => setShowPopupDescartarAlteracoes(false)}
                            onConfirm={onClose}
                        />
                        <button className='btn-confirmar' onClick={handleConfirm}>Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>  
  );
}
