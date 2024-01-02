import React, { useEffect, useRef, useState } from "react";
import { LuMoreHorizontal, LuSend, LuSendHorizonal } from "react-icons/lu";
import { ChatDialog, DirectDropdown } from ".";
import { Channel, Member, User, User_Hero, whichChannel } from "@/types";
import { Avatar } from "@nextui-org/react";
import { fetchData_Channel, getChannel, getMembers } from "../data/api";
import { useQuery } from "react-query";
import { TbSend } from "react-icons/tb";
import Loader from "@/components/tools/Loader";
import { MyDropdown } from "@/components";
import { menuUserElements } from "@/const";
import { FiChevronDown } from "react-icons/fi";

interface HomePage {
  channels: Channel;
  socket: any;
  main: User_Hero;
  data: Channel[];
  indexChannels: whichChannel[];
  index: number;
}

var nameOne: boolean = false;

const Chat = ({
  channels,
  socket,
  main,
  data,
  indexChannels,
  index,
}: HomePage) => {
  const messageRef = useRef<HTMLInputElement>(null);
  var text: string;

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

  if (!channel || ChannelLoading) <Loader />;

  const retChannel: Channel | null = data
    ? data.find(
        (channel) => channel.id_channel === indexChannels[index]?.id_channel
      )
    : null;

  const user: User | null = channel
    ? channel.users.find((user) => user.id_user !== main.uid)
    : null;

  const handleButtonClick = () => {
    if (messageRef?.current.value === "") return;
    if (socket) {
      const message = {
        id_channel: channel.id_channel,
        id_sender: main.uid,
        content: messageRef?.current.value.trim(),
      };
      socket?.emit("newMessage", message);
      messageRef.current.value = null;
    }
  };

  const handleEnterPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleButtonClick();
    }
  };

  user?.status === "ONLINE"
    ? (text = "text-[#00993D]")
    : (text = "text-[#686868]");

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
              src={user?.avatar}
            />
            <div className="flex flex-col">
              <div className="text-[#424242] font-archivo font-[800] text-[26px] xs:text-[20px] md_:text-[26px]">
                {user?.username}
              </div>
              <div
                className={`${text} font-[600] text-[13px] font-orbitron sm_:block xs:hidden`}
              >
                {user?.status}
              </div>
            </div>
          </div>
          <div>
            <MyDropdown
              icon={FiChevronDown}
              placement="right-0"
              menuElements={menuUserElements}
              user={user?.username}
              uid={user?.id_user}
              status={user?.status}
              size={25}
              style="text-palette-green border-none"
            />
          </div>
        </div>
      </div>
      <div className="flex w-full h-[78%] flex-col justify-center items-center">
        <ChatDialog
          channel={retChannel}
          main={main}
          socket={socket}
          key={user?.id_user} //just added this
        />
      </div>
      <div className="flex w-[95%] h-[12%] justify-center border-t-white border-t-[2px] border-solid items-end self-center">
        <div className="search_input_chat w-full h-[60%] flex justify-center items-center min-w-[40px] max-w-[600px]">
          <div className="center w-[99%] h-[90%] outline-none flex justify-center items-center overflow-hidden gap-1">
            <input
              type="text"
              placeholder="Type a message here ..."
              className="center text-[#9C9C9C] text-[16px] xs:placeholder:text-[12px] font-body placeholder:font-[500] placeholder-[#9C9C9C] pl-5 outline-none h-full w-[90%]"
              onKeyDown={handleEnterPress}
              ref={messageRef}
            />
            <button
              type="submit"
              onClick={handleButtonClick}
            >
              <TbSend className="h-[30px] w-[30px] text-[#497174] mr-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
