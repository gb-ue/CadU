import type { Grupo } from "../../generated/prisma/index.js";
import { Role } from "../roles.ts";

declare global {
    namespace Express {
        interface Request {
            userId?: number
            userRole?: Role
        }
    }

    interface Evento {
        Nome_do_Evento: string
        Descricao: string
        Local: string
        Data_Horario_Inicio: Date
        Data_Horario_Fim: Date
        Data_Lembrete: Date
        Recorrente: boolean
        Tipo_Recorrencia: string
        Recorrencia_ate: Date
        grupos_convidados: number[]
        convidados: number[]
    }
}

export {}