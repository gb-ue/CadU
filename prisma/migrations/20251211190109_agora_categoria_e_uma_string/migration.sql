/*
  Warnings:

  - You are about to drop the column `id_categoria` on the `Evento` table. All the data in the column will be lost.
  - You are about to drop the `Categoria` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoria` to the `Evento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_id_categoria_fkey";

-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "id_categoria",
ADD COLUMN     "categoria" TEXT NOT NULL;

-- DropTable
DROP TABLE "Categoria";
