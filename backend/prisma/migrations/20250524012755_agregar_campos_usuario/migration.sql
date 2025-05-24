-- AlterTable
ALTER TABLE "User" ADD COLUMN     "apellidos" TEXT,
ADD COLUMN     "fechaNacimiento" TIMESTAMP(3),
ADD COLUMN     "peliculaFavorita" TEXT,
ADD COLUMN     "usuario" TEXT,
ALTER COLUMN "tipo" SET DEFAULT 'usuario';
