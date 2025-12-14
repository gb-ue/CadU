/*
  Warnings:

  - The primary key for the `Lista_Usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Lista_Usuarios" DROP CONSTRAINT "Lista_Usuarios_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Lista_Usuarios_pkey" PRIMARY KEY ("id");
