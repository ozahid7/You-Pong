"use client";
import { Bubble, Channel, Member, Message, User_Hero } from "@/types";
import React, { Fragment, useEffect, useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import {
  fetchData_getMainUser,
  getMainUser,
  getMembers,
  getMessages,
} from "../data/api";
import MyMessage from "./MyMessage";
import ChatBubbleMain from "./ChatBubbleMain";
import ChatBubbleSender from "./ChatBubbleSender";

interface Props {
  channel: Channel;
  main: User_Hero;
  socket: any;
}

var one: boolean = false;
var show: boolean = false;

export const generateRandomKey = () => {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 10000) + 1;
  return `${timestamp}-${randomNumber}`;
};

const ChatDialog = ({ channel, main, socket }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  var shouldScrollToBottom: boolean = true;
  const scrollRef = useRef<HTMLDivElement>(null);
  var shouldScrollToBottom: boolean = true;
  var type: string = "";

  const fetchData_getMembers = async () => {
    try {
      const result = await getMembers(channel.id_channel || "");
      return result.object;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data: Members } = useSWR<Member[]>("/members", fetchData_getMembers);

  useEffect(() => {
    if (shouldScrollToBottom && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      // Reset the scroll trigger //
      shouldScrollToBottom = false;
    }
  }, [shouldScrollToBottom, messages]);

  const whichUSER = (message: Message) => {
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
  };

  const fetchData_Messages = async () => {
    try {
      const result = await getMessages(channel.id_channel || "");
      return result.object;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data } = useSWR<Message[]>("/messages", fetchData_Messages);

  useEffect(() => {
    if (data) {
      // Set the initial messages from the database //
      setMessages(data.reverse());
    }
  }, [data]);

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
