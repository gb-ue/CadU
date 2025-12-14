/*
  Warnings:

  - You are about to drop the column `Oculto` on the `Evento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Convidado" ADD COLUMN     "evento_visualizavel" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "Oculto";
