"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import React from "react";
import { LuMenu } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { MyDropdownProps } from "@/types";
import { menuElements } from "@/const"
import { renderIcon } from "@/utils";

const MyDropdown = (icon: {icon: any, style: string, size: number}) => {

    // const  icon = icontype  === 'menu' ? menu : downarrow;
    return (
        <div className="flex flex-col justify-center relative">
            <Menu>
                <Menu.Button as="div" className="">
                    {renderIcon(icon.icon, icon.style, icon.size)}
                </Menu.Button>
                <Menu.Items
                    as="div"
                    className="flex flex-col h-auto outline-none w-auto rounded-sm drop-shadow-lg bg-palette-white overflow-hidden top-full right-0 absolute z-10"
                >
                    {menuElements.map((elm) => (
                        <Menu.Item key={elm.href} as={Fragment}>
                            {({ active }) => (
                                <a
                                    href={elm.href}
                                    className={`py-2 px-4 min-w-[150px] border-b border-palette-grey font-body font-bold flex items-center space-x-4  ${
                                        active
                                            ? "bg-palette-orange text-white"
                                            : " text-palette-green"
                                    }`}
                                >
                                    <div className="h-auto flex">
                                        {elm.icon}
                                    </div>
                                    <div className="h-auto flex">
                                        {elm.label}
                                    </div>
                                </a>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Menu>
        </div>
    );
};

export default MyDropdown;
