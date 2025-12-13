import type { NextFunction, Request, Response } from "express"
import { eventoService } from "../services/eventos.Services.js"

export const createEvento = async (req: Request, res: Response) => {
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
            convidados
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
                convidados
            }
        );

        return res.status(201).json(newEvento)
    } 

    catch (error) {
        console.log(error)
        res.status(500).json({ error : "Algo deu errado. Tente Novamente mais tarde" })
    }
    
}

export const deleteEvento = async (req: Request, res: Response) => {
    try {
        const eventoID = Number(req.params.id)

        const eventoDeletado = await eventoService.deleteEvento(eventoID)

        return res.status(201).json(eventoDeletado)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error : "Algo deu errado. Tente Novamente mais tarde" })
    }
}

export const getEvento = async (req: Request, res: Response) => {
    try {
        const idOrganizador = Number(req.auth?.id)
        const Eventos = await eventoService.getEvento(idOrganizador)

        return res.status(200).json(Eventos)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error : "Algo deu errado. Tente Novamente mais tarde" })
    }
}

export const editarEvento = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const idEvento = Number(req.params.id)
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

        return res.status(200).json(updatedEvento)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error : "Algo deu errado. Tente Novamente mais tarde" })
    }


}

export const ocultarEventoUnico = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userID = Number(req.auth?.id)
        const eventoID = Number(req.query.id_Evento)

        const eventoOculto = eventoService.ocultarEvento(userID, eventoID)

        return res.status(201).json(eventoOculto)
    } catch (error) {
        next(error)
    }
}

export const ocultarEventosPorCAtegoria = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoria = String(req.query.categoria)
        const userID = Number(req.auth?.id)

        const eventosOcultados = eventoService.ocultarCategoria(categoria, userID)

        return res.status(201).json(eventosOcultados)
    } catch (error) {
        next(error)
    }
}

export const faltarEvento = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventoID = Number(req.query.id_Evento)
        const userID = Number(req.auth?.id)

        const resultadoDaFalta = eventoService.marcarFalta(eventoID, userID)

        return res.status(201).json(resultadoDaFalta)
    } catch (error) {
        next(error)
    }
}

export const getFaltasEvento = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const eventoID = Number(req.query.id_Evento)
        const userID = Number(req.auth?.id)
        
        const faltas = eventoService.getFaltas(eventoID, userID)

        return res.status(201).json(faltas)
    } catch (error) {
        next(error)
    }
}