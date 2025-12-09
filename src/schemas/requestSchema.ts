import z3, { z } from 'zod';

export const userRequestSqueme = z3.object({
    email: z.string(),
    Senha: z.string(),
    aluno: z.boolean().optional(),
    Modalidade: z.string().optional(),
    Curso:  z.string().optional()
})