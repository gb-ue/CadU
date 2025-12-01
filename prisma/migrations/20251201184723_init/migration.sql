-- CreateTable
CREATE TABLE "Aluno" (
    "id_Aluno" INTEGER NOT NULL,
    "Modalidade" TEXT,
    "Curso" TEXT,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id_Aluno")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id_categoria" INTEGER NOT NULL,
    "Nome" TEXT,
    "Oculto" BOOLEAN NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "Convidado" (
    "id_Evento" BIGINT NOT NULL,
    "id_Usuario_Academico" BIGINT NOT NULL,

    CONSTRAINT "Convidado_pkey" PRIMARY KEY ("id_Evento","id_Usuario_Academico")
);

-- CreateTable
CREATE TABLE "Evento" (
    "id_Evento" INTEGER NOT NULL,
    "id_Organizador" BIGINT,
    "id_categoria" BIGINT,
    "id_Grupos_Convidados" BIGINT,
    "Nome_do_Evento" TEXT,
    "Descriçao" TEXT,
    "Local" TEXT,
    "Data_Horario" TIMESTAMP(3),
    "Data_Lembrete" TIMESTAMP(3),
    "Oculto" BOOLEAN,
    "Recorrente" BOOLEAN,
    "Tipo_Recorrencia" TEXT,
    "Recorrente_ate" DATE NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("id_Evento")
);

-- CreateTable
CREATE TABLE "Faltas" (
    "id_Convidado" BIGINT NOT NULL,
    "id_Evento" BIGINT NOT NULL,
    "Num_Faltas" BIGINT,

    CONSTRAINT "Faltas_pkey" PRIMARY KEY ("id_Convidado","id_Evento")
);

-- CreateTable
CREATE TABLE "Grupo" (
    "id_Grupo" INTEGER NOT NULL,
    "Nome_Grupo" TEXT,
    "id_Organizador" BIGINT,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id_Grupo")
);

-- CreateTable
CREATE TABLE "Lista_Usuarios" (
    "id_Grupo" BIGINT NOT NULL,
    "id_Usuario_Academico" BIGINT NOT NULL,

    CONSTRAINT "Lista_Usuarios_pkey" PRIMARY KEY ("id_Grupo","id_Usuario_Academico")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id_Usuario" INTEGER NOT NULL,
    "E-mail" TEXT,
    "Senha" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_Usuario")
);

-- CreateTable
CREATE TABLE "Usuario_Academico" (
    "id_Usuario_Academico" INTEGER NOT NULL,
    "Nome" TEXT,

    CONSTRAINT "Usuario_Academico_pkey" PRIMARY KEY ("id_Usuario_Academico")
);

-- CreateTable
CREATE TABLE "Usuario_Administrador" (
    "id_Admin" INTEGER NOT NULL,

    CONSTRAINT "Usuario_Administrador_pkey" PRIMARY KEY ("id_Admin")
);
