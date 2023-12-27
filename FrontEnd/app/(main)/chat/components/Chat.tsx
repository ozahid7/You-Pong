import React, { useEffect, useRef, useState } from "react";
import { LuMoreHorizontal, LuSend } from "react-icons/lu";
import { ChatDialog, ChatDropdown, DirectDropdown } from ".";
import { Channel, Member, User, User_Hero } from "@/types";
import { Avatar } from "@nextui-org/react";
import { fetchData_getMainUser, getChannel, getMembers } from "../data/api";
import useSWR from "swr";

interface HomePage {
  channels: Channel;
  socket: any;
  main: User_Hero;
}

var one: boolean = false;
var nameOne: boolean = false;

const Chat = ({ channels, socket, main }: HomePage) => {
  const messageRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const fetchData_Channel = async () => {
    try {
      const result = await getChannel(channels.id_channel || "");
      return result.object;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data } = useSWR<Channel>("/myChannel", fetchData_Channel);

  const handleButtonClick = () => {
    if (!one) {
      const message = {
        id_channel: data.id_channel,
        id_sender: main.uid,
        content: inputValue,
      };
      socket?.emit("newMessage", message);
      messageRef.current.value = null;
      one = true;
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    one = false;
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleButtonClick();
    }
  };

  const user: User | null = data
    ? data.users.find((user) => user.id_user !== main.uid) || null
    : null;

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
            </div>
          </div>
          <div>
            <DirectDropdown channels={channels} />
          </div>
        </div>
      </div>
      <div className="flex w-full h-[78%] flex-col justify-center items-center">
        <ChatDialog
          channel={channels}
          main={main}
          socket={socket}
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

export default Chat;
