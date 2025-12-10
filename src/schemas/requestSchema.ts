import z3, { z } from 'zod';
import type { Role } from "../types/roles.js";

export const RoleSchema = z.enum(["Aluno", "Professor", "Coordenador", "Administrador"]);

export const userRequestSqueme = z3.object({
    email: z.string(),
    senha: z.string(),
    nome: z.string(),
    role : RoleSchema,
    modalidade: z.string().optional(),
    curso:  z.string().optional()
})