"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import React from "react";
import { menuElements } from "@/const";
import { renderIcon } from "@/utils";

const MyDropdown = (props: {icon: any, style?: string, size?: number, image?: any, placement: string}) => {

    
    return (
        <div className="flex flex-col justify-center relative">
            <Menu >
                <Menu.Button  as="div" className="">
                  { props.icon !== "" ? renderIcon(props.icon, props.style, props.size) : props.image }
                </Menu.Button>
                <Menu.Items
                    as="div"
                    
                    className={`flex flex-col border-2 border-palette-green  h-auto outline-none w-auto rounded-sm drop-shadow-lg z-[1000] bg-palette-white top-full ${props.placement} absolute`}
                >
                    {menuElements.map((elm) => (
                        <Menu.Item  key={elm.href} as={Fragment}>
                            {({ active }) => (
                                <a
                                    href={elm.href}
                                    className={`py-2 z-10 px-4 min-w-[150px] border-b border-palette-grey font-body font-bold flex items-center space-x-4  ${
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
