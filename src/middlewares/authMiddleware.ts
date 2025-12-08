import { expressjwt } from "express-jwt";
import dotenv from "dotenv"

dotenv.config()

export const authMiddleware = expressjwt({
    secret: process.env.ACCESS_TOKEN_SECRET as string,
    algorithms: ["HS256"],
    requestProperty: "auth"
})