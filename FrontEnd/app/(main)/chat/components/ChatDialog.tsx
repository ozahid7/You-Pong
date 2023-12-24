"use client";
import { Channel, Message, User_Hero } from "@/types";
import React, { Fragment, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { fetchData_getMainUser, getMainUser, getMessages } from "../data/api";
import MyMessage from "./MyMessage";

interface Props {
  channel: Channel;
  socket: any;
  main: User_Hero;
}

var one: boolean = false;
var show: boolean = false;

const ChatDialog = ({ channel, socket, main }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  var type: string = "";

  const { data: MainUser } = useSWR<User_Hero>(
    "/MainUser",
    fetchData_getMainUser
  );

  useEffect(() => {
    if (!one) {
      socket?.on("receiveMessage", (data: Message) => {
        data.id_channel === channel.id_channel ? (show = true) : (show = false);
        setMessages((prevMessages) => [...prevMessages, data]);
      });
      one = true;
    }
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col w-full h-full overflow-auto my_scroll_green ">
        {messages &&
          messages.map((message) => {
            message.id_sender === main.uid
              ? (type = "main")
              : (type = "sender");
            return (
              <MyMessage
                type={type}
                message={message}
                main={main}
                show={show}
                key={Math.floor(Math.random() * 10000) + 1}
              />
            );
          })}
      </div>
    </Fragment>
  );
};

export default ChatDialog;
