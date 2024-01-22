"use client";
import React, { Fragment } from "react";
import { IconContext } from "react-icons";
import { LuSettings2, LuUser, LuLogOut } from "react-icons/lu";
import { Channel, Member, User, User_Hero } from "@/types";
import { Button, Modal } from "@nextui-org/react";
import { ChatEdit, MembersEdit, PrivateModal } from ".";
import { FiChevronDown } from "react-icons/fi";
import {
  fetchData_getMainUser,
  fetchData_getMembers,
  getChannel,
  getMainUser,
  getMembers,
  leaveChannel,
  userChannels,
} from "../data/api";
import { useQuery } from "react-query";
import { Menu } from "@headlessui/react";
import Loader from "@/components/tools/Loader";

interface HomePage {
  channels: Channel;
  channelsRefetch: any;
  joinRefetch: any;
  mainChannelRefetch: any;
}

const GroupDropdown = ({
  channels,
  channelsRefetch,
  joinRefetch,
  mainChannelRefetch,
}: HomePage) => {
  const Leaving = async () => {
    const success = await leaveChannel(channels.id_channel);
    if (success?.message === "Channel Updated Succefully") {
      channelsRefetch();
      joinRefetch();
    } else {
      console.error(success?.message);
    }
  };

  const { data: MainUser, isLoading } = useQuery<User_Hero, Error>(
    ["MainUser"],
    fetchData_getMainUser,
    {
      onError: (error: Error) => {
        console.error("Members query error:", error);
      },
    }
  );

  const {
    data: Members,
    refetch: membersRefetch,
    isLoading: membersLoading,
  } = useQuery<Member[], Error>(
    ["members", channels?.id_channel],
    () => fetchData_getMembers(channels?.id_channel),
    {
      onError: (error: Error) => {
        console.error("Members query error:", error);
      },
    }
  );

  if (isLoading || membersLoading) <Loader />;

  return (
    <div className="flex flex-col justify-center relative">
      <Menu>
        <Menu.Button>
          <IconContext.Provider
            value={{
              color: "",
              size: "25px",
              className: " text-palette-green border-none",
            }}
          >
            <FiChevronDown />
          </IconContext.Provider>
        </Menu.Button>
        <Menu.Items
          className="flex flex-col border-2 border-palette-green divide-y rounded-md h-auto outline-none w-auto drop-shadow-lg z-[1000] bg-palette-white top-full right-0 absolute"
          unmount={false}
        >
          <Menu.Item
            key="members"
            as="div"
          >
            <MembersEdit
              MainUser={MainUser}
              Users={Members}
              membersRefetch={membersRefetch}
              channelsRefetch={channelsRefetch}
              mainChannelRefetch={mainChannelRefetch}
              Channel_={channels}
            ></MembersEdit>
          </Menu.Item>
          <Menu.Item
            key="chat"
            as="div"
          >
            <ChatEdit
              channels={channels}
              users={Members}
              MainUser={MainUser}
              channelsRefetch={channelsRefetch}
            ></ChatEdit>
          </Menu.Item>
          <Menu.Item
            key="leave"
            as="div"
          >
            <div
              role="button"
              className="py-2 z-10 px-4 min-w-[150px] cursor-pointer border-b border-palette-grey font-body font-bold flex items-center space-x-4 text-palette-orange hover:bg-palette-green hover:text-white"
              onClick={() => {
                Leaving();
              }}
            >
              <LuLogOut />
              <p className="w-fit h-fit">Leave</p>
            </div>
          </Menu.Item>
          {channels.type === "PRIVATE" ? (
            <Menu.Item
              key="invite"
              as="div"
            >
              <PrivateModal
                MainUser={MainUser}
                membersRefetch={membersRefetch}
                channelsRefetch={channelsRefetch}
                mainChannelRefetch={mainChannelRefetch}
                Channel_={channels}
                Members={Members}
              ></PrivateModal>
            </Menu.Item>
          ) : (
            ""
          )}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default GroupDropdown;

{/* <Fragment>
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
      className={`flex btn ${disable} xs:btn-xs sm:btn-sm md:btn-md font-body font-[700] text-[#EFF5F5] rounded-md border-none hover:border-none bg-palette-green hover:text-palette-green`}
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
        membersRefetch={membersRefetch}
        channelsRefetch={mainChannelRefetch}
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
</Fragment> */}