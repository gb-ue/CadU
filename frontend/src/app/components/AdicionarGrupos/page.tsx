'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import './style.css';

interface Grupo {
  id_Grupo: number;
  Nome_Grupo: string;
  emails?: string[];
}

interface PopupAdicionarGruposProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  grupo?: Grupo;
}

export default function PopupAdicionarGrupos({ isOpen, onClose, onConfirm, grupo }: PopupAdicionarGruposProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [emails, setEmails] = useState<string[]>([]);
    const [emailError, setEmailError] = useState(false);
    const [nomeGrupo, setNomeGrupo] = useState('');
    const [emailsOriginais, setEmailsOriginais] = useState<string[]>([]);


    useEffect(() => {
  if (grupo) {
    setNomeGrupo(grupo.Nome_Grupo);
    setEmails(grupo.emails);
    setEmailsOriginais(grupo.emails);
  } else {
    resetForm();
  }
}, [grupo, isOpen]);


    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleAddEmail = () => {
        if (!isValidEmail(email)) {
            setEmailError(true);
            return;
    }

    if (emails.includes(email)) {
        setEmail('');
        return;
    }

    setEmails([...emails, email]);
    setEmail('');
    setEmailError(false);
    };

    const resetForm = () => {
        setNomeGrupo('');
        setEmail('');
        setEmails([]);
        setEmailError(false);
        setIsLoading(false);
    };

    const getToken = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('token') || '';
        }
        return '';
    };


    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleConfirm = async () => {
  if (!nomeGrupo) {
    alert('Informe o nome do grupo');
    return;
  }

  if (emails.length === 0) {
    alert('Adicione pelo menos um email');
    return;
  }

  setIsLoading(true);
  const authToken = getToken();

  try {
    let idGrupo = grupo?.id_Grupo;

    // 🔹 CRIAR GRUPO
    if (!grupo) {
      const response = await fetch('http://localhost:8080/usuario/grupos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          Nome_Grupo: nomeGrupo,
        }),
      });

      if (!response.ok) throw new Error('Erro ao criar grupo');

      const data = await response.json();
      idGrupo = data.id_Grupo;
    }

    // 🔹 EDITAR NOME DO GRUPO
    if (grupo) {
      const response = await fetch(
        `http://localhost:8080/usuario/grupos/${idGrupo}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            Nome_Grupo: nomeGrupo,
          }),
        }
      );

      if (!response.ok) throw new Error('Erro ao editar grupo');
    }

    // 🔹 ADICIONAR MEMBROS
    const novosEmails = grupo
  ? emails.filter(email => !emailsOriginais.includes(email))
  : emails;

// 🔹 ADICIONAR MEMBROS
for (const email of novosEmails) {
      await fetch(
        `http://localhost:8080/usuario/grupos/${idGrupo}/convidados/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ email }),
        }
      );
    }

    alert(grupo ? 'Grupo editado com sucesso!' : 'Grupo criado com sucesso!');
    onConfirm();
    handleClose();
  } catch (error) {
    console.error(error);
    alert('Erro ao salvar grupo');
  } finally {
    setIsLoading(false);
  }
};




    if (!isOpen) return null;

    return (
        <div className="overlay-add" onClick={handleClose}>
            <div className="popup-add" onClick={(e) => e.stopPropagation()}>
                <div className='rosa'><h2>{grupo ? 'Editar Grupo' : 'Adicionar Grupo'}</h2></div>
                <input
                    className="input-nome"
                    type="text"
                    placeholder="Nome do Grupo"
                    value={nomeGrupo}
                    onChange={(e) => setNomeGrupo(e.target.value)}
                />
                <div className="input-email-wrapper">
                <input
                    className="input-email"
                    type="text"
                    placeholder="Adicionar Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                    <button
                        type="button"
                        className="check-button"
                        onClick={handleAddEmail}
                    >
                        <img src="/Check.svg" alt="Adicionar email" />
                    </button>
                </div>
                <div className="email-list">
                    {emails.map((item, index) => (
                        <div key={index} className="email-item">
                            <span>{item}</span>
                            <button
                                type="button"
                                onClick={() =>
                                setEmails(emails.filter((_, i) => i !== index))
                                }
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <div className="botoes-add">
                    <button
                        onClick={handleClose}
                        disabled={isLoading}
                        className="btn-cancel"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={isLoading}
                        className="btn-confirm"
                    >
                        {isLoading
                        ? 'Salvando...'
                        : grupo
                        ? 'Salvar alterações'
                        : 'Confirmar'}
                    </button>
                </div>
            </div>
        </div>
    );
}