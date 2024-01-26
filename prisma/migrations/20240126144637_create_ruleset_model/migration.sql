-- CreateTable
CREATE TABLE "Ruleset" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "extraQuestionRuleId" TEXT NOT NULL,
    "matchRuleId" TEXT NOT NULL,
    "roundRuleId" TEXT NOT NULL,
    "tipRuleId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ruleset_slug_key" ON "Ruleset"("slug");
