/*
  Warnings:

  - You are about to drop the column `likes` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "likes",
ADD COLUMN     "image" TEXT;
