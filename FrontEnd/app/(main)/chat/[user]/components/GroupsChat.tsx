"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChatDialog, GroupDropdown } from ".";
import { Channel, Member, Message, User_Hero, whichChannel } from "@/types";
import { Avatar } from "@nextui-org/react";
import { fetchData_Channel, fetchData_getMembers } from "../data/api";
import { User } from "@/types";
import { MyDropdown } from "@/components";
import { useQuery } from "react-query";
import { TbSend, TbSendOff } from "react-icons/tb";
import Loader from "@/components/tools/Loader";
import { Menu } from "@headlessui/react";
import { IconContext } from "react-icons";
import {
  MdOutlineFaceRetouchingOff,
  MdOutlineFaceUnlock,
} from "react-icons/md";
import { useGlobalContext } from "@/providers/SocketProvider";

interface EmojiProps {
  onEmojiSelect: any;
  disable: boolean;
}

export const EmojiDropDown = ({ onEmojiSelect, disable }: EmojiProps) => {
  const emojis: string[] = ["😀", "😂", "👍", "❤️", "😍", "😎", "🎉"];

  return (
    <Menu
      as="div"
      className="relative text-left"
    >
      <Menu.Button className="flex self-center text-[20px] text-palette-green">
        {({ active }) => (
          <div
            className={`${
              active ? "text-palette-orange" : "text-palette-green"
            } text-[30px] hover:text-palette-orange`}
          >
            {disable ? <MdOutlineFaceRetouchingOff /> : <MdOutlineFaceUnlock />}
          </div>
        )}
      </Menu.Button>
      <Menu.Items className="absolute bottom-0 mb-10 right-0 z-10 bg-white rounded-md shadow-lg overflow-hidden">
        <div className="flex p-2 space-x-1">
          {emojis.map((emoji) => (
            <Menu.Item
              key={emoji}
              as="button"
              className={`text-xl`}
              disabled={disable}
            >
              {({ active }) => (
                <div
                  role="button"
                  className={` ${
                    active
                      ? "bg-palette-orange text-white"
                      : "text-palette-green"
                  } rounded-md`}
                  onClick={() => onEmojiSelect(emoji)}
                >
                  {emoji}
                </div>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};

interface obj {
  channels: Channel;
  socket: any;
  MainUser: User_Hero;
  indexChannels: whichChannel[];
  index: number;
  channelsRefetch: any;
  joinRefetch: any;
  data: Channel[];
}

interface Chat {
  view: boolean;
  id_channel: string;
  id_sender: string;
}

const GroupsChat = ({
  channels,
  socket,
  MainUser,
  indexChannels,
  data,
  index,
  channelsRefetch,
  joinRefetch,
}: obj) => {
  const messageRef = useRef<HTMLInputElement>(null);

  var mutedMember = {
    placeholder: "Type a message here ...",
    disabled: false,
  };

  const {
    data: channel,
    error: ChannelError,
    isLoading: ChannelLoading,
    refetch: mainChannel,
  } = useQuery<Channel, Error>(
    ["channel", channels?.id_channel],
    () => fetchData_Channel(channels?.id_channel),
    {
      onError: (error: Error) => {
        console.error("Messages query error:", error);
      },
    }
  );

  const {
    data: Members,
    error: MembersError,
    isLoading: MembersLoading,
    refetch: membersRefetch,
  } = useQuery<Member[], Error>(
    ["Members", channels?.id_channel],
    () => fetchData_getMembers(channels?.id_channel),
    {
      onError: (error: Error) => {
        console.error("Messages query error:", error);
      },
    }
  );

  const addEmoji = (emoji: string) => {
    if (messageRef.current && !mutedMember.disabled) {
      messageRef.current.value += emoji;
      messageRef.current.focus(); // Optional: bring focus back to input after emoji selection
    }
  };

  if (ChannelLoading || MembersLoading) <Loader />;

  const retChannel: Channel | null = data
    ? data.find(
        (channel) => channel.id_channel === indexChannels[index]?.id_channel
      )
    : null;

  const retMember: Member | null = Members
    ? Members.find((member) => member.user.id_user === MainUser?.uid)
    : null;

  if (retMember)
    if (retMember.member_status === "MUTED") {
      mutedMember.placeholder = "You can't send a message ...";
      mutedMember.disabled = true;
    } else {
      mutedMember.placeholder = "Type a message here ...";
      mutedMember.disabled = false;
    }

  const handleButtonClick = () => {
    if (messageRef?.current.value === "") return;
    if (socket) {
      var message = {
        id_channel: channels.id_channel,
        id_sender: MainUser.uid,
        content: messageRef?.current.value.trim(),
      };
      socket.emit("newMessage", message);
      messageRef.current.value = null;
      message = null;
    }
  };

  const handleEnterPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleButtonClick();
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
    <div className="flex h-[93%] md:h-full w-full flex-col flex-grow flex-wrap gap-2 md:mt-0 mt-8 ">
      <div className="flex w-full h-[10%] justify-center items-end mt-2">
        <div className="flex flex-row h-[80%] w-[95%] items-center justify-between border-b-white border-b-[2px] border-solid">
          <div className="flex flex-row gap-3 items-center xl:mb-5">
            <div className="flex">
              <Image
                src={channels?.avatar}
                width={60}
                height={60}
                className="flex w-[60px] h-[60px] xxs:w-[40px] xxs:h-[40px] md:w-[40px] md:h-[40px] lg:w-[45px] lg:h-[45px] xl:w-[55px] xl:h-[55px] border-white border-[2px] rounded-md"
                alt="Channel's picture"
              />
            </div>
            <div className="flex flex-col justify-evenly">
              <div className="text-[#424242] font-archivo font-[800] xxs:text-[18px] xs:text-[20px] md:text-[20px] lg:text-[22px] xl:text-[25px] whitespace-nowrap overflow-hidden text-ellipsis md:max-w-[200px] lg:max-w-[300px] xl:max-w-[380px] sm:max-w-[300px] sm_:max-w-[200px] xs:max-w-[100px] xxs:max-w-[80px]">
                {channels?.name}
              </div>
              <div className="text-[#00993D] font-[700] text-[15px] md:text-[12px] lg:text-[12px] xl:text-[15px] mb-1 font-orbitron md:block hidden">
                online: {printOnline()}{" "}
                {printOnline() > 1 ? "members" : "member"}
              </div>
            </div>
          </div>
          <div>
            <GroupDropdown
              channels={channels}
              channelsRefetch={channelsRefetch}
              mainChannelRefetch={mainChannel}
              joinRefetch={joinRefetch}
            ></GroupDropdown>
          </div>
        </div>
      </div>
      <div className="flex w-full h-[71%] md:h-[71%] flex-col justify-center items-center">
        <ChatDialog
          main={MainUser}
          socket={socket}
          channel={retChannel}
          key={channels?.id_channel}
        />
      </div>
      <div className="w-[95%] h-[13%] md:h-[10%] border-t-white border-t-[2px] border-solid flex justify-center self-center gap-1">
        <div className="flex w-full h-full gap-2 mt-1 items-center">
          <div className="search_input_chat w-full h-[60px] flex justify-center items-center min-w-[40px] max-w-[600px]">
            <div className="center w-[99%] h-[90%] outline-none flex justify-center items-center overflow-hidden ">
              <input
                type="text"
                placeholder={mutedMember.placeholder}
                className="center text-[#9C9C9C] md:placeholder:text-[16px] font-body placeholder:font-[500] placeholder-[#9C9C9C] pl-5 outline-none h-full w-[90%] xxs:placeholder:text-[10px]"
                onKeyDown={handleEnterPress}
                ref={messageRef}
                disabled={mutedMember.disabled}
              />
              <button
                type="submit"
                onClick={handleButtonClick}
                disabled={mutedMember.disabled}
              >
                {mutedMember.disabled === false ? (
                  <TbSend className="h-[30px] w-[30px] text-palette-green mr-2 hover:text-palette-orange" />
                ) : (
                  <TbSendOff className="h-[30px] w-[30px] text-palette-green mr-2 hover:text-palette-orange" />
                )}
              </button>
            </div>
          </div>
          <div className="w-fit h-full flex items-center justify-center">
            <EmojiDropDown
              onEmojiSelect={addEmoji}
              disable={mutedMember.disabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupsChat;
