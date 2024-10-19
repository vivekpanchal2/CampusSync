/*
  Warnings:

  - Added the required column `memberCardUrl` to the `ClubMembership` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClubMembership" ADD COLUMN     "memberCardUrl" TEXT NOT NULL;
