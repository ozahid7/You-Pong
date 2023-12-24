import Image from "next/image";
import React, { Fragment } from "react";
import avatar from "../../../../public/avatar.jpeg";
import { Member, Message, User_Hero } from "@/types";
import { getMembers } from "../data/api";
import useSWR from "swr";
import ChatBubbleMain from "./ChatBubbleMain";
import ChatBubbleSender from "./ChatBubbleSender";

interface Props {
  type: string;
  message: Message;
  main: User_Hero;
  show: boolean;
}

const MyMessage = ({ type, message, main, show }: Props) => {
  const fetchData_getMembers = async () => {
    try {
      const result = await getMembers(message.id_channel || "");
      return result.object;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data: Members } = useSWR<Member[]>("/members", fetchData_getMembers);

  const formatPrismaDate = (prismaDate) => {
    const date = new Date(prismaDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    const formattedHours = hours % 12 || 12; // Convert to 12-hour format

    return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
  };

  return (
    <Fragment>
      {type === "sender" ? (
        Members &&
        Members.filter(
          (member) => member.user.id_user === message.id_sender
        ).map((member) => {
          return (
            <ChatBubbleSender
              member={member}
              message={message}
              key={message.id_message}
            />
          );
        })
      ) : (
        <ChatBubbleMain
          main={main}
          message={message}
          key={message.id_message}
        />
      )}
    </Fragment>
  );
};

export default MyMessage;
