/*
  Warnings:

  - The primary key for the `Lista_Usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "Lista_Usuarios_id_Usuario_Academico_key";

-- AlterTable
ALTER TABLE "Lista_Usuarios" DROP CONSTRAINT "Lista_Usuarios_pkey",
ADD CONSTRAINT "Lista_Usuarios_pkey" PRIMARY KEY ("id_Usuario_Academico");
