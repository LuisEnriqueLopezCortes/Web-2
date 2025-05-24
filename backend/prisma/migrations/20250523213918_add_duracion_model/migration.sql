/*
  Warnings:

  - Added the required column `duracion` to the `Pelicula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pelicula" ADD COLUMN     "duracion" TEXT NOT NULL;
