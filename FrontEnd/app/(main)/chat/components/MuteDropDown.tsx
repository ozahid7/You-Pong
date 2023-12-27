import React, { useRef, useState } from "react";
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

interface Props {
  user: Member;
  channel: Channel | null;
  onClose: () => void;
}

export default function MuteDropDown({ user, channel, onClose }: Props) {
  const muteRef1 = useRef<HTMLButtonElement>(null);
  const muteRef5 = useRef<HTMLButtonElement>(null);
  const muteRef15 = useRef<HTMLButtonElement>(null);

  const {
    data: Users,
    error: membersError,
    isLoading: membersLoading,
  } = useQuery<Member[], Error>(
    ["members", channel?.id_channel],
    () => fetchData_getMembers(channel?.id_channel),
    {
      onError: (error: Error) => {
        console.error("Members query error:", error);
      },
    }
  );

  const Handle_1Minute = () => {
    MuteMember(channel?.id_channel, user.user.username, 60000);
    // mutate(fetchData_getMembers);
    onClose();
  };
  const Handle_5Minutes = () => {
    MuteMember(channel?.id_channel, user.user.username, 300000);
    // mutate(fetchData_getMembers);
    onClose();
  };
  const Handle_15Minutes = () => {
    MuteMember(channel?.id_channel, user.user.username, 900000);
    // mutate(fetchData_getMembers);
    onClose();
  };

  const HandleUnmute = () => {
    if (user.member_status === "MUTED") {
      UnMuteMember(channel?.id_channel, user.user.username);
      // mutate(fetchData_getMembers);
      onClose();
    }
  };
  return (
    <Popover
      placement="bottom"
      showArrow
      aria-label="Mute"
    >
      <PopoverTrigger>
        <Button
          className="flex flex-row gap-2 items-center btn bg-palette-orange text-palette-white hover:bg-palette-white hover:text-palette-green hover:border-palette-green w-full h-full"
          onClick={HandleUnmute}
        >
          <LuBellOff />
          {user.member_status === "MUTED" ? "Unmute" : "Mute"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {user.member_status !== "MUTED" ? (
          <ul className="menu bg-base-200 w-40 rounded-box gap-1 ">
            <li onClick={Handle_1Minute}>
              <button
                className="flex flex-row gap-2 items-center btn-sm bg-palette-green text-palette-white hover:bg-palette-white hover:text-palette-green hover:border-palette-green w-full h-full text-[16px] font-russo"
                ref={muteRef1}
              >
                <LuTimer />1 Minute
              </button>
            </li>
            <li onClick={Handle_5Minutes}>
              <button
                className="flex flex-row gap-2 items-center btn-sm bg-palette-green text-palette-white hover:bg-palette-white hover:text-palette-green hover:border-palette-green w-full h-full text-[16px] font-russo"
                ref={muteRef5}
              >
                <LuTimer />5 Minutes
              </button>
            </li>
            <li onClick={Handle_15Minutes}>
              <button
                className="flex flex-row gap-2 items-center btn-sm bg-palette-green text-palette-white hover:bg-palette-white hover:text-palette-green hover:border-palette-green w-full h-full text-[16px] font-russo"
                ref={muteRef15}
              >
                <LuTimer />
                15 Minutes
              </button>
            </li>
          </ul>
        ) : (
          <div>{user.user.username} is Unmuted</div>
        )}
      </PopoverContent>
    </Popover>
  );
}
