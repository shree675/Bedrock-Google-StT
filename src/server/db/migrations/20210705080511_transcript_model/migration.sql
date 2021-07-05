-- CreateTable
CREATE TABLE "Transcript" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "filetype" TEXT NOT NULL,
    "expirationdate" TIMESTAMP(3) NOT NULL,
    "renderdate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TranscriptToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TranscriptToUser_AB_unique" ON "_TranscriptToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TranscriptToUser_B_index" ON "_TranscriptToUser"("B");

-- AddForeignKey
ALTER TABLE "_TranscriptToUser" ADD FOREIGN KEY ("A") REFERENCES "Transcript"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TranscriptToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
