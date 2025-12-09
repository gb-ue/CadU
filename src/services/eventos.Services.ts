import { connect } from "node:http2"
import { prisma } from "../database/index.js"
import jwt from "jsonwebtoken"

class eventoService {
    async createEvento(userID: number, categoriaID: number, convidadosID_lista: number[], convidadosGrupo_lista: number[], evento: Evento){
        const newEvento = await prisma.evento.create({
            data:{
                Nome_do_Evento: evento.Nome_do_Evento,
                Descriçao: evento.Descricao,
                Data_Horario_Inicio: evento.Data_Horario_Inicio,
                Data_Horario_Fim: evento.Data_Horario_Fim,
                Local: evento.Local,
                Data_Lembrete: evento.Data_Lembrete,
                Tipo_Recorrencia: evento.Tipo_Recorrencia,
                Recorrente_ate: evento.Recorrencia_ate,
                Recorrente: evento.Recorrente,
                id_Organizador: userID,
                id_categoria: categoriaID
            }
        })
        return newEvento
    }
}