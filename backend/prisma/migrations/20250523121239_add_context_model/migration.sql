/*
  Warnings:

  - Added the required column `actores` to the `Pelicula` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fechaestreno` to the `Pelicula` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valoracion` to the `Pelicula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pelicula" ADD COLUMN     "actores" TEXT NOT NULL,
ADD COLUMN     "fechaestreno" INTEGER NOT NULL,
ADD COLUMN     "valoracion" INTEGER NOT NULL;
