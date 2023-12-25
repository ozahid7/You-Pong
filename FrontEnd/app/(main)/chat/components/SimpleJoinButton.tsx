import { Channel } from "@/types";
import { Button } from "@nextui-org/react";
import React, { useRef } from "react";
import { fetchData_userChannels, joinChannel } from "../data/api";
import { mutate } from "swr";
import { IoEnterOutline } from "react-icons/io5";

interface Props {
  obj: Channel;
  close: any;
}

const SimpleJoinButton = ({ obj, close }: Props) => {
  const join = () => {
    joinChannel(obj.id_channel, null);
    mutate(fetchData_userChannels);
    close();
  };

  return (
    <Button
      size="lg"
      className={`flex mt-1 text-[20px] btn xs:btn-xs sm:btn-sm md:btn-md font-body font-[600] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green`}
      onClick={join}
    >
      <IoEnterOutline />
      Join
    </Button>
  );
};

export default SimpleJoinButton;
