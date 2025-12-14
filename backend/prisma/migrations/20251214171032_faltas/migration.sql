-- DropForeignKey
ALTER TABLE "Faltas" DROP CONSTRAINT "Faltas_id_Evento_fkey";

-- DropIndex
DROP INDEX "Faltas_id_Evento_key";

-- AddForeignKey
ALTER TABLE "Faltas" ADD CONSTRAINT "Faltas_id_Evento_fkey" FOREIGN KEY ("id_Evento") REFERENCES "Evento"("id_Evento") ON DELETE RESTRICT ON UPDATE CASCADE;
