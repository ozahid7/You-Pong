"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { LuMenu, LuLogOut, LuSettings } from "react-icons/lu";

const links = [
    { href: "/login", label: "Logout", icon: <LuLogOut /> },
    { href: "/setting", label: "Setting", icon: <LuSettings /> },
];

const MyDropdown = () => {
    return (
        <div className="flex flex-col justify-center relative">
            <Menu>
                <Menu.Button as="div" className="">
                    <LuMenu
                        size={30}
                        className="border border-palette-green rounded-sm text-palette-green mb-2"
                    />
                </Menu.Button>
                <Menu.Items
                    as="div"
                    className="flex flex-col h-auto outline-none w-auto rounded-md drop-shadow-lg top-full right-0 absolute z-10"
                >
                    {links.map((link) => (
                        <Menu.Item key={link.href} as={Fragment}>
                            {({ active }) => (
                                <a
                                    href={link.href}
                                    className={`py-2 px-4 min-w-[150px] border-b border-palette-grey font-body font-bold flex items-center space-x-4 rounded-sm ${
                                        active
                                            ? "bg-palette-orange text-white"
                                            : "bg-palette-white text-palette-green"
                                    }`}
                                >
                                    <div className="h-auto flex">
                                        {link.icon}
                                    </div>
                                    <div className="h-auto flex">
                                        {link.label}
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
