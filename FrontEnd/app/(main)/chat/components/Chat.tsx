import React from "react";
import Image from "next/image";
import { LuMoreHorizontal, LuSend } from "react-icons/lu";
import { ChatDropdown } from "../components"
import { Channel } from "@/types";
import { getFile } from "@/app/(main)/chat/data/api";
import { Avatar } from "@nextui-org/react";

interface HomePage {
  channels: Channel;
}

const Chat = ({ channels }: HomePage) => {
  return (
    <div className="flex h-[95%] w-full flex-col ">
      <div className="flex w-full h-[10%] justify-center">
        <div className="flex flex-row h-full w-[95%] items-center justify-between border-b-white border-b-[2px] border-solid ">
          <div className="flex flex-row gap-3 items-center">
            <Avatar
              isBordered
              radius="sm"
              color="default"
              className="flex w-[60px] h-[60px]"
              src={channels.avatar}
            />
            <div className="flex flex-col">
              <div className="text-[#424242] font-archivo font-[800] xs:text-[20px] md:text-[25px]">
                {channels.name}
              </div>
              <div className="text-[#00993D] font-[500] font-['Estedad'] xs:text-[13px] md:text-[16px]">
                online
              </div>
            </div>
          </div>
          <div>
            <ChatDropdown
              icon={LuMoreHorizontal}
              style="text-palette-green border-[3px] border-palette-green cursor-pointer rounded-sm hover:scale-110 xs:w-[30px] xs:h-[30px] md:w-[40px] md:h-[40px]"
              size={40}
            ></ChatDropdown>
          </div>
        </div>
      </div>
      <div className="flex w-full h-[78%] flex-col justify-center items-center"></div>
      <div className="flex w-[95%] h-[12%] justify-center border-t-white border-t-[2px] border-solid items-center self-center">
        <div className="search_input_chat w-full h-[60%] flex justify-center items-center ">
          <div className="center w-[98%] h-[90%] outline-none flex justify-center items-center overflow-hidden">
            <input
              type="text"
              placeholder="Type a message here ..."
              className="center text-[#9C9C9C] text-[20px] xl:text-[18px] md:text-[17px] xs:text-[14px] font-body placeholder:font-[500] placeholder-[#9C9C9C] pl-5 outline-none h-full w-[84%]"
            />
            <button>
              <LuSend className="text-[#497174] xs:w-6 xs:h-6 xl:w-8 xl:h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
