import { Channel, Member, Message, User_Hero } from "@/types";
import React, { useEffect } from "react";
import ChatBubbleMain, { formatPrismaDate } from "./ChatBubbleMain";
import ChatBubbleSender from "./ChatBubbleSender";
import { v4 as uuidv4 } from "uuid";

interface props {
  message: Message;
  main: User_Hero;
  channel: Channel;
  Members: Member[];
}

// class tya {
//   static today: boolean;
//   static yesterday: boolean;
//   static another: boolean;
// }

let today_ = true,
  yesterday_ = true,
  another = true;

const ShowMessages = ({ message, main, channel, Members }: props) => {
  useEffect(() => {
    today_ = true;
    yesterday_ = true;
    another = true;
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(
      today.setDate(today.getDate() - 1)
    ).toDateString();
    if (date.toDateString() === new Date().toDateString()) {
      if (today_) {
        yesterday_ = true;
        another = true;
        today_ = false;
      } else if (!today_) return;
      return "Today " + formatPrismaDate(timestamp);
    } else if (date.toDateString() === yesterday) {
      if (yesterday_) {
        today_ = true;
        another = true;
        yesterday_ = false;
      } else return;
      return "Yesterday " + formatPrismaDate(timestamp);
    } else {
      if (another) {
        today_ = true;
        yesterday_ = true;
        another = false;
      } else return;
      return date.toLocaleDateString(); // or any other format you prefer
    }
  };

  return (
    <>
      <div className="flex w-full h-fit text-[#686868] font-nunito justify-center items-center">
        {formatDate(message.created_at)}
      </div>
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
