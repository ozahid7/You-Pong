import { Channel } from "@/types";
import { Button } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import { joinChannel } from "../data/api";
import { IoEnterOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import Loader from "@/components/tools/Loader";

interface Props {
  obj: Channel;
  close: any;
  refetch: any;
  joinRefetch: any;
}

const SimpleJoinButton = ({ obj, close, refetch, joinRefetch }: Props) => {
  const join = async () => {
    const success = await joinChannel(obj.id_channel, null);
    if (success.message === "Channel Updated Succefully") {
      refetch();
      joinRefetch();
      close();
    } else console.error(success.message);
  };

  return (
    <button
      className={`flex btn btn-xs xs:btn-md lg:btn-lg font-body font-[700] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green`}
      onClick={join}
    >
      <div className="hidden md:block">
        <IoEnterOutline />
      </div>
      Join
    </button>
  );
};

export default SimpleJoinButton;
