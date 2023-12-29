import { Member, Message, User_Hero } from "@/types";
import Image from "next/image";
import React from "react";
import avatar from "../../../../../public/avatar.jpeg";

interface Props {
  member: Member;
  message: Message;
}

const ChatBubbleSender = ({ member, message }: Props) => {
  const formatPrismaDate = (prismaDate) => {
    const date = new Date(prismaDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedHours = hours % 12 || 12; // Convert to 12-hour format

    return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
  };

  if (member) {
    return (
      <div className="chat chat-start p-1">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <Image
              width={40}
              height={40}
              alt="Sender's avatar"
              src={member.user?.avatar || avatar}
            />
          </div>
        </div>
        <div className="flex chat-header items-center gap-1">
          <div className="w-fit h-fit">{member.user?.username}</div>
        </div>
        <div className="w-full h-full dropdown dropdown-hover">
          <div
            data-theme="mytheme"
            className="chat-bubble chat-bubble-primary text-palette-white w-fit  max-w-[80%] break-words "
          >
            {message.content}
          </div>
          <time className="text-xs opacity-50">
            {formatPrismaDate(message.created_at)}
          </time>
        </div>
      </div>
    );
  }
  return;
};
export default ChatBubbleSender;