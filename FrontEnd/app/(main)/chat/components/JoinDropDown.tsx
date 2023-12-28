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

interface Props {
  disable: string;
  user: Member;
  channel: Channel | null;
  Refetch: any;
}

const JoinDropDown = ({ disable, user, channel, Refetch }: Props) => {
  const { onClose, onOpenChange, onOpen, isOpen } = useDisclosure();

  const HandleKick = async () => {
    const success = await KickMember(channel?.id_channel, user.user.id_user);
    if (success.message === "Channel Updated Succefully") {
      Refetch();
      onClose();
    } else console.error(success.message);
  };

  const HandleBan = async () => {
    if (user.member_status === "BANNED") {
      const unban = await UnBanMember(channel?.id_channel, user.user.id_user);
      if (unban && unban.message === "Channel Updated Succefully") {
        Refetch();
      } else console.error(unban.message);
    } else {
      const ban = await BanMember(channel?.id_channel, user.user.id_user);
      if (ban && ban.message === "Channel Updated Succefully") {
        Refetch();
      } else console.error(ban.message);
    }
  };

  const HandleAdmin = async () => {
    let success = null;
    user.user_role === "MEMBER"
      ? (success = await SetAdmin(channel?.id_channel, user.user.id_user))
      : (success = await SetMember(channel?.id_channel, user.user.id_user));
    if (success.message === "Channel Updated Succefully") {
      Refetch();
    } else console.error(success.message);
  };

  return (
    <Fragment>
      <Dropdown
        className="bg-palette-white self-center"
        type="listbox"
        onClose={onClose}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      >
        <DropdownTrigger className="w-fit">
          <Button
            size="lg"
            className={`flex btn ${disable} xs:btn-xs sm:btn-sm md:btn-md  font-body font-[700] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green`}
            onPress={onOpen}
          >
            Action
            <LuArrowDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          className="w-full"
          aria-label="DropDownMenu"
        >
          <DropdownItem
            className="hover:bg-palette-white border-none"
            variant="bordered"
            aria-label="SetAsAdmin"
          >
            <button
              className="flex flex-row gap-2 items-center btn bg-palette-orange text-palette-white hover:bg-palette-white hover:text-palette-green hover:border-palette-green w-full h-full"
              onClick={HandleAdmin}
            >
              {user.user_role === "MEMBER" ? <LuStar /> : <LuUser />}
              {user.user_role === "MEMBER" ? `Set as Admin` : `Set as Member`}
            </button>
          </DropdownItem>
          <DropdownItem
            className="hover:bg-palette-white border-none"
            variant="bordered"
            aria-label="Mute"
            isReadOnly
          >
            <MuteDropDown
              user={user}
              channel={channel}
              onClose={onClose}
              refetch={Refetch}
            ></MuteDropDown>
          </DropdownItem>
          <DropdownItem
            className="hover:bg-palette-white border-none"
            variant="bordered"
            aria-label="Kick"
          >
            <button
              className="flex flex-row gap-2 items-center btn bg-palette-orange text-palette-white hover:bg-palette-white hover:text-palette-green hover:border-palette-green w-full h-full"
              onClick={HandleKick}
            >
              <LuDoorOpen />
              Kick
            </button>
          </DropdownItem>
          <DropdownItem
            className="hover:bg-palette-white border-none"
            variant="bordered"
            aria-label="Ban"
          >
            <button
              className="flex flex-row gap-2 items-center btn bg-palette-orange text-palette-white hover:bg-palette-white hover:text-palette-green hover:border-palette-green w-full h-full"
              onClick={HandleBan}
            >
              <LuBan />
              {user.member_status === "BANNED" ? "Unban" : "Ban"}
            </button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Fragment>
  );
};

export default JoinDropDown;
