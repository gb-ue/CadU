import type { NextFunction, Request, Response } from "express"
import  { userRequestSqueme } from "../schemas/requestSchema.js"
import { autenticarServices } from "../services/autenticar.Services.js"
import type { Role } from "../types/roles.js"



export const login = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const {email, senha} = req.body;
        const user = await autenticarServices.loginService(email, senha)
        if (user.error) {
            res.status(500).json({error : user.error})
        }else{
            const accesstoken = autenticarServices.createAccessToken(user.id as number, user.role as Role)
            res.status(200).json({
                id: user.id,
                role : user.role,
                accesstoken 
            })
        }

    }catch (error) {
        console.log(error)
        next(error)
    }
}

export const cadastro = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const body = userRequestSqueme.parse(req.body)
        const newUser = await autenticarServices.cadastroService(body.email, body.senha, body.role, body.nome, body.modalidade, body.curso)
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500)
        console.log(error)
        next(error)
    }
}