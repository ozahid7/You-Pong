"use client";
import React from "react";
import { IconContext } from "react-icons";
import { LuSettings2, LuUser, LuLogOut, LuGamepad, LuUserX } from "react-icons/lu";
import { Channel, Member, User, User_Hero } from "@/types";
import { Button } from "@nextui-org/react";
import { ChatEdit, MembersEdit } from ".";
import { FiChevronDown } from "react-icons/fi";

interface HomePage {
  channels: Channel;
}

const DirectDropdown = ({ channels }: HomePage) => {
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
            <Button className="rounded-none btn green_button">
              <div className="flex flex-row gap-2 w-fit h-fit">
                <IconContext.Provider
                  value={{
                    size: "25px",
                    className: "text-palette-white border-none",
                  }}
                >
                  <LuUser />
                </IconContext.Provider>
                <div className="flex text-palette-white font-body font-[600] text-[15px] mt-1">
                  Profile
                </div>
              </div>
            </Button>
          </li>
          <li>
            <Button className="rounded-none btn green_button">
              <div className="flex flex-row gap-2 w-fit h-fit">
                <IconContext.Provider
                  value={{
                    size: "25px",
                    className: "text-palette-white border-none",
                  }}
                >
                  <LuGamepad />
                </IconContext.Provider>
                <div className="flex text-palette-white font-body font-[600] text-[15px] mt-1">
                  Play a game
                </div>
              </div>
            </Button>
          </li>
          <li>
		  <Button className="rounded-none btn orange_button">
              <div className="flex flex-row gap-2 w-fit h-fit">
                <IconContext.Provider
                  value={{
                    size: "25px",
                    className: "text-palette-white border-none",
                  }}
                >
                  <LuUserX />
                </IconContext.Provider>
                <div className="flex text-palette-white font-body font-[600] text-[15px] mt-1">
                  Block
                </div>
              </div>
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DirectDropdown;
