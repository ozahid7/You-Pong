import { Message, User_Hero } from "@/types";
import Image from "next/image";
import React, { Fragment } from "react";

interface Props {
  main: User_Hero;
  message: Message;
}

export const formatPrismaDate = (prismaDate) => {
  const date = new Date(prismaDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
};

const ChatBubbleMain = ({ main, message }: Props) => {

  if (message)
    return (
      <Fragment>
        <div className="chat chat-end p-1 ">
          <div className="chat-image avatar">
            <div className="w-10 rounded-md border-[2px] border-palette-white">
              <Image
                width={40}
                height={40}
                alt="Main user's avatar"
                src={main.avatar}
              />
            </div>
          </div>
          <div className="flex chat-header items-center gap-1">
            <div className="w-fit h-fit font-body font-[600]">
              {main.username}
            </div>
          </div>
          <div
            data-theme="mytheme"
            className="chat-bubble chat-bubble-primary text-palette-white font-nunito font-[600] w-fit max-w-[80%] break-words "
          >
            {message?.content}
          </div>
          <time className="chat-footer text-xs opacity-50">
            {formatPrismaDate(message.created_at)}
          </time>
        </div>
      </Fragment>
    );

  return;
};
export default ChatBubbleMain;
