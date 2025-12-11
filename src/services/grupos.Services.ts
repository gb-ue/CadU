import { use } from "react"
import { prisma } from "../database/index.js"
import type { Grupo } from "../generated/prisma/index.js"

class GruposService {
    async createGrupos(userID: number, listaIDs: number[], nomeGrupo: string){
        const newGrupo = await prisma.grupo.create({
            data: {
                Nome_Grupo: nomeGrupo,
                id_Organizador: userID
            }
        })
    }

    async getGrupos(id_Organizador: number){
        return await prisma.grupo.findMany({
            where: {id_Organizador}
        }) 
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
}