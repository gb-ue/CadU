import type { NextFunction, Request, Response } from "express"
import { gruposService } from "../services/grupos.Services.js"

export const createGrupo = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {
            Nome_Grupo,
            listaIDs
        } = req.body

        const userID = Number(req.auth?.id)

        const newGrupo = gruposService.createGrupos(userID, listaIDs || [], Nome_Grupo);

        res.status(201).json(newGrupo)
    } catch (error) {
        next(error)
    }
}

export const deleteGrupos = async(req: Request, res: Response, next: NextFunction) => {
    try {

        const grupoID = Number(req.query.id_Grupo)
        const grupoDeletado = gruposService.deleteGrupos(grupoID)
        res.status(201).json(grupoDeletado)

    } catch (error) {
        next(error)
    }
}

export const getGrupos = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const idOrganizador = Number(req.auth?.id)
        const grupos = gruposService.getGrupos(idOrganizador)
        res.status(201).json(grupos)
    } catch (error) {
        next(error)
    }
}

export const editGrupos = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const GrupoID = Number(req.query.id_Grupo)
        const idOrganizador = Number(req.auth?.id)
        const {
            Nome_Grupo
        } = req.body
        const editedGrupo = gruposService.editGrupos(GrupoID, {
            id_Grupo: GrupoID,
            Nome_Grupo: Nome_Grupo,
            id_Organizador: idOrganizador
        })
        res.status(201).json(editGrupos)
    } catch (error) {
        next(error)
    }
}