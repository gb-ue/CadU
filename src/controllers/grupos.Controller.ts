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