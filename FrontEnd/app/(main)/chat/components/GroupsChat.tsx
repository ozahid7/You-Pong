"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LuMoreHorizontal, LuSend } from "react-icons/lu";
import { GroupDropdown } from ".";
import { Channel } from "@/types";
import { Avatar } from "@nextui-org/react";
import { getMembers } from "../data/api";
import { User } from "@/types";
import { MyDropdown } from "@/components";
import { FiChevronDown } from "react-icons/fi";

interface obj {
  channels: Channel;
}

const GroupsChat = ({ channels }: obj) => {
  const [user, setUser] = useState<User>();
  const [online, setOnline] = useState<number>(0);

  // useEffect(() => {
  //   const Members = async () => {
  //     const result = await getMembers();
  //     setUser(result);
  //     return result;
  //   };

  //   Members();
  // }, []);


  return (
    <div className="flex h-full pt-4 pb-14 w-full flex-col flex-grow flex-wrap justify-between ">
      <div className="flex w-full h-[10%] justify-center items-end">
        <div className="flex flex-row h-[80%] w-[95%] items-center justify-between border-b-white border-b-[2px] border-solid ">
          <div className="flex flex-row gap-3 items-center">
            <Avatar
              isBordered
              radius="sm"
              color="default"
              className="flex w-[60px] h-[60px] xs:w-[40px] xs:h-[40px]"
              src={`http://178.62.74.69:400/file/${channels.avatar}`}
            />
            <div className="flex flex-col">
              <div className="text-[#424242] font-archivo font-[800] text-[26px] xs:text-[20px]">
                {channels.name}
              </div>
              <div className="text-[#00993D] font-[500] text-[15px] font-['Estedad'] sm_:block xs:hidden">
                online: members
              </div>
            </div>
          </div>
          <div>
            <GroupDropdown channels={channels}></GroupDropdown>
          </div>
        </div>
      </div>
      <div className="flex w-full h-[78%] flex-col justify-center items-center"></div>
      <div className="flex w-[95%] h-[10%] justify-center border-t-white border-t-[2px] border-solid items-end self-center">
        <div className="search_input_chat w-full h-[60%] flex justify-center items-center ">
          <div className="center w-[98%] h-[90%] outline-none flex justify-center items-center overflow-hidden">
            <input
              type="text"
              placeholder="Type a message here ..."
              className="center text-[#9C9C9C] text-[16px] xs:placeholder:text-[12px] font-body placeholder:font-[500] placeholder-[#9C9C9C] pl-5 outline-none h-full w-[84%]"
            />
            <button>
              <LuSend className="h-8 w-8 text-[#497174] xs:w-5 xs:h-5 xs:mr-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupsChat;
