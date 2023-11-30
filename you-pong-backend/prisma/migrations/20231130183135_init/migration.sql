-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('ONLINE', 'OFFLINE', 'INGAME');

-- CreateEnum
CREATE TYPE "channel_type" AS ENUM ('PRIVATE', 'PUBLIC', 'PROTECTED', 'DIRECT');

-- CreateEnum
CREATE TYPE "match_status" AS ENUM ('WIN', 'LOSE');

-- CreateEnum
CREATE TYPE "member_status" AS ENUM ('MUTED', 'BANNED', 'NONE');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('ADMIN', 'MEMBER', 'OWNER');

-- CreateEnum
CREATE TYPE "notification" AS ENUM ('INVITATION', 'GAME', 'MESSAGE');

-- CreateEnum
CREATE TYPE "state" AS ENUM ('ACCEPTED', 'REFUSED', 'PENDING', 'BLOCKED');

-- CreateTable
CREATE TABLE "user" (
    "id_user" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "avatar" TEXT,
    "hash" TEXT,
    "email" TEXT NOT NULL,
    "two_fact_auth" TEXT,
    "tfaIsEnable" BOOLEAN NOT NULL DEFAULT false,
    "victory" INTEGER NOT NULL DEFAULT 0,
    "defeats" INTEGER NOT NULL DEFAULT 0,
    "level" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "rank" INTEGER,
    "status" "user_status" NOT NULL DEFAULT 'OFFLINE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id_channel" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "avatar" TEXT,
    "hash" TEXT,
    "type" "channel_type" NOT NULL DEFAULT 'DIRECT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id_channel")
);

-- CreateTable
CREATE TABLE "Room_Chat" (
    "name" TEXT NOT NULL,
    "user_role" "user_role" NOT NULL DEFAULT 'OWNER',
    "member_status" "member_status" NOT NULL DEFAULT 'NONE',
    "time_muted" TIMESTAMP(3),
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lefted" BOOLEAN NOT NULL DEFAULT true,
    "lefted_at" TIMESTAMP(3),
    "id_user" TEXT NOT NULL,
    "id_channel" TEXT NOT NULL,

    CONSTRAINT "Room_Chat_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Message" (
    "id_message" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_sender" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id_message")
);

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

-- CreateTable
CREATE TABLE "_ChannelToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_blocked" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Room_Chat_name_key" ON "Room_Chat"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Room_Chat_id_channel_id_user_key" ON "Room_Chat"("id_channel", "id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_title_key" ON "Achievement"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Owned_id_achievement_key" ON "Owned"("id_achievement");

-- CreateIndex
CREATE UNIQUE INDEX "_ChannelToUser_AB_unique" ON "_ChannelToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ChannelToUser_B_index" ON "_ChannelToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_blocked_AB_unique" ON "_blocked"("A", "B");

-- CreateIndex
CREATE INDEX "_blocked_B_index" ON "_blocked"("B");

-- AddForeignKey
ALTER TABLE "Room_Chat" ADD CONSTRAINT "Room_Chat_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room_Chat" ADD CONSTRAINT "Room_Chat_id_channel_fkey" FOREIGN KEY ("id_channel") REFERENCES "Channel"("id_channel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_sender_fkey" FOREIGN KEY ("id_sender") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_name_fkey" FOREIGN KEY ("name") REFERENCES "Room_Chat"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owned" ADD CONSTRAINT "Owned_id_achievement_fkey" FOREIGN KEY ("id_achievement") REFERENCES "Achievement"("id_achievement") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owned" ADD CONSTRAINT "Owned_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToUser" ADD CONSTRAINT "_ChannelToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id_channel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToUser" ADD CONSTRAINT "_ChannelToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blocked" ADD CONSTRAINT "_blocked_A_fkey" FOREIGN KEY ("A") REFERENCES "Room_Chat"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blocked" ADD CONSTRAINT "_blocked_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
