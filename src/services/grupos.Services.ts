import { use } from "react"
import { prisma } from "../database/index.js"

class GruposService {
    async createGrupos(userID: number, listaIDs: number[], nomeGrupo: string){
        const newGrupo = await prisma.grupo.create({
            data: {
                Nome_Grupo: nomeGrupo,
                id_Organizador: userID
            }
        })
    }

    async getGrupos(){}

    async editGrupos(){}

    async deleteGrupos(){}
}