import React, { useEffect, useRef, useState } from "react";
import { Channel, User, User_Hero } from "@/types";
import { Avatar } from "@nextui-org/react";
import { fetchData_Channel, getChannel } from "../data/api";
import { useQuery } from "react-query";
import Loader from "@/components/tools/Loader";

interface HomeProps {
  channels: Channel;
  main: User_Hero;
}

const MiniChatDirect = ({ channels, main }: HomeProps) => {
  const {
    data,
    error: ChannelError,
    isLoading: ChannelLoading,
  } = useQuery<Channel, Error>(
    ["channel", channels?.id_channel],
    () => fetchData_Channel(channels?.id_channel),
    {
      onError: (error: Error) => {
        console.error("Messages query error:", error);
      },
    }
  );

  if (ChannelLoading) <Loader />;

  const user: User | null = data
    ? data.users.find((user) => user.id_user !== main.uid) || null
    : null;

  return (
    <div className="flex w-full h-[60px] 3xl_:w-[19.5rem] 2xl_:w-[18rem] xl_:w-[14.5rem] lg_:w-[13rem] md_:w-[8rem] rounded-sm shadow-md items-center justify-evenly flex-row bg-[#EFF5F5]">
      <Avatar
        isBordered
        radius="none"
        color="default"
        className="flex w-[44px] h-[44px] "
        src={user?.avatar}
      />
      <div className="flex w-[70%] h-[80%] overflow-hidden xxs:hidden sm:block text-[#424242] font-archivo font-[800] text-[19px] flex-col content-center">
        <p className="whitespace-nowrap overflow-hidden text-ellipsis">
          {user?.username}
        </p>
      </div>
    </div>
  );
};

export default MiniChatDirect;
