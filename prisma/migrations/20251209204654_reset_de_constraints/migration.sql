/*
  Warnings:

  - You are about to drop the column `Data_Horario_Fim` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the column `Data_Horario_Inicio` on the `Evento` table. All the data in the column will be lost.
  - Added the required column `Data_Horario` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Made the column `id_Grupos_Convidados` on table `Evento` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_id_Grupos_Convidados_fkey";

-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "Data_Horario_Fim",
DROP COLUMN "Data_Horario_Inicio",
ADD COLUMN     "Data_Horario" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id_Grupos_Convidados" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_id_Grupos_Convidados_fkey" FOREIGN KEY ("id_Grupos_Convidados") REFERENCES "Grupo"("id_Grupo") ON DELETE RESTRICT ON UPDATE CASCADE;
