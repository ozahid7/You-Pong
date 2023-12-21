import Image from "next/image";
import React, { Fragment } from "react";
import avatar from "../../../../public/avatar.jpeg";
import { Message } from "@/types";

interface Props {
  type: string;
  message: Message;
}

const MyMessage = ({ type, message }: Props) => {
  // format date from prisma to normal us date
  const PrismaDateFormat = (created_at: string): string => {
    const date = new Date(created_at);
    const options = {
      minute: "numeric" || "",
      hour: "numeric" || "",
      day: "numeric" || "",
      month: "short" || "",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  return (
    <Fragment>
      {type === "sender" ? (
        <Fragment>
          <div className="chat chat-start p-1">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Image
                  width={40}
                  height={40}
                  alt="Sender's avatar"
                  src={message.user.avatar || avatar}
                />
              </div>
            </div>
            <div className="flex chat-header items-center gap-1">
              <div className="w-fit h-fit">{message.user.username}</div>
              <time className="text-xs opacity-50">{message.created_at}</time>
            </div>
            <div className="w-full h-full dropdown dropdown-hover">
              <div
                role="button"
                tabIndex={0}
                data-theme="mytheme"
                className="chat-bubble chat-bubble-primary text-palette-white w-fit max-w-[80%] overflow-hidden whitespace-pre-wrap"
              >
                {message.content}
              </div>
              <ul
                tabIndex={0}
                className="chat-footer opacity-50 dropdown-content z-[1] menu p-2 bg-base-100 rounded-box w-fit"
              >
                <li>Delivered</li>
              </ul>
            </div>
          </div>
        </Fragment>
      ) : type === "main" ? (
        <Fragment>
          <div className="chat chat-end p-1 ">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Image
                  width={40}
                  height={40}
                  alt="Main user's avatar"
                  src={message.user.avatar || avatar}
                />
              </div>
            </div>
            <div className="flex chat-header items-center gap-1">
              <div className="w-full h-fit">{message.user.username}</div>
            </div>
            <div
              role="button"
              data-theme="mytheme"
              className="chat-bubble chat-bubble-secondary text-palette-white w-fit max-w-[80%] overflow-hidden whitespace-pre-wrap"
            >
              {message.content}
            </div>
            <time className="text-xs opacity-50">
              {PrismaDateFormat(message.created_at)}
            </time>
          </div>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
};

var obj = {
  message: "Messages founded successfully",
  object: [
    {
      id_message: "afb2869d-9354-40dc-8da3-8d8d5d61b8c0",
      content: "hada machi",
      created_at: "2023-12-19T00:03:59.139Z",
      id_sender: "a1fbe353-d166-4928-9148-e9bf9312f2fa",
      name_room: "c628d95c-c291-4fc0-99ca-6e663a99bd24",
      id_channel: "80e20a16-4122-4e18-9bc7-9a6fccb45bd0",
    },
    {
      id_message: "eac5d71d-b284-4d1d-a9be-37104a5c2456",
      content: "hada ghir ana li kandwiiiii",
      created_at: "2023-12-19T00:02:36.773Z",
      id_sender: "7bc96d40-48ff-48e4-a77c-4fa1cb0f2007",
      name_room: "642850cd-f21b-48c2-a6bc-0db14125abbe",
      id_channel: "80e20a16-4122-4e18-9bc7-9a6fccb45bd0",
    },
    {
      id_message: "5e720cde-30c7-4a52-b19b-b33d288d2b98",
      content: "can i help you ",
      created_at: "2023-12-19T00:01:51.657Z",
      id_sender: "a1fbe353-d166-4928-9148-e9bf9312f2fa",
      name_room: "c628d95c-c291-4fc0-99ca-6e663a99bd24",
      id_channel: "80e20a16-4122-4e18-9bc7-9a6fccb45bd0",
    },
    {
      id_message: "d3f38beb-7d97-4db3-9cc3-61d7765f37a6",
      content: "hey abdo",
      created_at: "2023-12-18T23:59:18.731Z",
      id_sender: "7bc96d40-48ff-48e4-a77c-4fa1cb0f2007",
      name_room: "642850cd-f21b-48c2-a6bc-0db14125abbe",
      id_channel: "80e20a16-4122-4e18-9bc7-9a6fccb45bd0",
    },
  ],
};

export default MyMessage;
