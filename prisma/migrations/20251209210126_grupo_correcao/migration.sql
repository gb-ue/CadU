/*
  Warnings:

  - You are about to drop the column `id_Grupos_Convidados` on the `Evento` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_id_Grupos_Convidados_fkey";

-- AlterTable
ALTER TABLE "Evento" DROP COLUMN "id_Grupos_Convidados";

-- CreateTable
CREATE TABLE "_EventoToGrupo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EventoToGrupo_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EventoToGrupo_B_index" ON "_EventoToGrupo"("B");

-- AddForeignKey
ALTER TABLE "_EventoToGrupo" ADD CONSTRAINT "_EventoToGrupo_A_fkey" FOREIGN KEY ("A") REFERENCES "Evento"("id_Evento") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventoToGrupo" ADD CONSTRAINT "_EventoToGrupo_B_fkey" FOREIGN KEY ("B") REFERENCES "Grupo"("id_Grupo") ON DELETE CASCADE ON UPDATE CASCADE;
