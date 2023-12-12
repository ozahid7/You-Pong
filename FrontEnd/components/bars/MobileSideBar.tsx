"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoGameControllerOutline } from "react-icons/io5";

import {
    LuLayoutDashboard,
    LuUsers,
    LuBell,
    LuMessageSquare,
    LuSettings,
    LuLogOut,
} from "react-icons/lu";
import { myRoutes } from "@/const";

const RenderMobileSidBarElement = (index: number, link: string) => {
    const path = usePathname();
    const customclass = "h-[30px] sm:h-[40px]";

    const Elements = [
        <LuLayoutDashboard size="40" className={customclass} />,
        <LuUsers size="40" className={customclass} />,
        <LuMessageSquare size="40" className={customclass} />,
        <IoGameControllerOutline size="40" className={customclass} />,
        <LuSettings size="40" className={customclass} />,
    ];

    const elm = Elements[index];

    return (
        <Link href={link}>
            <div
                className={`flex px-[1px] py-[3px] s:px-2 s:py-2  items-center hover:bg-palette-green hover:rounded-md  h-auto w-full ${
                    path === link
                        ? "text-palette-orange bg-palette-green rounded-lg"
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
                {RenderMobileSidBarElement(0, myRoutes.dashboard)}
                {RenderMobileSidBarElement(1, myRoutes.friends)}
                {RenderMobileSidBarElement(2, myRoutes.chat)}
                {RenderMobileSidBarElement(3, myRoutes.game)}
                {RenderMobileSidBarElement(4, myRoutes.settings)}
            </div>
        </aside>
    );
};

export default MobileSideBar;
