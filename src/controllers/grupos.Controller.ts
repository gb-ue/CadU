import type { NextFunction, Request, Response } from "express"
import { gruposService } from "../services/grupos.Services.js"

export const createGrupo = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {
            Nome_Grupo,
            listaIDs
        } = req.body

        const userID = Number(req.auth?.id)

        const newGrupo = await gruposService.createGrupos(userID, listaIDs || [], Nome_Grupo);

        return res.status(201).json(newGrupo)
    } catch (error) {
        next(error)
    }
}

export const deleteGrupos = async(req: Request, res: Response, next: NextFunction) => {
    try {

        const grupoID = Number(req.query.id_Grupo)
        const grupoDeletado = gruposService.deleteGrupos(grupoID)
        return res.status(201).json(grupoDeletado)

    } catch (error) {
        next(error)
    }
}

export const getGrupos = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const idOrganizador = Number(req.auth?.id)
        const grupos = await gruposService.getGrupos(idOrganizador)
        return res.status(201).json(grupos)
    } catch (error) {
        next(error)
    }
}

export const editGrupos = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const GrupoID = Number(req.params.id)
        const idOrganizador = Number(req.auth?.id)
        const {
            Nome_Grupo
        } = req.body
        const editedGrupo = await gruposService.editGrupos(GrupoID, {
            id_Grupo: GrupoID,
            Nome_Grupo: Nome_Grupo,
            id_Organizador: idOrganizador
        })
        return res.status(201).json(editedGrupo)
    } catch (error) {
        next(error)
    }
}

export const adicionarMembroGrupo = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const grupoID = Number(req.params.id)
        const  {
            email
        } = req.body
        //const email = String(req.query.email)

        const membroAdicionado = await gruposService.adicionarMembro(grupoID, email)

        return res.status(201).json(membroAdicionado)
    } catch (error) {
        next(error)
    }
}

export const deleteMembroGrupo = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const grupoID = Number(req.query.id_Grupo)
        const email = String(req.query.email)

        const membroDeletado = await gruposService.deleteMembro(grupoID, email)

        return res.status(201).json(membroDeletado)
    } catch (error) {
        next(error)
    }
}