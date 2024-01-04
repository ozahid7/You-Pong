"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  LuMoreHorizontal,
  LuSend,
  LuSendHorizonal,
  LuSmile,
} from "react-icons/lu";
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
    <div className="flex h-full pt-4 pb-14 w-full flex-col flex-grow flex-wrap justify-between">
      <div className="flex w-full h-[10%] justify-center items-end">
        <div className="flex flex-row h-[80%] w-[95%] items-center justify-between border-b-white border-b-[2px] border-solid">
          <div className="flex flex-row gap-4 items-center xl_:mb-5">
            <Avatar
              isBordered
              radius="none"
              color="default"
              className="flex w-[60px] h-[60px] xs:w-[40px] xs:h-[40px] md_:w-[50px] md_:h-[50px]"
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
              channelsRefetch={channelsRefetch}
              mainChannelRefetch={mainChannel}
              joinRefetch={joinRefetch}
            ></GroupDropdown>
          </div>
        </div>
      </div>
      <div className="flex w-full h-[78%] flex-col justify-center items-center">
        <ChatDialog
          main={MainUser}
          socket={socket}
          channel={retChannel}
          key={channels?.id_channel}
        />
      </div>
      <div className="flex w-[95%] h-[12%] justify-center border-t-white border-t-[2px] border-solid items-end self-center gap-2">
        <div className="search_input_chat w-full h-[60%] flex justify-center items-center min-w-[40px] max-w-[600px]">
          <div className="center w-[99%] h-[90%] outline-none flex justify-center items-center overflow-hidden gap-1">
            <input
              type="text"
              placeholder={mutedMember.placeholder}
              className="center text-[#9C9C9C] text-[16px] xs:placeholder:text-[12px] font-body placeholder:font-[500] placeholder-[#9C9C9C] pl-5 outline-none h-full w-[90%]"
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
        <div className="w-fit h-[60%] flex items-center justify-center">
          <EmojiDropDown
            onEmojiSelect={addEmoji}
            disable={mutedMember.disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupsChat;
