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
  - A unique constraint covering the columns `[additionalid]` on the table `Transcript` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `additionalid` to the `Transcript` table without a default value. This is not possible if the table is not empty.

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
DROP COLUMN "titlecolor",
ADD COLUMN     "additionalid" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Additional" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'empty',
    "filetype" TEXT NOT NULL DEFAULT E'empty',
    "expirationdate" TEXT NOT NULL DEFAULT E'empty',
    "renderdate" TEXT NOT NULL DEFAULT E'empty',
    "status" TEXT NOT NULL DEFAULT E'empty',
    "subtitle" TEXT NOT NULL DEFAULT E'empty',
    "titlecolor" TEXT NOT NULL DEFAULT E'empty',
    "imageurl" TEXT NOT NULL DEFAULT E'empty',
    "subtitlecolor" TEXT NOT NULL DEFAULT E'empty',

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transcript.additionalid_unique" ON "Transcript"("additionalid");

-- AddForeignKey
ALTER TABLE "Transcript" ADD FOREIGN KEY ("additionalid") REFERENCES "Additional"("id") ON DELETE CASCADE ON UPDATE CASCADE;
