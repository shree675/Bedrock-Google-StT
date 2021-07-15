/*
  Warnings:

  - You are about to drop the `Additional` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Additional" DROP CONSTRAINT "Additional_transcriptid_fkey";

-- AlterTable
ALTER TABLE "Transcript" ADD COLUMN     "expirationdate" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "filetype" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "imageurl" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "renderdate" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "subtitle" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "subtitlecolor" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT E'empty',
ADD COLUMN     "titlecolor" TEXT NOT NULL DEFAULT E'empty',
ALTER COLUMN "transcript" SET DEFAULT E'empty',
ALTER COLUMN "userid" SET DEFAULT E'empty';

-- DropTable
DROP TABLE "Additional";
