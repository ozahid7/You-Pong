import React, { useEffect, useRef, useState } from "react";
import { Channel } from "@/types";
import { Avatar } from "@nextui-org/react";
import Image from "next/image";

interface HomeProps {
  channels: Channel;
}

const MiniChat = ({ channels }: HomeProps) => {
  return (
    <div className="flex xxs:w-[10rem] xs:w-[11rem] sm_:w-[18rem] h-[60px] 3xl:w-[19.5rem] 2xl:w-[18rem] xl:w-[14.5rem] lg:w-[13rem] md:w-[8rem] rounded-md shadow-md md:h-[3rem] lg:h-[4rem] shadow-[rgba(0,0,0,0.25)] items-center justify-evenly flex-row bg-[#EFF5F5] ">
      <div className="flex">
        <Image
          width={44}
          height={44}
          className="flex lg:w-[40px] lg:h-[40px] md:w-[35px] md:h-[35px] xl:w-[45px] xl:h-[45px] border-[2px] border-white"
          src={channels?.avatar}
          alt="Channel's picture"
        />
      </div>
      <div className="w-[70%] h-full overflow-hidden flex justify-evenly flex-col items-center ">
        <p className="text-[#424242] font-archivo font-[800] md:text-[14px] text-[19px] whitespace-nowrap overflow-hidden text-ellipsis w-[90%] h-fit">
          {channels?.name}
        </p>
        <div className="text-[#686868] text-[14px] font-[500] w-[90%] h-fit whitespace-nowrap overflow-hidden text-ellipsis hidden lg:block">
          {channels?.description}
        </div>
      </div>
    </div>
  );
};

export default MiniChat;
