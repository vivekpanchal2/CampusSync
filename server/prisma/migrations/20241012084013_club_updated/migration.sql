/*
  Warnings:

  - Added the required column `president` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secretary` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vicePresident` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "president" TEXT NOT NULL,
ADD COLUMN     "secretary" TEXT NOT NULL,
ADD COLUMN     "vicePresident" TEXT NOT NULL;
