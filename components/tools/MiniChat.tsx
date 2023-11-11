import React from "react";
import Image, { StaticImageData } from "next/image";

interface Props {
  image: StaticImageData;
  name: string;
}

export function MiniChat({ image, name }: Props) {
  return (
    <div className="flex w-[90%] h-[10%] rounded-md shadow-md shadow-[rgba(0,0,0,0.25)] items-center justify-evenly flex-row bg-[#EFF5F5]">
      <Image
        src={image}
        alt="ozahid"
        className="w-[50px] h-[50px] border-[white] border-[2px]"
      />
      <div className="w-[70%] h-[80%] overflow-hidden">
        <p className="text-[#424242] font-archivo font-[800] text-[19px]">
          {name}
        </p>
        <div className="text-[#686868] text-[14px] font-[500]">
          Lorem Ipsum is simply dummy text
        </div>
      </div>
    </div>
  );
}

export default MiniChat;
