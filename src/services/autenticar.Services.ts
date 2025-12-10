import { use } from "react";
import { prisma } from "../database/index.js";
import type { Role } from "../types/roles.js";
import jwt from "jsonwebtoken";
import { id } from "zod/locales";

class AutenticarServices {

    async loginService(email : string, Senha : string){
        const user = await prisma.usuario.findFirst({
            where: { 
                email : email,
                Senha : Senha 
            },
            include: { 
                usuarioAcademico : true,
                usuarioAdministrador : true 
            }
        });

        if (!user) {
            return { error: "Senha ou Email incorretos" }
        }else{
            
            let role : Role;

            if(user.usuarioAcademico){
                
                const userAcademico = await prisma.usuario_Academico.findFirst({
                    where: {
                        id_Usuario_Academico : user.id_Usuario
                    },
                    include: {
                        aluno : true,
                    }
                });


                if (userAcademico?.aluno){
                    role = "Aluno";
                } else {
                    role = "Professor";
                }

                return  {
                    id : user.id_Usuario,
                    nome : userAcademico?.Nome,
                    email : user.email,
                    role : role
                }

            } else if(user.usuarioAdministrador){
                role = "Administrador"
            } else {
                role = "Coordenador"
            }

            return {
                id: user.id_Usuario,
                email: user.email,
                role: role
            }
        }
    }


    async cadastroService(email : string, Senha : string, role: Role, Nome : string, Modalidade : string | undefined, Curso: string | undefined){
        
        if (await prisma.usuario.findFirst({where : {email : email} })) {
            return { error : "Email já vinculado a uma conta"}
        }

        const newUser = await prisma.usuario.create({
            data: {
                email : email,
                Senha : Senha,
            }
        })


        const newAcademicUser = await prisma.usuario_Academico.create({
            data: {
                id_Usuario_Academico : newUser.id_Usuario,
                Nome : Nome,
            } 
        })

        if (role === "Aluno"){
            
            if (!Modalidade || !Curso){
            return { error : "Campos de Modalidade ou Curso Incompletos"}
            }

            const newStudent = await prisma.aluno.create({
                data: {
                    id_Aluno: newAcademicUser.id_Usuario_Academico,
                    Modalidade: Modalidade,
                    Curso: Curso
                }
            })
        
        }

        return {id: newUser.id_Usuario, email: newUser.email, name : newAcademicUser.Nome ,role: role}
    }

    createAccessToken(userId: number, role: Role){
        const token = jwt.sign(
            {
                id: userId,
                role: role
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );
        return token;
    }

}


export const autenticarServices = new AutenticarServices()