import { prisma } from "../database/index.js"

class EventoService {
    async createEvento(userID: number, categoria: string, convidadosID_lista: number[], convidadosGrupo_lista: number[], evento: Evento){
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
                categoria: categoria
            }
        })
        const organizadorAcademico = await prisma.usuario_Academico.findUnique({
            where: {id_Usuario_Academico: userID}
        })
        
        const listas_usuarios = await Promise.all(convidadosGrupo_lista.map((id_Grupo) => {
            return prisma.lista_Usuarios.findMany({
                where: {id_Grupo}
            })
        }))

        const idsConvidados = new Set<number>()

        convidadosID_lista.forEach(id => idsConvidados.add(id))
        listas_usuarios.flat().forEach(u => idsConvidados.add(u.id_Usuario_Academico))

        if (organizadorAcademico) {
            idsConvidados.add(userID)
        }

        await Promise.all(
            Array.from(idsConvidados).map(id =>
            prisma.convidado.create({
                data: {
                id_Evento: newEvento.id_Evento,
                id_Usuario_Academico: id
                }
            })
            )
        )
        return newEvento
    }

    async deleteEvento(id_Evento: number){
        return await prisma.evento.delete({
            where: {id_Evento}
        })
    }

    async editarEvento(id_Evento:number, evento: Evento){
        return await prisma.evento.update({
            where: {id_Evento},
            data: {
                Nome_do_Evento: evento.Nome_do_Evento,
                Descriçao: evento.Descricao,
                Local: evento.Local,
                Data_Horario_Inicio: evento.Data_Horario_Inicio,
                Data_Horario_Fim: evento.Data_Horario_Fim,
                Recorrente_ate: evento.Recorrencia_ate,
                Data_Lembrete: evento.Data_Lembrete
            }
        })
    }

    async getEvento(userID: number){
        return await prisma.convidado.findMany({
            where: {id_Usuario_Academico: userID, evento_visualizavel: true},
            distinct: ['id_Evento'],
            include: {
                evento: true
            }
        })
    }

    async getEventoAdmin(id_Organizador: number){
        return await prisma.evento.findMany({
            where:{id_Organizador}
        })
    }

    //ocultar por categoria: fazer uma busca de todos os eventos daquela categoria que o usuário pertence. inverter o atributo de visivel
    async ocultarCategoria(categoria: string, id_Usuario_Academico: number){
        const eventos = await prisma.convidado.findMany({
            where: { 
                id_Usuario_Academico, 
                evento: {categoria} 
            }, select: {
                evento_visualizavel: true
            }
        })

        if (eventos.length === 0) return {message: "Nenhum evento encontrado para essa categoria."}

        const temEventosVisiveis = eventos.some(e => e.evento_visualizavel)

        const visibilidade = !temEventosVisiveis;

        await prisma.convidado.updateMany({
            where:{
                id_Usuario_Academico, 
                evento:{
                    categoria
                }
            },
            data:{ 
                evento_visualizavel: visibilidade
            }
        })
        return {categoria, evento_visualizavel: visibilidade}

    }

    //ocultar evento unico: mesma coisa só que evento único
    async ocultarEvento(id_Evento: number, id_Usuario_Academico: number){
        const instanciaEvento = await prisma.convidado.findFirst({
            where: {id_Evento, id_Usuario_Academico}
        })

        if (!instanciaEvento){
            throw new Error("Evento não associado ao usuário")
        }

        return await prisma.convidado.update({
            where: {
                id_Evento_id_Usuario_Academico: {
                    id_Evento, id_Usuario_Academico
                }
            },
            data: {
                evento_visualizavel: !instanciaEvento.evento_visualizavel
            }
        })
    }

    //faltar: atualiza faltas de um evento especifico em 1
    async marcarFalta(id_Evento: number, id_Usuario_Academico: number){
        return await prisma.faltas.update({
            where:{id_Convidado_id_Evento: {
                id_Evento: id_Evento, id_Convidado: id_Usuario_Academico 
            }},
            data: {
                Num_Faltas: {increment: 1}
            }
        })
    }

    //ver faltas: só dá get nisso
    async getFaltas(id_Evento: number, id_Usuario_Academico: number){
        return await prisma.faltas.findFirst({
            where: {id_Convidado: id_Usuario_Academico, id_Evento}
        })
    }

    //mudar faltas?????
    
}

export const eventoService = new EventoService()