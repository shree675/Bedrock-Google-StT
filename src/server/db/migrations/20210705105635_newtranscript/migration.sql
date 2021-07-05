/*
  Warnings:

  - You are about to drop the `_TranscriptToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userid` to the `Transcript` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TranscriptToUser" DROP CONSTRAINT "_TranscriptToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TranscriptToUser" DROP CONSTRAINT "_TranscriptToUser_B_fkey";

-- AlterTable
ALTER TABLE "Transcript" ADD COLUMN     "userid" TEXT NOT NULL;

-- DropTable
DROP TABLE "_TranscriptToUser";
