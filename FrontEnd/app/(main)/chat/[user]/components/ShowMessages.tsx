import { Channel, Member, Message, User_Hero } from "@/types";
import React, { useEffect, useMemo } from "react";
import ChatBubbleMain, { formatPrismaDate } from "./ChatBubbleMain";
import ChatBubbleSender from "./ChatBubbleSender";
import { v4 as uuidv4 } from "uuid";

interface props {
  message: Message;
  main: User_Hero;
  channel: Channel;
  Members: Member[];
  shouldDisplayDate: boolean;
}


export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString(); // or any other format you prefer
  }
};

const ShowMessages = ({ message, main, channel, Members, shouldDisplayDate }: props) => {
  const displayDate = useMemo(() => formatDate(message.created_at), [message.created_at]);

  return (
    <>
      {shouldDisplayDate &&
        <div className="flex w-full h-fit text-[#686868] font-nunito justify-center items-center">
          {displayDate}
        </div>
      }
      {message && message.id_channel === channel?.id_channel ? (
        message.id_sender === main?.uid ? (
          <ChatBubbleMain
            message={message}
            main={main}
            key={uuidv4()}
          />
        ) : Members ? (
          <ChatBubbleSender
            message={message}
            member={
              Members.find(
                (member) => member.user.id_user === message.id_sender
              ) || null
            }
            key={uuidv4()}
          />
        ) : null
      ) : null}
    </>
  );
};

export default ShowMessages;
