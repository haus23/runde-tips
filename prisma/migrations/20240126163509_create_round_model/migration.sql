-- CreateTable
CREATE TABLE "Round" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nr" INTEGER NOT NULL,
    "isDoubleRound" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "tipsPublished" BOOLEAN NOT NULL DEFAULT false,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "championshipId" INTEGER NOT NULL,
    CONSTRAINT "Round_championshipId_fkey" FOREIGN KEY ("championshipId") REFERENCES "Championship" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
