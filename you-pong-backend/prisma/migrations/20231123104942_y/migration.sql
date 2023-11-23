/*
  Warnings:

  - A unique constraint covering the columns `[id_achievement]` on the table `Owned` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Owned_id_achievement_key" ON "Owned"("id_achievement");
