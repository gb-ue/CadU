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
        const convidados = await Promise.all(convidadosID_lista.map((id_convidado) => {
            return prisma.convidado.create({
                data: {
                    id_Evento: newEvento.id_Evento,
                    id_Usuario_Academico: id_convidado
                }
            })
        }))
        const listas_usuarios = await Promise.all(convidadosGrupo_lista.map((id_Grupo) => {
            return prisma.lista_Usuarios.findMany({
                where: {id_Grupo}
            })
        }))
        const flat = listas_usuarios.flat()
        const convidados_grupos = await Promise.all(flat.map((usuario) =>{
            return prisma.convidado.create({
                data: {
                    id_Evento: newEvento.id_Evento,
                    id_Usuario_Academico: usuario.id_Usuario_Academico
                }
            })
        }))
        return newEvento
    }
}