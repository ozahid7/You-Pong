import React from "react";
import Image from "next/image";
import { Channel } from "@/types";
import { Avatar } from "@nextui-org/react";
interface HomeProps {
  channels: Channel;
}

const MiniChat = ({ channels }: HomeProps) => {
  return (
    <div className="flex w-[280px] h-[8%] rounded-sm shadow-md shadow-[rgba(0,0,0,0.25)] items-center justify-evenly flex-row bg-[#EFF5F5] 2xl:w-[20rem] xl:w-[15rem] lg:w-[13.5rem] md:w-[10rem] sm:w-[3.1rem] xs:w-[3rem]">
      <Avatar
        isBordered
        radius="sm"
        color="default"
        className="flex w-[44px] h-[44px] "
        src={`http://178.62.74.69:400/file/${channels.avatar}`}
      />
      <div className="w-[70%] h-[80%] overflow-hidden">
        <p className="text-[#424242] font-archivo font-[800] text-[19px]">
          {channels.name}
        </p>
        <div className="text-[#686868] text-[14px] font-[500] w-full h-full">
          {channels.description}
        </div>
      </div>
    </div>
  );
};

export default MiniChat;
