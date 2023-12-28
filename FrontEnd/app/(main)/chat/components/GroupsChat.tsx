"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LuMoreHorizontal, LuSend } from "react-icons/lu";
import { ChatDialog, GroupDropdown } from ".";
import { Channel, Message, User_Hero, whichChannel } from "@/types";
import { Avatar } from "@nextui-org/react";
import {
  fetchData_Channel,
  fetchData_getChannels,
  getChannel,
  getChannels,
  getMembers,
  getMessages,
} from "../data/api";
import { User } from "@/types";
import { MyDropdown } from "@/components";
import { FiChevronDown } from "react-icons/fi";
import { generateRandomKey } from "./ChatDialog";
import { useQuery } from "react-query";

interface obj {
  channels: Channel;
  socket: any;
  user: User_Hero;
  indexChannels: whichChannel[];
  index: number;
  refetch: any;
  joinRefetch: any;
  data: Channel[];
}

var one: boolean = false;

const GroupsChat = ({
  channels,
  socket,
  user,
  indexChannels,
  data,
  index,
  refetch,
  joinRefetch,
}: obj) => {
  const messageRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const {
    data: channel,
    error: ChannelError,
    isLoading: ChannelLoading,
  } = useQuery<Channel, Error>(
    ["channel", channels?.id_channel],
    () => fetchData_Channel(channels?.id_channel),
    {
      onError: (error: Error) => {
        console.error("Messages query error:", error);
      },
    }
  );

  const retChannel: Channel | null = data
    ? data.find(
        (channel) =>
          channel.id_channel === indexChannels[index]?.id_channel
      )
    : null;

  // console.log(retChannel.name);

  const handleButtonClick = () => {
    if (!one && socket) {
      var message = {
        id_channel: channels.id_channel,
        id_sender: user.uid,
        content: inputValue.trim(),
      };
      socket.emit("newMessage", message);
      messageRef.current.value = null;
      message = null;
      one = true;
    }
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    one = false;
  };

  const handleEnterPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleButtonClick();
      one = false;
    }
  };

  const printOnline = () => {
    var m: number = 0;

    if (channel)
      channel.users?.map((obj) => {
        obj.status === "ONLINE" ? (m += 1) : (m += 0);
      });

    return m;
  };

  return (
    <div className="flex h-full pt-4 pb-14 w-full flex-col flex-grow flex-wrap justify-between">
      <div className="flex w-full h-[10%] justify-center items-end">
        <div className="flex flex-row h-[80%] w-[95%] items-center justify-between border-b-white border-b-[2px] border-solid">
          <div className="flex flex-row gap-3 items-center">
            <Avatar
              isBordered
              radius="sm"
              color="default"
              className="flex w-[60px] h-[60px] xs:w-[40px] xs:h-[40px] md_:w-[50px] md_:h-[50px] xl_:w-[60px] xl_:h-[60px]"
              src={channels?.avatar}
            />
            <div className="flex flex-col">
              <div className="text-[#424242] font-archivo font-[800] text-[26px] xs:text-[20px] md_:text-[26px]">
                {channels?.name}
              </div>
              <div className="text-[#00993D] font-[700] text-[15px] font-orbitron sm_:block xs:hidden">
                online: {printOnline()}{" "}
                {printOnline() > 1 ? "members" : "member"}
              </div>
            </div>
          </div>
          <div>
            <GroupDropdown
              channels={channels}
              refetch={refetch}
              joinRefetch={joinRefetch}
            ></GroupDropdown>
          </div>
        </div>
      </div>
      <div className="flex w-full h-[78%] flex-col justify-center items-center">
        <ChatDialog
          main={user}
          socket={socket}
          channel={retChannel}
          key={channels?.id_channel}
        />
      </div>
      <div className="flex w-[95%] h-[10%] justify-center border-t-white border-t-[2px] border-solid items-end self-center">
        <div className="search_input_chat w-full h-[60%] flex justify-center items-center ">
          <div className="center w-[98%] h-[90%] outline-none flex justify-center items-center overflow-hidden">
            <input
              type="text"
              placeholder="Type a message here ..."
              className="center text-[#9C9C9C] text-[16px] xs:placeholder:text-[12px] font-body placeholder:font-[500] placeholder-[#9C9C9C] pl-5 outline-none h-full w-[84%]"
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
              ref={messageRef}
            />
            <button
              type="submit"
              onClick={handleButtonClick}
            >
              <LuSend className="h-8 w-8 text-[#497174] xs:w-5 xs:h-5 xs:mr-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupsChat;
