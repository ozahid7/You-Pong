import React, { useEffect, useRef, useState } from "react";
import { Channel, User_Hero, whichChannel } from "@/types";
import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import { useGlobalContext } from "@/providers/SocketProvider";
import { usePathname } from "next/navigation";

interface HomeProps {
  channel: Channel;
  socket: any;
  main: User_Hero;
  Channels: whichChannel[];
  index: number;
}

export interface infoType {
  id_channel: string;
  id_sender: string;
  content: string;
  created_at: Date;
}

const MiniChat = ({ channel, socket, main, Channels, index }: HomeProps) => {
  const [orange, setOrange] = useState<boolean>(false);

  useEffect(() => {
    setOrange(false);
  }, [index]);

  useEffect(() => {
    socket?.on("addNotif", (obj) => {
      if (obj.is_message) {
        console.log(index, obj.info.id_channel);
        if (Channels[index]?.id_channel === obj.info.id_channel) {
          setOrange(false);
        } else if (channel.id_channel === obj.info.id_channel) {
          setOrange(true);
        }
      }
    });
  }, [index]);

  return (
    <div className="flex xxs:w-[10rem] xs:w-[11rem] sm_:w-[18rem] h-[60px] 3xl:w-[19.5rem] 2xl:w-[18rem] xl:w-[14.5rem] lg:w-[13rem] md:w-[8rem] rounded-md shadow-md md:h-[3rem] lg:h-[4rem] shadow-[rgba(0,0,0,0.25)] items-center justify-evenly flex-row bg-[#EFF5F5] ">
      <div className="flex">
        <Image
          width={44}
          height={44}
          className="flex lg:w-[40px] lg:h-[40px] md:w-[35px] md:h-[35px] xl:w-[45px] xl:h-[45px] border-[2px] border-white"
          src={channel?.avatar}
          alt="Channel's picture"
        />
      </div>
      <div className="w-[70%] h-full overflow-hidden flex justify-evenly flex-col items-center ">
        <p className="text-[#424242] font-archivo font-[800] md:text-[14px] text-[19px] whitespace-nowrap overflow-hidden text-ellipsis w-[90%] h-fit">
          {channel?.name}
        </p>
        <div className="text-[#686868] text-[14px] font-[500] w-[90%] h-fit whitespace-nowrap overflow-hidden text-ellipsis hidden lg:block">
          {channel?.description}
        </div>
      </div>
      {orange && (
        <span className="h-3 w-3 rounded-full absolute top-1 right-1 bg-palette-orange " />
      )}
    </div>
  );
};

export default MiniChat;
