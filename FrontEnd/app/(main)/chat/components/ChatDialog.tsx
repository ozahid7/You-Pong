"use client";
import { Bubble, Channel, Member, Message, User_Hero } from "@/types";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  fetchData_Messages,
  fetchData_getMembers,
  getMembers,
  getMessages,
} from "../data/api";
import ChatBubbleMain from "./ChatBubbleMain";
import ChatBubbleSender from "./ChatBubbleSender";
import { log } from "console";
import { useQuery } from "react-query";
import Loader from "@/components/tools/Loader";

interface Props {
  main: User_Hero;
  socket: any;
  channel: Channel;
}

export const generateRandomKey = () => {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 10000) + 1;
  return `${timestamp}-${randomNumber}`;
};

const ChatDialog = ({ main, socket, channel }: Props) => {
  var one: boolean = false;
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  var shouldScrollToBottom: boolean = true;

  const {
    data: Members,
    error: membersError,
    isLoading: membersLoading,
  } = useQuery<Member[], Error>(
    ["members", channel?.id_channel],
    () => fetchData_getMembers(channel?.id_channel),
    {
      onError: (error: Error) => {
        console.error("Members query error:", error);
      },
    }
  );

  const { data, error, isLoading, refetch: MessagesRefetch } = useQuery<Message[], Error>(
    ["messages", channel?.id_channel],
    () => fetchData_Messages(channel?.id_channel),
    {
      onError: (error: Error) => {
        console.error("Messages query error:", error);
      },
    }
  );

  if (membersLoading || isLoading) <Loader />;

  useEffect(() => {
    if (data) {
      // Set the initial messages from the database //
      setMessages(data);
      MessagesRefetch();
    }
  }, [data]);

  useEffect(() => {
    if (!one) {
      socket?.on("receiveMessage", (data: Message) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
      one = true;
    }
  }, []);

  useEffect(() => {
    if (shouldScrollToBottom && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      // Reset the scroll trigger //
      shouldScrollToBottom = false;
    }
  }, [shouldScrollToBottom, messages]);

  const whichUSER = (message: Message) => {
    if (message && message.id_channel === channel?.id_channel) {
      if (message.id_sender === main.uid) {
        return (
          <ChatBubbleMain
            message={message}
            main={main}
            key={generateRandomKey()}
          />
        );
      } else if (message.id_sender !== main.uid && Members) {
        const member: Member[] = Members.filter(
          (member) => member.user.id_user === message.id_sender
        );
        return (
          <ChatBubbleSender
            message={message}
            member={member[0] || null}
            key={generateRandomKey()}
          />
        );
      }
      one = false;
    }
  };

  return (
    <Fragment>
      <div
        className="flex flex-col w-full h-full overflow-auto my_scroll_green "
        ref={scrollRef}
      >
        {messages &&
          messages.map((message) => {
            return whichUSER(message);
          })}
      </div>
    </Fragment>
  );
};

export default ChatDialog;
