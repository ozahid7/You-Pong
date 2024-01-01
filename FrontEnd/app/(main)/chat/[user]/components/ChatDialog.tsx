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
import { v4 as uuidv4 } from 'uuid';

interface Props {
  main: User_Hero;
  socket: any;
  channel: Channel;
}
// TODO protect data (isloading)

const ChatDialog = ({ main, socket, channel }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  var shouldScrollToBottom: boolean = true;
  var one: boolean = false;

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

  const {
    data,
    error,
    isLoading,
    refetch: MessagesRefetch,
  } = useQuery<Message[], Error>(
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
      // MessagesRefetch();
      // one = false;
    }
  }, [data]);

  useEffect(() => {
    if (!one) {
      socket?.on("receiveMessage", (data: Message) => {
        setMessages((prevMessages) => [...prevMessages, data]);
      });
      // MessagesRefetch();
      one = true;
    }
  }, [one]);

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
        one = false;
        return (
          <ChatBubbleMain
            message={message}
            main={main}
            key={uuidv4()}
          />
        );
      } else if (message.id_sender !== main.uid && Members) {
        const member: Member[] = Members.filter(
          (member) => member.user.id_user === message.id_sender
        );
        one = false;
        return (
          <ChatBubbleSender
            message={message}
            member={member[0] || null}
            key={uuidv4()}
          />
        );
      }
    }
  };

  return (
    <Fragment>
      <div
        className="flex flex-col w-full h-full overflow-y-auto my_scroll_green scrollbar-hide"
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
