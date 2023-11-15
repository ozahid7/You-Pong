import React from "react";
import Image from "next/image";
import { channel_type, Channel } from "@/types";

interface HomeProps {
  channels: Channel;
}

export function MiniChatGroups({ channels }: HomeProps) {
  if (channels.type == channel_type.DIRECT) return(<></>);
  return (
    <div className="flex w-[90%] h-[10%] rounded-sm shadow-md shadow-[rgba(0,0,0,0.25)] items-center justify-evenly flex-row bg-[#EFF5F5]">
      <Image
        src={channels.avatar}
        alt="ozahid"
        className="w-[50px] h-[50px] border-[white] border-[2px]"
      />
      <div className="w-[70%] h-[80%] overflow-hidden">
        <p className="text-[#424242] font-archivo font-[800] text-[19px]">
          {channels.name}
        </p>
        <div className="text-[#686868] text-[14px] font-[500]">
          Lorem Ipsum is simply dummy text
        </div>
      </div>
    </div>
  );
}

export default MiniChatGroups;
