-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fbId" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "extraPoints" DECIMAL NOT NULL DEFAULT 0,
    "totalPoints" DECIMAL NOT NULL DEFAULT 0,
    "rank" INTEGER NOT NULL DEFAULT 0,
    "championshipId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Player_championshipId_fkey" FOREIGN KEY ("championshipId") REFERENCES "Championship" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_fbId_key" ON "Player"("fbId");
