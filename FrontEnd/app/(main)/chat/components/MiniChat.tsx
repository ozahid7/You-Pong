import React, { useEffect, useRef, useState } from "react";
import { Channel } from "@/types";
import { Avatar } from "@nextui-org/react";
interface HomeProps {
  channels: Channel;
}

const MiniChat = ({ channels }: HomeProps) => {
  return (
    <div className="flex w-full h-full 3xl_:w-[19.5rem] 2xl_:w-[18rem] xl_:w-[14.5rem] lg_:w-[13rem] md_:w-[8rem] rounded-sm shadow-md shadow-[rgba(0,0,0,0.25)] items-center justify-evenly flex-row bg-[#EFF5F5]">
      <Avatar
        isBordered
        radius="sm"
        color="default"
        className="flex w-[44px] h-[44px] "
        src={channels.avatar}
      />
      <div className="w-[70%] h-[80%] overflow-hidden xxs:hidden sm:block">
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
