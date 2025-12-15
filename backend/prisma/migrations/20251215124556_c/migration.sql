/*
  Warnings:

  - You are about to drop the column `Descriçao` on the `Evento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "Descriçao",
ADD COLUMN     "Descricao" VARCHAR(255) NOT NULL DEFAULT '';
