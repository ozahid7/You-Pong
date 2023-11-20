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
    const customclass = "h-[30px] sm:h-[40px]";

    const Elements = [
        <LuLayoutDashboard size="40" className={customclass}/>,
        <LuUsers size="40" className={customclass} />,
        <LuMessageSquare size="40" className={customclass} />,
        <LuBell size="40" className={customclass} />,
        <LuSettings size="40" className={customclass} />,
    ];

    const elm = Elements[index];

    return (
        <Link href={link}>
            <div
                className={`flex px-[1px] py-[3px] s:px-2 s:py-2  items-center hover:bg-greenborder  h-auto w-full ${
                    path === link
                        ? "text-palette-orange rounded-xl"
                        : "text-white"
                } `}
            >
                {elm}
            </div>
        </Link>
    );
};

const MobileSideBar = () => {
    return (
        <aside className=" w-full  flex sm:hidden items-end">
            <div className=" s:px-6 w-full py-2 bg-greenborder border-t-2  border-palette-grey flex items-center px-2 rounded-t-3xl  justify-between">
                {RenderMobileSidBarElement(0, "/hero")}
                {RenderMobileSidBarElement(1, "/hero/freinds")}
                {RenderMobileSidBarElement(2, "/hero/messages")}
                {RenderMobileSidBarElement(3, "/hero/notifications")}
                {RenderMobileSidBarElement(4, "/hero/settings")}
            </div>
        </aside>
    );
};

export default MobileSideBar;
