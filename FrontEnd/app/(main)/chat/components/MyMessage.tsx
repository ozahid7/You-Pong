import Image from "next/image";
import React, { Fragment } from "react";
import avatar from "../../../../public/avatar.jpeg";
import { Member, Message, User_Hero } from "@/types";
import { getMembers } from "../data/api";
import useSWR from "swr";

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
        <Fragment>
          {Members &&
            Members.filter(
              (member) => member.user.id_user === message.id_sender
            ).map((member) => {
              return (
                <div
                  className="chat chat-start p-1"
                  key={Math.floor(Math.random() * 10000) + 1}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <Image
                        width={40}
                        height={40}
                        alt="Sender's avatar"
                        src={member.user.avatar || avatar}
                      />
                    </div>
                  </div>
                  <div className="flex chat-header items-center gap-1">
                    <div className="w-fit h-fit">{member.user.username}</div>
                  </div>
                  <div className="w-full h-full dropdown dropdown-hover">
                    <div
                      role="button"
                      tabIndex={0}
                      data-theme="mytheme"
                      className="chat-bubble chat-bubble-primary text-palette-white w-fit max-w-[80%] overflow-hidden whitespace-pre-wrap"
                    >
                      {message?.message}
                    </div>
                    <time className="text-xs opacity-50">
                      {formatPrismaDate(message.created_at)}
                    </time>
                  </div>
                </div>
              );
            })}
        </Fragment>
      ) : (
        <Fragment>
          <div className="chat chat-end p-1 ">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Image
                  width={40}
                  height={40}
                  alt="Main user's avatar"
                  src={main.avatar || avatar}
                />
              </div>
            </div>
            <div className="flex chat-header items-center gap-1">
              <div className="w-full h-fit">{main.username}</div>
            </div>
            <div
              role="button"
              data-theme="mytheme"
              className="chat-bubble chat-bubble-secondary text-palette-white w-fit max-w-[80%] overflow-hidden whitespace-pre-wrap"
            >
              {message?.message}
            </div>
            <time className="text-xs opacity-50">
              {formatPrismaDate(message.created_at)}
            </time>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyMessage;
