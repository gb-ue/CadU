/*
  Warnings:

  - You are about to alter the column `Modalidade` on the `Aluno` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `Curso` on the `Aluno` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `Nome` on the `Categoria` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `id_Organizador` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `id_categoria` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The `id_Grupos_Convidados` column on the `Evento` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `Nome_do_Evento` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `Descriçao` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `Local` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `Tipo_Recorrencia` on the `Evento` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The primary key for the `Faltas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_Evento` on the `Faltas` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `Nome_Grupo` on the `Grupo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `id_Organizador` on the `Grupo` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Lista_Usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_Grupo` on the `Lista_Usuarios` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `id_Usuario_Academico` on the `Lista_Usuarios` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `E-mail` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `Senha` on the `Usuario` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `Nome` on the `Usuario_Academico` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[id_Evento]` on the table `Faltas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_Usuario_Academico]` on the table `Lista_Usuarios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[E-mail]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Made the column `Modalidade` on table `Aluno` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Curso` on table `Aluno` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Nome` on table `Categoria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_Organizador` on table `Evento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_categoria` on table `Evento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Nome_do_Evento` on table `Evento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Descriçao` on table `Evento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Local` on table `Evento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Data_Horario` on table `Evento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Data_Lembrete` on table `Evento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Oculto` on table `Evento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Recorrente` on table `Evento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Tipo_Recorrencia` on table `Evento` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Num_Faltas` on table `Faltas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Nome_Grupo` on table `Grupo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `id_Organizador` on table `Grupo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `E-mail` on table `Usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Senha` on table `Usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Nome` on table `Usuario_Academico` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Aluno" ALTER COLUMN "Modalidade" SET NOT NULL,
ALTER COLUMN "Modalidade" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "Curso" SET NOT NULL,
ALTER COLUMN "Curso" SET DATA TYPE VARCHAR(255);

-- AlterTable
CREATE SEQUENCE categoria_id_categoria_seq;
ALTER TABLE "Categoria" ALTER COLUMN "id_categoria" SET DEFAULT nextval('categoria_id_categoria_seq'),
ALTER COLUMN "Nome" SET NOT NULL,
ALTER COLUMN "Nome" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "Oculto" SET DEFAULT false;
ALTER SEQUENCE categoria_id_categoria_seq OWNED BY "Categoria"."id_categoria";

-- AlterTable
CREATE SEQUENCE evento_id_evento_seq;
ALTER TABLE "Evento" ALTER COLUMN "id_Evento" SET DEFAULT nextval('evento_id_evento_seq'),
ALTER COLUMN "id_Organizador" SET NOT NULL,
ALTER COLUMN "id_Organizador" SET DATA TYPE INTEGER,
ALTER COLUMN "id_categoria" SET NOT NULL,
ALTER COLUMN "id_categoria" SET DATA TYPE INTEGER,
DROP COLUMN "id_Grupos_Convidados",
ADD COLUMN     "id_Grupos_Convidados" BIGINT[],
ALTER COLUMN "Nome_do_Evento" SET NOT NULL,
ALTER COLUMN "Nome_do_Evento" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "Descriçao" SET NOT NULL,
ALTER COLUMN "Descriçao" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "Local" SET NOT NULL,
ALTER COLUMN "Local" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "Data_Horario" SET NOT NULL,
ALTER COLUMN "Data_Lembrete" SET NOT NULL,
ALTER COLUMN "Oculto" SET NOT NULL,
ALTER COLUMN "Oculto" SET DEFAULT false,
ALTER COLUMN "Recorrente" SET NOT NULL,
ALTER COLUMN "Recorrente" SET DEFAULT false,
ALTER COLUMN "Tipo_Recorrencia" SET NOT NULL,
ALTER COLUMN "Tipo_Recorrencia" SET DATA TYPE VARCHAR(255);
ALTER SEQUENCE evento_id_evento_seq OWNED BY "Evento"."id_Evento";

-- AlterTable
ALTER TABLE "Faltas" DROP CONSTRAINT "Faltas_pkey",
ALTER COLUMN "id_Evento" SET DATA TYPE INTEGER,
ALTER COLUMN "Num_Faltas" SET NOT NULL,
ADD CONSTRAINT "Faltas_pkey" PRIMARY KEY ("id_Convidado", "id_Evento");

-- AlterTable
CREATE SEQUENCE grupo_id_grupo_seq;
ALTER TABLE "Grupo" ALTER COLUMN "id_Grupo" SET DEFAULT nextval('grupo_id_grupo_seq'),
ALTER COLUMN "Nome_Grupo" SET NOT NULL,
ALTER COLUMN "Nome_Grupo" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "id_Organizador" SET NOT NULL,
ALTER COLUMN "id_Organizador" SET DATA TYPE INTEGER;
ALTER SEQUENCE grupo_id_grupo_seq OWNED BY "Grupo"."id_Grupo";

-- AlterTable
ALTER TABLE "Lista_Usuarios" DROP CONSTRAINT "Lista_Usuarios_pkey",
ALTER COLUMN "id_Grupo" SET DATA TYPE INTEGER,
ALTER COLUMN "id_Usuario_Academico" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Lista_Usuarios_pkey" PRIMARY KEY ("id_Grupo", "id_Usuario_Academico");

-- AlterTable
CREATE SEQUENCE usuario_id_usuario_seq;
ALTER TABLE "Usuario" ALTER COLUMN "id_Usuario" SET DEFAULT nextval('usuario_id_usuario_seq'),
ALTER COLUMN "E-mail" SET NOT NULL,
ALTER COLUMN "E-mail" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "Senha" SET NOT NULL,
ALTER COLUMN "Senha" SET DATA TYPE VARCHAR(255);
ALTER SEQUENCE usuario_id_usuario_seq OWNED BY "Usuario"."id_Usuario";

-- AlterTable
ALTER TABLE "Usuario_Academico" ALTER COLUMN "Nome" SET NOT NULL,
ALTER COLUMN "Nome" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Faltas_id_Evento_key" ON "Faltas"("id_Evento");

-- CreateIndex
CREATE UNIQUE INDEX "Lista_Usuarios_id_Usuario_Academico_key" ON "Lista_Usuarios"("id_Usuario_Academico");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_E-mail_key" ON "Usuario"("E-mail");

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_id_Aluno_fkey" FOREIGN KEY ("id_Aluno") REFERENCES "Usuario_Academico"("id_Usuario_Academico") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_id_Organizador_fkey" FOREIGN KEY ("id_Organizador") REFERENCES "Usuario_Academico"("id_Usuario_Academico") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faltas" ADD CONSTRAINT "Faltas_id_Evento_fkey" FOREIGN KEY ("id_Evento") REFERENCES "Evento"("id_Evento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grupo" ADD CONSTRAINT "Grupo_id_Organizador_fkey" FOREIGN KEY ("id_Organizador") REFERENCES "Usuario"("id_Usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lista_Usuarios" ADD CONSTRAINT "Lista_Usuarios_id_Usuario_Academico_fkey" FOREIGN KEY ("id_Usuario_Academico") REFERENCES "Usuario_Academico"("id_Usuario_Academico") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lista_Usuarios" ADD CONSTRAINT "Lista_Usuarios_id_Grupo_fkey" FOREIGN KEY ("id_Grupo") REFERENCES "Grupo"("id_Grupo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario_Academico" ADD CONSTRAINT "Usuario_Academico_id_Usuario_Academico_fkey" FOREIGN KEY ("id_Usuario_Academico") REFERENCES "Usuario"("id_Usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario_Administrador" ADD CONSTRAINT "Usuario_Administrador_id_Admin_fkey" FOREIGN KEY ("id_Admin") REFERENCES "Usuario"("id_Usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
