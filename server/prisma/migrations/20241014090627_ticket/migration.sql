/*
  Warnings:

  - You are about to drop the column `studentsRegistered` on the `Event` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentsLimit` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticketUrl` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "studentsRegistered",
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "studentsLimit" INTEGER NOT NULL,
ALTER COLUMN "clubId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "ticketUrl" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
