import { prisma } from "../database/index.js";

class autenticarServices {

    async loginService(email : string, Senha : string){
        const user = await prisma.usuario.findFirst({
            where: { email, Senha }
        })

        if (!user) {
            return { error: "Senha ou Email incorretos" }
        }else{

           // if(user.usuarioAcademico)
        }

        

    }

}