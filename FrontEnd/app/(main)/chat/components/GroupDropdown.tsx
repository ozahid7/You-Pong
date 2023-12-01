"use client";
import { Menu } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import React from "react";
import { IconContext } from "react-icons";
import { LuSettings2, LuUser, LuLogOut } from "react-icons/lu";
import { menuGroupsElements } from "@/const";
import { renderIcon } from "@/utils";
import { Channel } from "@/types";
import {
  Modal,
  ModalBody,
  Button,
  useDisclosure,
  ModalContent,
  NextUIProvider,
} from "@nextui-org/react";
import { ChatEdit, MembersEdit } from "../../../../components";

interface HomePage {
  channels: Channel;
}

const GroupDropdown = ({ channels }: HomePage) => {
  return (
    <div className="flex flex-col justify-center relative">
      <div className="dropdown dropdown-bottom dropdown-end">
        <label
          tabIndex={0}
          className="btn m-1 bg-palette-green border-none hover:bg-palette-green"
        >
          <IconContext.Provider
            value={{
              color: "white",
              size: "20px",
              className: "hover:text-palette-green border-none test",
            }}
          >
            <LuSettings2 />
          </IconContext.Provider>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-46 gap-2"
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
