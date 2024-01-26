-- CreateTable
CREATE TABLE "Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nr" INTEGER NOT NULL,
    "date" TEXT,
    "result" TEXT NOT NULL DEFAULT '',
    "points" INTEGER NOT NULL DEFAULT 0,
    "championshipId" INTEGER NOT NULL,
    "roundId" INTEGER NOT NULL,
    "leagueId" INTEGER,
    "hometeamId" INTEGER,
    "awayteamId" INTEGER,
    CONSTRAINT "Match_championshipId_fkey" FOREIGN KEY ("championshipId") REFERENCES "Championship" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Match_hometeamId_fkey" FOREIGN KEY ("hometeamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Match_awayteamId_fkey" FOREIGN KEY ("awayteamId") REFERENCES "Team" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
