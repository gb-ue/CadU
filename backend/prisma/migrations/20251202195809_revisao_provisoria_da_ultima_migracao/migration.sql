/*
  Warnings:

  - The primary key for the `Convidado` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_Evento` on the `Convidado` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `id_Usuario_Academico` on the `Convidado` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Faltas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id_Convidado` on the `Faltas` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Changed the type of `id_Grupos_Convidados` on the `Evento` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_id_Organizador_fkey";

-- AlterTable
ALTER TABLE "Convidado" DROP CONSTRAINT "Convidado_pkey",
ALTER COLUMN "id_Evento" SET DATA TYPE INTEGER,
ALTER COLUMN "id_Usuario_Academico" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Convidado_pkey" PRIMARY KEY ("id_Evento", "id_Usuario_Academico");

-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "id_Grupos_Convidados",
ADD COLUMN     "id_Grupos_Convidados" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Faltas" DROP CONSTRAINT "Faltas_pkey",
ALTER COLUMN "id_Convidado" SET DATA TYPE INTEGER,
ADD CONSTRAINT "Faltas_pkey" PRIMARY KEY ("id_Convidado", "id_Evento");

-- AddForeignKey
ALTER TABLE "Convidado" ADD CONSTRAINT "Convidado_id_Evento_fkey" FOREIGN KEY ("id_Evento") REFERENCES "Evento"("id_Evento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Convidado" ADD CONSTRAINT "Convidado_id_Usuario_Academico_fkey" FOREIGN KEY ("id_Usuario_Academico") REFERENCES "Usuario_Academico"("id_Usuario_Academico") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_id_Organizador_fkey" FOREIGN KEY ("id_Organizador") REFERENCES "Usuario"("id_Usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_id_Grupos_Convidados_fkey" FOREIGN KEY ("id_Grupos_Convidados") REFERENCES "Grupo"("id_Grupo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faltas" ADD CONSTRAINT "Faltas_id_Convidado_fkey" FOREIGN KEY ("id_Convidado") REFERENCES "Usuario_Academico"("id_Usuario_Academico") ON DELETE RESTRICT ON UPDATE CASCADE;
