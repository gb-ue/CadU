import z3, { z } from 'zod';
import type { Role } from "../types/roles.js";

export const RoleSchema = z.enum(["Aluno", "Professor", "Coordenador", "Administrador"]);

export const userRequestSqueme = z3.object({
    email: z.string(),
    Senha: z.string(),
    role : RoleSchema.optional,
    Modalidade: z.string().optional(),
    Curso:  z.string().optional()
})