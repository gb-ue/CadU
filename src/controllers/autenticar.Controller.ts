import type { NextFunction, Request, Response } from "express"
import  { userRequestSqueme } from "../schemas/requestSchema.js"


export const login = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const body = userRequestSqueme.parse(req.body)
        
    }catch (error) {
        next(error)
    }

    
}