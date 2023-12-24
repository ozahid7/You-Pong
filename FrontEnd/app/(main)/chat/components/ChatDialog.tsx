"use client";
import { Channel, Message, User_Hero } from "@/types";
import React, { Fragment, useEffect, useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import { fetchData_getMainUser, getMainUser, getMessages } from "../data/api";
import MyMessage from "./MyMessage";

interface Props {
  channel: Channel;
  main: User_Hero;
  socket: any;
}

var one: boolean = false;
var show: boolean = false;

const ChatDialog = ({ channel, main, socket }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  var type: string = "";
  const fetchData_Messages = async () => {
    try {
      const result = await getMessages(channel.id_channel || "");
      return result.object;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data } = useSWR<Message[]>("/messages", fetchData_Messages);

  const { data: MainUser } = useSWR<User_Hero>(
    "/MainUser",
    fetchData_getMainUser
  );

  useEffect(() => {
    if (data) {
      // Set the initial messages from the database //
      setMessages(data);
      setShouldScrollToBottom(true);
    }
  }, [data]);

  useEffect(() => {
    if (!one) {
      socket?.on("receiveMessage", (data: Message) => {
        data.id_channel === channel.id_channel ? (show = true) : (show = false);
        setMessages((prevMessages) => [...prevMessages, data]);
        setShouldScrollToBottom(true);
      });
      one = true;
    }
  }, []);

  useEffect(() => {
    if (shouldScrollToBottom && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      // Reset the scroll trigger //
      setShouldScrollToBottom(false);
    }
  }, [shouldScrollToBottom, messages]);

  return (
    <Fragment>
      <div
        className="flex flex-col w-full h-full overflow-auto my_scroll_green "
        ref={scrollRef}
      >
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
                key={message.id_message}
              />
            );
          })}
      </div>
    </Fragment>
  );
};

export default ChatDialog;
