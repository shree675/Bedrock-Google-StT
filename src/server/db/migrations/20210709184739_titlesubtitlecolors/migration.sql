/*
  Warnings:

  - You are about to drop the column `backgroundcolor` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `textcolor` on the `Transcript` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transcript" DROP COLUMN "backgroundcolor",
DROP COLUMN "textcolor",
ADD COLUMN     "subtitlecolor" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "titlecolor" TEXT NOT NULL DEFAULT E'empty';
