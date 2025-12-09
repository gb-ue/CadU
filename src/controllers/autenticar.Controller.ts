import type { NextFunction, Request, Response } from "express"
import  { userRequestSqueme } from "../schemas/requestSchema.js"
import { autenticarServices } from "../services/autenticar.Services.js"



export const login = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const {email, Senha} = req.body
        //const body = userRequestSqueme.parse(req.body)
        
        const user = await autenticarServices.loginService(email, Senha)
        if (user.error) {
            res.status(500).json({error : user.error})

        }else{
            return{
                id: user.id,  
            }

        }


        
    }catch (error) {
        console.log(error)
        next(error)
    }

    
}