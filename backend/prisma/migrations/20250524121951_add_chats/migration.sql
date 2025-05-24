-- CreateTable
CREATE TABLE "chat" (
    "ID_Chat" SERIAL NOT NULL,
    "Fecha_Creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("ID_Chat")
);

-- CreateTable
CREATE TABLE "chat_usuario" (
    "ID_Chat" INTEGER NOT NULL,
    "ID_Usuario" INTEGER NOT NULL,

    CONSTRAINT "chat_usuario_pkey" PRIMARY KEY ("ID_Chat","ID_Usuario")
);

-- CreateTable
CREATE TABLE "mensaje" (
    "ID_Mensaje" SERIAL NOT NULL,
    "ID_Chat" INTEGER NOT NULL,
    "ID_Usuario" INTEGER NOT NULL,
    "TextoMensaje" TEXT NOT NULL,
    "HoraFecha_Mensaje" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mensaje_pkey" PRIMARY KEY ("ID_Mensaje")
);

-- AddForeignKey
ALTER TABLE "chat_usuario" ADD CONSTRAINT "chat_usuario_ID_Chat_fkey" FOREIGN KEY ("ID_Chat") REFERENCES "chat"("ID_Chat") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_usuario" ADD CONSTRAINT "chat_usuario_ID_Usuario_fkey" FOREIGN KEY ("ID_Usuario") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensaje" ADD CONSTRAINT "mensaje_ID_Chat_fkey" FOREIGN KEY ("ID_Chat") REFERENCES "chat"("ID_Chat") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensaje" ADD CONSTRAINT "mensaje_ID_Usuario_fkey" FOREIGN KEY ("ID_Usuario") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
