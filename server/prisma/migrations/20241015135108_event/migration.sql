/*
  Warnings:

  - Added the required column `ticketId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "Venue" TEXT;

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "ticketId" TEXT NOT NULL;
