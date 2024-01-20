"use client";
import { Bubble, Channel, Member, Message, User_Hero } from "@/types";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  fetchData_Messages,
  fetchData_getMembers,
  getMembers,
  getMessages,
} from "../data/api";
import { log } from "console";
import { useQuery } from "react-query";
import Loader from "@/components/tools/Loader";
import { v4 as uuidv4 } from "uuid";
import ShowMessages from "./ShowMessages";
import { useGlobalContext } from "@/providers/SocketProvider";
import MiniLoader from "@/components/tools/MiniLoader";

interface Props {
  main: User_Hero;
  socket: any;
  channel: Channel;
}

const ChatDialog = ({ main, socket, channel }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  var shouldScrollToBottom: boolean = true;

  const { data: Members } = useQuery<Member[], Error>(
    ["members", channel?.id_channel],
    () => fetchData_getMembers(channel?.id_channel),
    {
      onError: (error: Error) => {
        console.error("Members query error:", error);
      },
    }
  );

  const { data, refetch: MessagesRefetch } = useQuery<Message[], Error>(
    ["messages", channel?.id_channel],
    () => fetchData_Messages(channel?.id_channel),
    {
      onError: (error: Error) => {
        console.error("Messages query error:", error);
      },
    }
  );

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  useEffect(() => {
    const handleMessageReceive = (data: Message) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    socket?.on("receiveMessage", handleMessageReceive);

    return () => {
      socket?.off("receiveMessage", handleMessageReceive);
      socket?.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (shouldScrollToBottom && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      // Reset the scroll trigger //
      shouldScrollToBottom = false;
    }
  }, [shouldScrollToBottom, messages]);

  if (!Members || !data) {
    return <MiniLoader customClass="m-auto" />;
  }

  return (
    <Fragment>
      <div
        className="flex flex-col w-full h-full overflow-y-auto my_scroll_green scrollbar-hide"
        ref={scrollRef}
      >
        {messages &&
          messages.map((message) => {
            return (
              <ShowMessages
                message={message}
                main={main}
                channel={channel}
                Members={Members}
                key={uuidv4()}
              />
            );
          })}
      </div>
    </Fragment>
  );
};

export default ChatDialog;
