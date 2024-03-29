"use client";
import { Channel, Member, Message, User_Hero } from "@/types";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  fetchData_Messages,
  fetchData_getMembers,
} from "../data/api";
import { useQuery } from "react-query";
import { v4 as uuidv4 } from "uuid";
import ShowMessages, { formatDate } from "./ShowMessages";
import MiniLoader from "@/components/tools/MiniLoader";
import { Socket } from "socket.io-client";

interface Props {
  main: User_Hero;
  socket: Socket;
  channel: Channel;
  channels: Channel[];
  refetchDirect: any;
}

const ChatDialog = ({ main, socket, channel, channels, refetchDirect }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  var shouldScrollToBottom: boolean = true;

  const { data: Members, refetch } = useQuery<Member[], Error>(
    ["members", channel?.id_channel],
    () => fetchData_getMembers(channel?.id_channel),
    {
      onError: (error: Error) => {
        console.error("Members query error:", error);
      },
    }
  );

  const { data } = useQuery<Message[], Error>(
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
      const result = channels.find((channel) => channel.id_channel === data.id_channel);
      if (result === undefined)
        refetchDirect();
      shouldScrollToBottom = true;
    };

    const handleJoinedChannel = (data: string) => {
      refetch();
    };

    socket?.on("receiveMessage", handleMessageReceive);
    socket?.on("joinedChannel", handleJoinedChannel);

    return () => {
      socket?.off("receiveMessage", handleMessageReceive);
      socket?.off("joinedChannel", handleJoinedChannel);
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

  let lastDate = null;

  return (
    <Fragment>
      <div
        className="flex flex-col w-full h-full overflow-y-auto my_scroll_green scrollbar-hide"
        ref={scrollRef}
      >
        {messages &&
          messages.map((message) => {
            const shouldDisplayDate = formatDate(message.created_at) !== lastDate;
            lastDate = shouldDisplayDate ? formatDate(message.created_at) : lastDate;
            return (
              <ShowMessages
                message={message}
                main={main}
                channel={channel}
                Members={Members}
                shouldDisplayDate={shouldDisplayDate}
                key={uuidv4()}
              />
            );
          })}
      </div>
    </Fragment>
  );
};

export default ChatDialog;
