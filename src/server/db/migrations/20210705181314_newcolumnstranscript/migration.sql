-- AlterTable
ALTER TABLE "Transcript" ADD COLUMN     "audiourl" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "backgroundcolor" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "imageurl" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "subtitle" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "textcolor" TEXT NOT NULL DEFAULT E'';
