"use client";
import React, { Fragment } from "react";
import { IconContext } from "react-icons";
import { LuSettings2, LuUser, LuLogOut, LuGamepad, LuUserX } from "react-icons/lu";
import { Channel, Member, User, User_Hero } from "@/types";
import { Button, Modal } from "@nextui-org/react";
import { ChatEdit, MembersEdit, PrivateModal } from ".";
import { FiChevronDown } from "react-icons/fi";
import { Menu } from "@headlessui/react";

interface HomePage {}

const DirectDropdown = () => {
  return (
    <div className="flex flex-col justify-center relative">
      <Menu>
        <Menu.Button>
          <IconContext.Provider
            value={{
              color: "",
              size: "25px",
              className: " text-palette-green border-none test",
            }}
          >
            <FiChevronDown />
          </IconContext.Provider>
        </Menu.Button>
        <Menu.Items
          className="flex flex-col border-2 border-palette-green  h-auto outline-none w-auto rounded-sm drop-shadow-lg z-[1000] bg-palette-white top-full right-0 absolute"
          unmount={false}
        >
          <Menu.Item
            key="members"
            as="div"
          >
            <div
              role="button"
              className="py-2 z-10 px-4 min-w-[150px] cursor-pointer border-b border-palette-grey font-body font-bold flex items-center space-x-4 text-palette-green hover:bg-palette-orange hover:text-white"
            >
              <LuUser />
              <p className="w-fit h-fit">Profile</p>
            </div>
          </Menu.Item>
          <Menu.Item
            key="leave"
            as="div"
          >
            <div
              role="button"
              className="py-2 z-10 px-4 min-w-[150px] cursor-pointer border-b border-palette-grey font-body font-bold flex items-center space-x-4 text-palette-green hover:bg-palette-orange hover:text-white"
            >
              <LuGamepad />
              <p className="w-fit h-fit">Play</p>
            </div>
          </Menu.Item>
          <Menu.Item
            key="invite"
            as="div"
          >
            <div
              role="button"
              className="py-2 z-10 px-4 min-w-[150px] cursor-pointer border-b border-palette-grey font-body font-bold flex items-center space-x-4 text-palette-orange hover:bg-palette-green hover:text-white"
            >
              <LuUserX />
              <p className="w-fit h-fit">Block</p>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default DirectDropdown;
