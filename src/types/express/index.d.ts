import { Role } from "../roles.ts";

declare global {
    namespace Express {
        interface Request {
            userId?: number
            userRole?: Role
        }
    }
}

export {}