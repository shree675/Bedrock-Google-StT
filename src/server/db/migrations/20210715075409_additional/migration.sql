/*
  Warnings:

  - You are about to drop the column `expirationdate` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `filetype` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `imageurl` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `renderdate` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `subtitlecolor` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Transcript` table. All the data in the column will be lost.
  - You are about to drop the column `titlecolor` on the `Transcript` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transcript" DROP COLUMN "expirationdate",
DROP COLUMN "filetype",
DROP COLUMN "imageurl",
DROP COLUMN "renderdate",
DROP COLUMN "status",
DROP COLUMN "subtitle",
DROP COLUMN "subtitlecolor",
DROP COLUMN "title",
DROP COLUMN "titlecolor";

-- CreateTable
CREATE TABLE "Additional" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "filetype" TEXT NOT NULL,
    "expirationdate" TEXT NOT NULL,
    "renderdate" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL DEFAULT E'empty',
    "titlecolor" TEXT NOT NULL DEFAULT E'empty',
    "imageurl" TEXT NOT NULL DEFAULT E'empty',
    "subtitlecolor" TEXT NOT NULL DEFAULT E'empty',
    "transcriptid" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Additional.transcriptid_unique" ON "Additional"("transcriptid");

-- AddForeignKey
ALTER TABLE "Additional" ADD FOREIGN KEY ("transcriptid") REFERENCES "Transcript"("id") ON DELETE CASCADE ON UPDATE CASCADE;
