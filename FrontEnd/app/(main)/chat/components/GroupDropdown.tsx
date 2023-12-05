"use client";
import { Menu } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import React from "react";
import { IconContext } from "react-icons";
import { LuSettings2, LuUser, LuLogOut } from "react-icons/lu";
import { menuGroupsElements } from "@/const";
import { renderIcon } from "@/utils";
import { Channel, User } from "@/types";
import {
  Modal,
  ModalBody,
  Button,
  useDisclosure,
  ModalContent,
  NextUIProvider,
} from "@nextui-org/react";
import { ChatEdit, MembersEdit } from ".";
import { FiChevronDown } from "react-icons/fi";
import { leaveChannel, userChannels } from "../data/api";
import { useSWRConfig } from "swr";

interface HomePage {
  channels: Channel;
}

const GroupDropdown = ({ channels }: HomePage) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { mutate } = useSWRConfig();

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
            <MembersEdit></MembersEdit>
          </li>
          <li>
            <ChatEdit channels={channels}></ChatEdit>
          </li>
          <li>
            <Button
              key={"3xl"}
              className="flex btn bg-palette-orange border-none text-[#EFF5F5] rounded-md center orange_button"
              onClick={() => {
                leaveChannel(channels.name);
                mutate(
                  "/myData",
                  (cachedData) => [...cachedData, channels],
                  true
                );
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
