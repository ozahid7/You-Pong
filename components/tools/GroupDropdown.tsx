"use client";
import { Menu } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import React from "react";
import { IconContext } from "react-icons";
import { LuSettings2, LuUser } from "react-icons/lu";
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
import { ChatEdit, MembersEdit } from "..";

const GroupDropdown = (icon: { icon?: any; style?: string; size?: number, obj: Channel[] }) => {

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
            <ChatEdit></ChatEdit>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GroupDropdown;
