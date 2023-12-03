import React, { useEffect, useRef, useState } from "react";
import { Channel } from "@/types";
import { Avatar } from "@nextui-org/react";
interface HomeProps {
  channels: Channel;
}

const MiniChat = ({ channels }: HomeProps) => {
  return (
    <div className="flex max-w-[420px] 2xl:w-[290px] xl:w-[125%] h-[8%] rounded-sm shadow-md shadow-[rgba(0,0,0,0.25)] items-center justify-evenly flex-row bg-[#EFF5F5] xl:w[300px]">
      <Avatar
        isBordered
        radius="sm"
        color="default"
        className="flex w-[44px] h-[44px] "
        src={`http://178.62.74.69:400/file/${channels.avatar}`}
      />
      <div className="w-[70%] h-[80%] overflow-hidden">
        <p className="text-[#424242] font-archivo font-[800] text-[19px]">
          {channels.name.length > 6
            ? channels.name.slice(0, 5) + "..."
            : channels.name}
        </p>
        <div className="text-[#686868] text-[14px] font-[500] w-full h-full">
          {channels.description}
        </div>
      </div>
    </div>
  );
};

export default MiniChat;
