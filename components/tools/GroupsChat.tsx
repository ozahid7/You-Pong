import React from "react";
import Image from "next/image";
import { LuMoreHorizontal, LuSend } from "react-icons/lu";
import { GroupDropdown } from "@/components";
import logo from "../../public/groups.svg"
import { Channel } from "@/types";

interface HomePage {
	channels: Channel;
}

const GroupsChat = ({channels} : HomePage) => {
  return (
    <div className="flex h-[95%] w-full flex-col ">
      <div className="flex w-full h-[10%] justify-center">
        <div className="flex flex-row h-full w-[95%] items-center justify-between border-b-white border-b-[2px] border-solid ">
          <div className="flex flex-row gap-3 items-center">
            <Image
              src={logo}
              className="flex w-[50px] h-[50px] border-[white] border-[2px]"
              alt="image"
            />
            <div className="flex flex-col">
              <div className="text-[#424242] font-archivo font-[800] text-[26px]">
                {channels.name}
              </div>
              <div className="text-[#00993D] font-[500] text-[15px] font-['Estedad']">
                online: 10 members
              </div>
            </div>
          </div>
          <div>
            <GroupDropdown
              icon={LuMoreHorizontal}
              style="text-palette-green border-[3px] border-palette-green cursor-pointer rounded-sm hover:scale-110"
              size={40}
            ></GroupDropdown>
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
              className="center text-[#9C9C9C] text-[16px] font-body placeholder:font-[500] placeholder-[#9C9C9C] pl-5 outline-none h-full w-[84%]"
            />
            <button>
              <LuSend className="h-8 w-8 text-[#497174]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupsChat;
