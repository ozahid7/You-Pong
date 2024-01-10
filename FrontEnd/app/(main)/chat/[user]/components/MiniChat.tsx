import React, { useEffect, useRef, useState } from "react";
import { Channel } from "@/types";
import { Avatar } from "@nextui-org/react";
interface HomeProps {
  channels: Channel;
}

const MiniChat = ({ channels }: HomeProps) => {
  return (
    <div className="flex xxs:w-[10rem] fold:w-[13rem] h-[60px] 3xl:w-[19.5rem] 2xl:w-[18rem] xl:w-[14.5rem] lg:w-[13rem] md:w-[8rem] rounded-sm shadow-md shadow-[rgba(0,0,0,0.25)] items-center justify-evenly flex-row bg-[#EFF5F5]">
      <Avatar
        isBordered
        radius="none"
        color="default"
        className="flex w-[44px] h-[44px] "
        src={channels.avatar}
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
