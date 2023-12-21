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
import useSWR, { mutate } from "swr";

interface Props {
  disable: string;
  user: Member;
  channel: Channel | null;
}

const JoinDropDown = ({ disable, user, channel }: Props) => {
  const { onClose, onOpenChange, onOpen, isOpen } = useDisclosure();
  const fetchData_getMembers = async () => {
    try {
      const result = await getMembers(channel?.id_channel || "");
      return result.object;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { error } = useSWR<Member[]>("/Users", fetchData_getMembers);

  if (error) return <div>useSWR: Error found, Fetching data failed!</div>;

  const HandleKick = () => {
    KickMember(channel?.id_channel, user.user.id_user);
    mutate(fetchData_getMembers);
  };

  const HandleBan = () => {
    user.member_status !== "BANNED"
      ? BanMember(channel?.id_channel, user.user.id_user)
      : UnBanMember(channel?.id_channel, user.user.id_user);
    mutate(fetchData_getMembers);
  };

  const HandleAdmin = () => {
    user.user_role === "MEMBER"
      ? SetAdmin(channel?.id_channel, user.user.id_user)
      : SetMember(channel?.id_channel, user.user.id_user);
    mutate(fetchData_getMembers);
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
