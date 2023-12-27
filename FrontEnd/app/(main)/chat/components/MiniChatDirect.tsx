import React, { useEffect, useRef, useState } from "react";
import { Channel, User, User_Hero } from "@/types";
import { Avatar } from "@nextui-org/react";
import useSWR from "swr";
import { getChannel } from "../data/api";

interface HomeProps {
  channels: Channel;
  main: User_Hero;
}

const MiniChatDirect = ({ channels, main }: HomeProps) => {
  const fetchData_Channel = async () => {
    try {
      const result = await getChannel(channels.id_channel || "");
      return result.object;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { data } = useSWR<Channel>("/myChannel", fetchData_Channel);

  const user: User | null = data
    ? data.users.find((user) => user.id_user !== main.uid) || null
    : null;

  return (
    <div className="flex w-full h-full 3xl_:w-[19.5rem] 2xl_:w-[18rem] xl_:w-[14.5rem] lg_:w-[13rem] md_:w-[8rem] rounded-sm shadow-md shadow-[rgba(0,0,0,0.25)] items-center justify-evenly flex-row bg-[#EFF5F5]">
      <Avatar
        isBordered
        radius="sm"
        color="default"
        className="flex w-[44px] h-[44px] "
        src={user?.avatar}
      />
      <div className="w-[70%] h-[80%] overflow-hidden xxs:hidden sm:block">
        <p className="text-[#424242] font-archivo font-[800] text-[19px]">
          {user?.username}
        </p>
      </div>
    </div>
  );
};

export default MiniChatDirect;
