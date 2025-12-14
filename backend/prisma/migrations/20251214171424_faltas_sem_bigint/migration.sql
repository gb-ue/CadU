/*
  Warnings:

  - You are about to alter the column `Num_Faltas` on the `Faltas` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Faltas" ALTER COLUMN "Num_Faltas" SET DATA TYPE INTEGER;
