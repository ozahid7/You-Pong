import React, { useRef, useState, Fragment } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { LuBellOff, LuTimer } from "react-icons/lu";
import { Channel, Member } from "@/types";
import {
  MuteMember,
  UnMuteMember,
  fetchData_getMembers,
  getMembers,
} from "../data/api";
import { useQuery } from "react-query";
import { Menu } from "@headlessui/react";
import { IconContext } from "react-icons";

interface Props {
  user: Member;
  channel: Channel | null;
  membersRefetch: any;
  onClose: () => void;
  channelsRefetch: any;
}

export default function MuteDropDown({
  user,
  channel,
  onClose,
  membersRefetch,
  channelsRefetch,
}: Props) {
  const muteRef1 = useRef<HTMLDivElement>(null);
  const muteRef5 = useRef<HTMLDivElement>(null);
  const muteRef15 = useRef<HTMLDivElement>(null);

  const Handle_1Minute = async () => {
    const success = await MuteMember(
      channel?.id_channel,
      user.user.id_user,
      60000
    );
    if (success?.message === "Channel Updated Succefully") {
      membersRefetch();
      channelsRefetch();
      const timeoutId = setTimeout(membersRefetch(), 60000);
      return clearTimeout(timeoutId), onClose();
    }
  };
  const Handle_5Minutes = async () => {
    const success = await MuteMember(
      channel?.id_channel,
      user.user.id_user,
      300000
    );
    if (success?.message === "Channel Updated Succefully") {
      membersRefetch();
      channelsRefetch();
      const timeoutId = setTimeout(membersRefetch(), 300000);
      clearTimeout(timeoutId);
      onClose();
      return ;
    }
  };
  const Handle_15Minutes = async () => {
    const success = await MuteMember(
      channel?.id_channel,
      user.user.id_user,
      900000
    );
    if (success?.message === "Channel Updated Succefully") {
      membersRefetch();
      channelsRefetch();
      const timeoutId = setTimeout(membersRefetch(), 900000);
      clearTimeout(timeoutId);
      onClose();
      return;
    }
  };

  const HandleUnmute = async () => {
    if (user.member_status === "MUTED") {
      const success = await UnMuteMember(
        channel?.id_channel,
        user.user.id_user
      );
      if (success?.message === "Channel Updated Succefully") {
        channelsRefetch();
        membersRefetch();
        onClose();
      }
    }
  };
  return (
    <Menu>
      <Menu.Button
        role="button"
        className="py-2 z-10 px-4 w-full min-w-[140px] cursor-pointer border-b border-palette-grey font-body font-bold flex items-center space-x-4 text-palette-orange hover:bg-palette-green hover:text-white"
        onClick={HandleUnmute}>
        <LuBellOff />
        <p>
          {user.member_status === "MUTED" ? "Unmute" : "Mute"}
        </p>
      </Menu.Button>
      <Menu.Items
        className="flex flex-col border-2 border-palette-green divide-y rounded-md h-auto outline-none drop-shadow-lg z-[1000] bg-palette-white top-full w-[90%] absolute gap-1"
        unmount={false}>
        {user.member_status !== "MUTED" ? (
          <Fragment>
            <Menu.Item
              key="1minute"
              as="div"
            >
              <div
                role="button"
                className="flex flex-row gap-2 items-center  bg-palette-white text-palette-green hover:bg-palette-green hover:text-palette-white hover:border-palette-white w-full h-full text-[16px] font-russo rounded-sm"
                ref={muteRef1}
                onClick={Handle_1Minute}
              >
                <LuTimer className="text-palette-orange " size={20} />
                <p>
                  1 Minute
                </p>
              </div>
            </Menu.Item>
            <Menu.Item
              key="5minutes"
              as="div"
            >
              <div
                role="button"
                className="flex flex-row gap-2 items-center  bg-palette-white text-palette-green hover:bg-palette-green hover:text-palette-white hover:border-palette-white w-full h-full text-[16px] font-russo rounded-sm"
                ref={muteRef5}
                onClick={Handle_5Minutes}
              >
                <LuTimer className="text-palette-orange " size={20} />
                <p>
                  5 Minutes
                </p>
              </div>
            </Menu.Item>
            <Menu.Item
              key="15minutes"
              as="div"
            >
              <div
                role="button"
                className="flex flex-row gap-2 items-center  bg-palette-white text-palette-green hover:bg-palette-green hover:text-palette-white hover:border-palette-white w-full h-full text-[16px] font-russo rounded-sm"
                ref={muteRef15}
                onClick={Handle_15Minutes}
              >
                <LuTimer className="text-palette-orange " size={20} />
                <p>
                  15 Minutes
                </p>
              </div>
            </Menu.Item>
          </Fragment>
        ) :
          ""}
      </Menu.Items>
    </Menu>
  );
}
