/*
  Warnings:

  - You are about to drop the column `fbId` on the `Player` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "points" INTEGER NOT NULL DEFAULT 0,
    "extraPoints" DECIMAL NOT NULL DEFAULT 0,
    "totalPoints" DECIMAL NOT NULL DEFAULT 0,
    "rank" INTEGER NOT NULL DEFAULT 0,
    "championshipId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Player_championshipId_fkey" FOREIGN KEY ("championshipId") REFERENCES "Championship" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("championshipId", "extraPoints", "id", "points", "rank", "totalPoints", "userId") SELECT "championshipId", "extraPoints", "id", "points", "rank", "totalPoints", "userId" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
