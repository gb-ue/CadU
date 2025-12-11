'use client';

import { useState } from 'react';
import './style.css';

interface PopupDescartarAlteracoesProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function PopupDescartarAlteracoes({ isOpen, onClose, onConfirm }: PopupDescartarAlteracoesProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDiscard = async () => {
        setIsLoading(true);
        try {
            // Lógica para descartar alterações aqui se necessário
            onConfirm();
        } catch (error) {
            console.error('Erro ao descartar alterações', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="overlay-descartar" onClick={onClose}>
            <div className="popup-descartar" onClick={(e) => e.stopPropagation()}>
                <div className='rosa'><h2>Descartar alterações?</h2></div>
                <div className="botoes-descartar">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="btn-voltar"
                    >
                        Não
                    </button>
                    <button
                        onClick={handleDiscard}
                        disabled={isLoading}
                        className="btn-descartar"
                    >
                        {isLoading ? 'Descartando...' : 'Sim'}
                    </button>
                </div>
            </div>
        </div>
    );
}