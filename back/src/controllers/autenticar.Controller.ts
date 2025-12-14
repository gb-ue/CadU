import type { NextFunction, Request, Response } from "express"
import  { userRequestSqueme } from "../schemas/requestSchema.js"
import { autenticarServices } from "../services/autenticar.Services.js"
import type { Role } from "../types/roles.js"



export const login = async (req: Request, res: Response) => {

    try{
        const {email, senha} = req.body;
        const user = await autenticarServices.loginService(email, senha)
        if (user.error) {
            res.status(400).json({error : user.error})
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
        res.status(500).json({ error : "Algo deu errado. Tente Novamente mais tarde" }) 
    }
}

export const cadastro = async (req: Request, res: Response) => {

    try{
        const body = userRequestSqueme.parse(req.body)
        const newUser = await autenticarServices.cadastroService(body.email, body.senha, body.role, body.nome, body.modalidade, body.curso)
        
        if (newUser.error){
            res.status(400).json( {error : newUser.error} )
        }else {
            res.status(201).json(newUser)
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error : "Algo deu errado. Tente Novamente mais tarde" }) //Mensagem de erro generico
    }
}