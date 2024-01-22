import React, { Fragment } from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from "@nextui-org/react";
import { LuArrowDown, LuStar, LuUser, LuDoorOpen, LuBan } from "react-icons/lu";
import { Channel, Member } from "@/types";
import { MuteDropDown } from ".";
import {
  BanMember,
  KickMember,
  SetAdmin,
  SetMember,
  UnBanMember,
  getMembers,
} from "../data/api";
import { Menu } from "@headlessui/react";
import { IconContext } from "react-icons";

interface Props {
  disable: string;
  user: Member;
  channel: Channel | null;
  membersRefetch: any;
  channelsRefetch: any;
  mainChannelRefetch: any;
}

const JoinDropDown = ({
  disable,
  user,
  channel,
  membersRefetch,
  channelsRefetch,
  mainChannelRefetch,
}: Props) => {
  const { onClose, onOpenChange, onOpen, isOpen } = useDisclosure();

  const HandleKick = async () => {
    const kick = await KickMember(channel?.id_channel, user.user.id_user);
    if (kick?.message === "Channel Updated Succefully") {
      membersRefetch();
      channelsRefetch();
      onClose();
    } else console.error(kick?.message);
  };

  const HandleBan = async () => {
    let Ban = null;
    user.member_status !== "BANNED"
      ? (Ban = await BanMember(channel?.id_channel, user.user.id_user))
      : (Ban = await UnBanMember(channel?.id_channel, user.user.id_user));
    if (Ban)
      if (Ban.message === "Channel Updated Succefully") {
        membersRefetch();
        channelsRefetch();
      } else console.error(Ban.message);
  };

  const HandleAdmin = async () => {
    let admin = null;
    user.user_role === "MEMBER"
      ? (admin = await SetAdmin(channel?.id_channel, user.user.id_user))
      : (admin = await SetMember(channel?.id_channel, user.user.id_user));
    if (admin?.message === "Channel Updated Succefully") {
      membersRefetch();
    } else console.error(admin?.message);
  };

  return (
    <div className="flex flex-col justify-center relative">
      <Menu>
        <Menu.Button className={`flex btn ${disable} xs:btn-xs sm:btn-sm md:btn-md font-body font-[700] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green`}>
          Action
          <LuArrowDown />
        </Menu.Button>
        <Menu.Items
          className="flex flex-col border-2 border-palette-green divide-y rounded-md h-auto outline-none w-auto drop-shadow-lg bg-palette-white bottom-full right-0 absolute z-[1000]"
          unmount={false}
        >
          <Menu.Item
            key="SetAs"
            as="div"
          >
            <div
              role="button"
              className="py-2 z-10 px-4 min-w-[170px] cursor-pointer border-b border-palette-grey font-body font-bold flex items-center space-x-4 text-palette-green hover:bg-palette-orange hover:text-white"
              onClick={HandleAdmin}
            >
              {user.user_role === "MEMBER" ? <LuStar /> : <LuUser />}
              <div className="h-fit w-fit">
                {user.user_role === "MEMBER" ? `Set as Admin` : `Set as Member`}
              </div>
            </div>
          </Menu.Item>
          <Menu.Item
            key="chat"
            as="div"
          >
            <MuteDropDown
              user={user}
              channel={channel}
              onClose={onClose}
              membersRefetch={membersRefetch}
              channelsRefetch={mainChannelRefetch}
            ></MuteDropDown>
          </Menu.Item>
          <Menu.Item
            key="leave"
            as="div"
          >
            <div
              role="button"

              className="py-2 z-10 px-4 min-w-[150px] cursor-pointer border-b border-palette-grey font-body font-bold flex items-center space-x-4 text-palette-green hover:bg-palette-orange hover:text-white"
              onClick={HandleKick}
            >
              <LuDoorOpen />
              <div className="h-fit w-fit">
                Kick
              </div>
            </div>
          </Menu.Item>
          <Menu.Item
            key="invite"
            as="div"
          >
            <div
              role="button"
              className="py-2 z-10 px-4 min-w-[150px] cursor-pointer border-b border-palette-grey font-body font-bold flex items-center space-x-4 text-palette-green hover:bg-palette-orange hover:text-white"
              onClick={HandleBan}
            >
              <LuBan />
              <div className="h-fit w-fit">
                {user.member_status === "BANNED" ? "Unban" : "Ban"}
              </div>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default JoinDropDown;
