import { prisma } from "../database/index.js"
import type { Categoria } from "../generated/prisma/index.js"

class CategoriasService {
    async getCategorias(){
        return await prisma.categoria.findMany()
    }

    async editCategoria(id_categoria:number, categoria: Categoria){
        return await prisma.categoria.update({
            where:{id_categoria},
            data: {
                Oculto: categoria.Oculto
            }
        })
    }
}