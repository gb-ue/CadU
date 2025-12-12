-- DropForeignKey
ALTER TABLE "Convidado" DROP CONSTRAINT "Convidado_id_Evento_fkey";

-- DropForeignKey
ALTER TABLE "Faltas" DROP CONSTRAINT "Faltas_id_Evento_fkey";

-- DropForeignKey
ALTER TABLE "Lista_Usuarios" DROP CONSTRAINT "Lista_Usuarios_id_Grupo_fkey";

-- AddForeignKey
ALTER TABLE "Convidado" ADD CONSTRAINT "Convidado_id_Evento_fkey" FOREIGN KEY ("id_Evento") REFERENCES "Evento"("id_Evento") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faltas" ADD CONSTRAINT "Faltas_id_Evento_fkey" FOREIGN KEY ("id_Evento") REFERENCES "Evento"("id_Evento") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lista_Usuarios" ADD CONSTRAINT "Lista_Usuarios_id_Grupo_fkey" FOREIGN KEY ("id_Grupo") REFERENCES "Grupo"("id_Grupo") ON DELETE CASCADE ON UPDATE CASCADE;
