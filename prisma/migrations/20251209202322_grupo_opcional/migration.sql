-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_id_Grupos_Convidados_fkey";

-- AlterTable
ALTER TABLE "Evento" ALTER COLUMN "id_Grupos_Convidados" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_id_Grupos_Convidados_fkey" FOREIGN KEY ("id_Grupos_Convidados") REFERENCES "Grupo"("id_Grupo") ON DELETE SET NULL ON UPDATE CASCADE;
