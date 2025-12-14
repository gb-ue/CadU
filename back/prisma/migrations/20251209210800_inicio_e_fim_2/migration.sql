/*
  Warnings:

  - You are about to drop the column `Data_Horario` on the `Evento` table. All the data in the column will be lost.
  - Added the required column `Data_Horario_Fim` to the `Evento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Data_Horario_Inicio` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "Data_Horario",
ADD COLUMN     "Data_Horario_Fim" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Data_Horario_Inicio" TIMESTAMP(3) NOT NULL;
