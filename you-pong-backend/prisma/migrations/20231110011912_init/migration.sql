-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('ONLINE', 'OFFLINE', 'INGAME');

-- CreateEnum
CREATE TYPE "channel_type" AS ENUM ('PRIVATE', 'PUBLIC', 'PROTECTED', 'DIRECT');

-- CreateEnum
CREATE TYPE "match_status" AS ENUM ('WIN', 'LOSE');

-- CreateEnum
CREATE TYPE "member_status" AS ENUM ('MUTED', 'BANNED');

-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('ADMIN', 'MEMBER', 'OWNER');

-- CreateEnum
CREATE TYPE "notification" AS ENUM ('INVITATION', 'GAME', 'MESSAGE');

-- CreateEnum
CREATE TYPE "state" AS ENUM ('ACCEPTED', 'REFUSED', 'PENDING', 'BLOCKED');

-- CreateTable
CREATE TABLE "User" (
    "id_user" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "avatar" TEXT,
    "hash" TEXT,
    "email" TEXT NOT NULL,
    "two_fact_auth" TEXT,
    "jw_token" TEXT,
    "victory" INTEGER NOT NULL DEFAULT 0,
    "defeats" INTEGER NOT NULL DEFAULT 0,
    "level" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "rank" INTEGER,
    "status" "user_status" NOT NULL DEFAULT 'ONLINE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
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
    "id_room" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_role" "user_role" NOT NULL DEFAULT 'OWNER',
    "member_status" "member_status",
    "time_muted" TIMESTAMP(3),
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lefted_at" TIMESTAMP(3),
    "id_user" TEXT NOT NULL,
    "id_channel" TEXT NOT NULL,

    CONSTRAINT "Room_Chat_pkey" PRIMARY KEY ("id_room")
);

-- CreateTable
CREATE TABLE "Message" (
    "id_message" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_room" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id_message")
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
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Room_Chat_name_key" ON "Room_Chat"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ChannelToUser_AB_unique" ON "_ChannelToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ChannelToUser_B_index" ON "_ChannelToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_blocked_AB_unique" ON "_blocked"("A", "B");

-- CreateIndex
CREATE INDEX "_blocked_B_index" ON "_blocked"("B");

-- AddForeignKey
ALTER TABLE "Room_Chat" ADD CONSTRAINT "Room_Chat_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room_Chat" ADD CONSTRAINT "Room_Chat_id_channel_fkey" FOREIGN KEY ("id_channel") REFERENCES "Channel"("id_channel") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_room_fkey" FOREIGN KEY ("id_room") REFERENCES "Room_Chat"("id_room") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToUser" ADD CONSTRAINT "_ChannelToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id_channel") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToUser" ADD CONSTRAINT "_ChannelToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blocked" ADD CONSTRAINT "_blocked_A_fkey" FOREIGN KEY ("A") REFERENCES "Room_Chat"("id_room") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blocked" ADD CONSTRAINT "_blocked_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
