/*
  Warnings:

  - You are about to drop the column `images` on the `Club` table. All the data in the column will be lost.
  - Added the required column `category` to the `Club` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoUrl` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" DROP COLUMN "images",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "logoUrl" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "GalleryImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "clubId" TEXT NOT NULL,

    CONSTRAINT "GalleryImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GalleryImage" ADD CONSTRAINT "GalleryImage_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
