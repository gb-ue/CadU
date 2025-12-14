import { use } from "react"
import { prisma } from "../database/index.js"
import type { Grupo, Usuario_Academico } from "../generated/prisma/index.js"
//import { disconnect } from "process"

class GruposService {
    async createGrupos(userID: number, listaIDs: number[], nomeGrupo: string){
        const newGrupo = await prisma.grupo.create({
            data: {
                Nome_Grupo: nomeGrupo,
                id_Organizador: userID
            }
        })

        listaIDs.push(userID)

        const newListaUsuarios = await Promise.all(listaIDs.map((id_membro) => {
            return prisma.lista_Usuarios.create({
                data:{
                    id_Grupo: newGrupo.id_Grupo,
                    id_Usuario_Academico: id_membro
                }
            })
        }))
        return newGrupo
    }

    async getGrupos(id_Organizador: number){
        const test = await prisma.grupo.findMany({
            where: {id_Organizador : id_Organizador}
        }) 
        console.log(test)
        return test
    }

    async editGrupos(id_Grupo: number, grupo: Grupo){
        return await prisma.grupo.update({
            where:{id_Grupo},
            data:{
                Nome_Grupo: grupo.Nome_Grupo
            }
        })
    }

    async deleteGrupos(id_Grupo: number){
        return await prisma.grupo.delete({
            where:{id_Grupo}
        })
    }

    async adicionarMembro(id_Grupo: number, email: string) {
        const newUsuario = await prisma.usuario.findFirst({
            where:{email}
        })
        if (newUsuario) {
            const newMembro = await prisma.usuario_Academico.findFirst({
                where:{id_Usuario_Academico: newUsuario.id_Usuario}
            })
            if (newMembro) {
                const newListaUsuarios = await prisma.lista_Usuarios.create({
                    data: {
                        id_Grupo: id_Grupo,
                        id_Usuario_Academico: newMembro.id_Usuario_Academico
                    }
                })
                return newListaUsuarios
            }
            else return null
        }
        else return null
    }

    async deleteMembro(id_Grupo: number, email: string){
        const usuario = await prisma.usuario.findFirst({
            where:{email: email}
        })
        console.log(email)
        console.log(usuario)
        if (usuario) {
            const membro = await prisma.usuario_Academico.findFirst({
                where:{id_Usuario_Academico: usuario.id_Usuario}
            })
            console.log(membro)
            if (membro) {

                const grupo = await prisma.lista_Usuarios.findFirst({
                    where:{id_Usuario_Academico: membro.id_Usuario_Academico, id_Grupo: id_Grupo},
                })
                if(grupo){
                    await prisma.lista_Usuarios.delete({
                    where:{id : grupo.id, id_Usuario_Academico: grupo.id_Usuario_Academico},
                })
                }
                return
            }
            else return 1
        }
        else return 2
    }

}

export const gruposService = new GruposService()