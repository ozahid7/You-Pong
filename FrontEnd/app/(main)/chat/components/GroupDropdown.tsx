"use client";
import React from "react";
import { IconContext } from "react-icons";
import { LuSettings2, LuUser, LuLogOut } from "react-icons/lu";
import { Channel, Member, User, User_Hero } from "@/types";
import { Button } from "@nextui-org/react";
import { ChatEdit, MembersEdit } from ".";
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

interface HomePage {
  channels: Channel;
  refetch: any;
}

const GroupDropdown = ({ channels, refetch }: HomePage) => {
  const Leaving = async () => {
    const success = await leaveChannel(channels.id_channel);
    console.log(success);
    if (success.message === "Channel Updated Succefully") {
      refetch();
    } else console.error(success.message);
  };

  const { data: MainUser } = useQuery<User_Hero, Error>(
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
    error: membersError,
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

  return (
    <div className="flex flex-col justify-center relative">
      <div className="dropdown dropdown-bottom dropdown-end">
        <label
          tabIndex={0}
          role="button"
        >
          <IconContext.Provider
            value={{
              color: "",
              size: "25px",
              className: " text-palette-green border-none test",
            }}
          >
            <FiChevronDown />
          </IconContext.Provider>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 bg-palette-white rounded-box w-52 gap-2"
        >
          <li>
            <MembersEdit
              MainUser={MainUser}
              Users={Members}
              Channel_={channels}
            ></MembersEdit>
          </li>
          <li>
            <ChatEdit
              channels={channels}
              users={Members}
            ></ChatEdit>
          </li>
          <li>
            <Button
              key={"3xl"}
              className="flex btn bg-palette-orange border-none text-[#EFF5F5] rounded-md center orange_button"
              onClick={() => {
                Leaving();
              }}
            >
              <div className="flex flex-row gap-2 w-fit h-fit">
                <IconContext.Provider
                  value={{
                    size: "25px",
                    className: "text-white border-none",
                  }}
                >
                  <LuLogOut />
                </IconContext.Provider>
                <div className="flex text-white font-body font-[600] bg-transparent text-[15px] mt-1">
                  Leave group
                </div>
              </div>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GroupDropdown;
