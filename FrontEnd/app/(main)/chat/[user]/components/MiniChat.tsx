import React, { useEffect, useRef, useState } from "react";
import { Channel, User_Hero, whichChannel } from "@/types";
import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import { useGlobalContext } from "@/providers/SocketProvider";
import { usePathname } from "next/navigation";

interface HomeProps {
  channel: Channel;
  Channels: whichChannel[];
  index: number;
}

interface Chat {
  id_channel: string;
  index: number;
  bool: boolean;
}

let dot: boolean = false;

const MiniChat = ({ channel, Channels, index }: HomeProps) => {
  const { id, isMessage } = useGlobalContext();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const initialChats = Channels.map((channel) => ({
      id_channel: channel.id_channel,
      index: channel.index,
      bool: false,
    }));
    setChats(initialChats);
  }, [Channels]);

  useEffect(() => {
    chats.map((chat: Chat) => {
      if (
        chat.id_channel === id &&
        chat.id_channel !== Channels[index]?.id_channel
      )
        chat.bool = true;
    });
  }, [isMessage]);

  dot = chats.some(
    (chat) => chat.id_channel === channel.id_channel && chat.bool
  );

  useEffect(() => {
    if (chats[index] && Channels[index]?.id_channel === channel.id_channel) {
      chats[index].bool = false;
      dot = false;
    }
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
      {dot && (
        <span className="h-3 w-3 rounded-full absolute top-1 right-1 bg-palette-orange " />
      )}
    </div>
  );
};

export default MiniChat;
