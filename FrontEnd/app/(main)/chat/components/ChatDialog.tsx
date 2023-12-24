"use client";
import { Channel, Message, User_Hero } from "@/types";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useSWR from "swr";
import { MyMessage } from ".";
import { fetchData_getMainUser, getMainUser, getMessages } from "../data/api";
import { io } from "socket.io-client";

interface Props {
  channel: Channel;
  socket: any;
}

const ChatDialog = ({ channel, socket }: Props) => {
  var type: string = "";
  const fetchData_Messages = async () => {
    try {
      const result = await getMessages(channel.id_channel || "");
      return result.object;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data: MainUser } = useSWR<User_Hero>(
    "/MainUser",
    fetchData_getMainUser
  );

  const { data: Messages } = useSWR<Message[]>("/Messages", fetchData_Messages);

  const messages = useRef([]);

  useEffect(() => {
    socket?.on("receiveMessage", (data: any) => {
      console.log("Received message:", data);
    });
    const info = {
      id_channel: channel.id_channel,
      id_sender: MainUser.uid,
      content: "Hello, backend!",
    };
    socket?.emit("newMessage", info);
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col w-full h-full overflow-auto my_scroll_green ">
        {Messages &&
          Messages.map((message) => {
            message.user.id_user === MainUser?.uid
              ? (type = "main")
              : (type = "sender");
            return (
              <MyMessage
                type={type}
                message={message}
                key={message.user.id_user}
              />
            );
          })}
      </div>
    </Fragment>
  );
};

export default ChatDialog;
