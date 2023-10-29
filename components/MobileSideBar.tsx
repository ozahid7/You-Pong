"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LuLayoutDashboard,
    LuUsers,
    LuBell,
    LuMessageSquare,
    LuSettings,
    LuLogOut,
} from "react-icons/lu";

const RenderMobileSidBarElement = (index: number, link: string) => {
    const path = usePathname();
    const customclass = "h-[30px] xs:h-[40px]";

    const Elements = [
        <LuLayoutDashboard size="40" className={customclass} />,
        <LuUsers size="40" className={customclass} />,
        <LuMessageSquare size="40" className={customclass} />,
        <LuBell size="40" className={customclass} />,
        <LuSettings size="40" className={customclass} />,
    ];

    const elm = Elements[index];

    return (
        <Link href={link}>
            <div
                className={`flex px-1 py-1 items-center hover:bg-greenborder text-white h-auto w-full ${
                    path === link ? "text-orange-600 bg-palette-green rounded-sm" : ""
                } `}
            >
                {elm}
            </div>
        </Link>
    );
};

const MobileSideBar = () => {
    return (
        <aside className=" w-full h-[7vh] flex sm:hidden items-end overflow-hidden">
            <div className=" s:px-6 w-full h-[100%]  bg-greenborder border-t-2  border-palette-grey flex items-center px-2 rounded-3xl  justify-between">
                {RenderMobileSidBarElement(0, "/")}
                {RenderMobileSidBarElement(1, "/freinds")}
                {RenderMobileSidBarElement(2, "/messages")}
                {RenderMobileSidBarElement(3, "/notifications")}
                {RenderMobileSidBarElement(4, "/settings")}
            </div>
        </aside>
    );
};

export default MobileSideBar;
