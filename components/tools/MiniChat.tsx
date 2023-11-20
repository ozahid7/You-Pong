import React from "react";
import Image from "next/image";
import { Channel } from "@/types";
interface HomeProps {
  channels: Channel;
}

const MiniChat = ({ channels }: HomeProps) => {
  return (
    <div className="flex w-[280px] h-[10%] rounded-sm shadow-md shadow-[rgba(0,0,0,0.25)] items-center justify-evenly flex-row bg-[#EFF5F5] 2xl:w-[20rem] xl:w-[15rem] lg:w-[13.5rem] md:w-[10rem] sm:w-[3.1rem] xs:w-[3rem]">
      <Image
        src={`http://178.62.74.69:400/file/${channels.avatar}`}
        alt="image"
        width={50}
        height={50}
        className="w-[50px] h-[50px] border-[white] border-[2px] xs:w-[60px] xs:h-[60px]"
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
