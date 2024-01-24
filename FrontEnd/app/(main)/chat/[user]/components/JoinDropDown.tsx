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
import { useQueryClient } from "react-query";

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
  const queryClient = useQueryClient();

  const HandleKick = async () => {
    const kick = await KickMember(channel?.id_channel, user.user.id_user);
    if (kick?.message === "Channel Updated Succefully") {
      membersRefetch();
      channelsRefetch();
      queryClient.invalidateQueries("users");
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
    <Fragment>
      <Dropdown
        className="bg-palette-white self-center border-2 border-palette-green rounded-md"
        type="listbox"
        onClose={onClose}
        onOpenChange={onOpenChange}
        radius="none"
        isOpen={isOpen}
      >
        <DropdownTrigger className="w-fit">
          <Button
            size="lg"
            className={`flex btn ${disable} xs:btn-xs sm:btn-sm md:btn-md font-body font-[700] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green`}
            onPress={onOpen}
          >
            Action
            <LuArrowDown />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          className="flex flex-col divide-y rounded-md h-auto outline-none w-full  bg-palette-white top-full right-0 "
          aria-label="DropDownMenu"
        >
          <DropdownItem
            className="hover:bg-palette-white border-none w-full p-0 m-0"
            variant="bordered"
            aria-label="SetAsAdmin"
          >
            <div
              role="button"
              className="py-2 z-10 px-4 min-w-[140px] cursor-pointer w-full border-b border-palette-grey font-body font-bold flex items-center space-x-4 text-palette-orange hover:bg-palette-green hover:text-white"
              onClick={HandleAdmin}
            >
              {user.user_role === "MEMBER" ? <LuStar /> : <LuUser />}
              <p className="w-fit h-fit">{user.user_role === "MEMBER" ? `Set as Admin` : `Set as Member`}</p>
            </div>
          </DropdownItem>
          <DropdownItem
            className="hover:bg-palette-white border-none w-full p-0 m-0"
            variant="bordered"
            aria-label="Mute"
            isReadOnly
          >
            <MuteDropDown
              user={user}
              channel={channel}
              onClose={onClose}
              membersRefetch={membersRefetch}
              channelsRefetch={mainChannelRefetch}
            ></MuteDropDown>
          </DropdownItem>
          <DropdownItem
            className="hover:bg-palette-white border-none w-full p-0 m-0"
            variant="bordered"
            aria-label="Kick"
          >
            <button
              className="py-2 z-10 px-4 min-w-[140px] cursor-pointer w-full border-b border-palette-grey font-body font-bold flex items-center space-x-4 text-palette-orange hover:bg-palette-green hover:text-white"
              onClick={HandleKick}
            >
              <LuDoorOpen />
              <p>
                Kick
              </p>
            </button>
          </DropdownItem>
          <DropdownItem
            className="hover:bg-palette-white border-none w-full p-0 m-0"
            variant="bordered"
            aria-label="Ban"
          >
            <button
              className="py-2 z-10 px-4 min-w-[140px] cursor-pointer w-full border-b border-palette-grey font-body font-bold flex items-center space-x-4 text-palette-orange hover:bg-palette-green hover:text-white"
              onClick={HandleBan}
            >
              <LuBan />
              <p>
                {user.member_status === "BANNED" ? "Unban" : "Ban"}
              </p>
            </button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Fragment>
  );
};

export default JoinDropDown;
