import type { NextFunction, Request, Response } from "express"
import  { userRequestSqueme } from "../schemas/requestSchema.js"
import { eventoService } from "../services/eventos.Services.js"

export const createEvento = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const {
            Nome_do_Evento,
            Descricao,
            Local,
            Data_Horario_Inicio,
            Data_Horario_Fim,
            Data_Lembrete,
            Recorrente,
            Tipo_Recorrencia,
            Recorrencia_ate,
            grupos_convidados,
            convidados,
        } = req.body

        const userID = Number(req.auth?.id)
        const categoria = String(req.query.id_categoria)
        
        const newEvento = await eventoService.createEvento(
            userID, 
            categoria,
            convidados || [],
            grupos_convidados ||[],
            {
                Nome_do_Evento,
                Descricao,
                Local,
                Data_Horario_Inicio: new Date(Data_Horario_Inicio),
                Data_Horario_Fim: new Date(Data_Horario_Fim),
                Data_Lembrete: new Date(Data_Lembrete),
                Recorrente,
                Tipo_Recorrencia,
                Recorrencia_ate: new Date(Recorrencia_ate),
                grupos_convidados,
                convidados,
            }
        );

        return res.status(201).json(newEvento)
    } 

    catch (error) {
        next(error)
    }
    
}

export const deleteEvento = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventoID = Number(req.query.id_Evento)

        const eventoDeletado = await eventoService.deleteEvento(eventoID)

        res.status(201).json(eventoDeletado)

    } catch (error) {
        next(error)
    }
}

export const getEvento = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idOrganizador = Number(req.auth?.id)
        const Eventos = await eventoService.getEvento(idOrganizador)

        res.status(201).json(Eventos)

    } catch (error) {
        next(error)
    }
}

export const editarEvento = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const idEvento = Number(req.query.id_Evento)
        const {
            Nome_do_Evento,
            Descricao,
            Local,
            Data_Horario_Inicio,
            Data_Horario_Fim,
            Data_Lembrete,
            Recorrente,
            Tipo_Recorrencia,
            Recorrencia_ate,
            grupos_convidados,
            convidados,
        } = req.body

        const updatedEvento = await eventoService.editarEvento(idEvento, {
            Nome_do_Evento,
            Descricao,
            Local,
            Data_Horario_Inicio,
            Data_Horario_Fim,
            Data_Lembrete,
            Recorrente,
            Tipo_Recorrencia,
            Recorrencia_ate,
            grupos_convidados,
            convidados,
        })

        res.status(201).json(updatedEvento)
    } catch (error) {
        next(error)
    }


}