/*
  Warnings:

  - You are about to drop the column `additionalid` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the `Additional` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transcript" DROP CONSTRAINT "Transcript_additionalid_fkey";

-- DropIndex
DROP INDEX "Transcript.additionalid_unique";

-- AlterTable
ALTER TABLE "Transcript" DROP COLUMN "additionalid",
ADD COLUMN     "expirationdate" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "filetype" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "imageurl" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "renderdate" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "subtitle" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "subtitlecolor" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "titlecolor" TEXT NOT NULL DEFAULT E'empty';

-- DropTable
DROP TABLE "Additional";
