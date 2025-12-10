import type { NextFunction, Request, Response } from "express"
import  { userRequestSqueme } from "../schemas/requestSchema.js"
import { autenticarServices } from "../services/autenticar.Services.js"
import type { Role } from "../types/roles.js"



export const login = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const {email, Senha} = req.body;
        const user = await autenticarServices.loginService(email, Senha)

        if (user.error) {
            res.status(500).json({error : user.error})
        }else{
            const accesstoken = await autenticarServices.createAccessToken(user.id as number, user.role as Role)
            return{
                id: user.id,
                role : user.role,
                accesstoken  
            }
        }

    }catch (error) {
        console.log(error)
        next(error)
    }
}

export const cadastro = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const body = userRequestSqueme.parse(req.body)
        const newUser = await autenticarServices.cadastroService(body.email, body.senha, body.role, body.nome, body.Modalidade, body.Curso)
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        next(error)
    }
}