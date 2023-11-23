-- CreateTable
CREATE TABLE "Achievement" (
    "id_achievement" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id_achievement")
);

-- CreateTable
CREATE TABLE "Owned" (
    "id_achievement" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "owned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "Owned_pkey" PRIMARY KEY ("id_achievement","id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_title_key" ON "Achievement"("title");

-- AddForeignKey
ALTER TABLE "Owned" ADD CONSTRAINT "Owned_id_achievement_fkey" FOREIGN KEY ("id_achievement") REFERENCES "Achievement"("id_achievement") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owned" ADD CONSTRAINT "Owned_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
