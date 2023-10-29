"use client";

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

const RenderSideBarElements = (index: number, link: string, name: string) => {
    const path = usePathname();

    const Elements = [
        <LuLayoutDashboard size="58" />,
        <LuUsers size="58" />,
        <LuMessageSquare size="58" />,
        <LuBell size="58" />,
        <LuSettings size="58" />,
    ];

    const elm = Elements[index];

    return (
        <Link href={link}>
            <div
                className={`flex px-5 items-center hover:bg-greenborder xl:space-x-7 h-auto w-full ${
                    path === link
                        ? "bg-palette-green text-palette-orange  rounded-md"
                        : "text-white"
                } `}
            >
                {elm}
                <span
                    className={` font-body w-full hidden xl:flex font-bold text-2xl ${
                        path === link ? "text-palette-orange" : "text-white"
                    } `}
                >
                    {name}
                </span>
            </div>
        </Link>
    );
};

const SideBar = () => {
    return (
        <aside className={` text-white pb-6 xl:min-w-[280px] w-[100px] bg-[#537073] min-h-screen hidden sm:flex flex-col rounded-sm justify-between items-center border-2 border-[#D6E4E5]`}>
            {/* top part */}

            <div className=" h-[12%] w-full flex justify-around items-center">
                <Image
                    src="/sidebarlogo.png"
                    alt="logo"
                    height={60}
                    width={60}
                    className="object-contain"
                />
                <div className="pr-8 hidden xl:flex xl:flex-col">
                    <h2 className="text-white text-left font-bold text-2xl">
                        YOU PONG
                    </h2>
                    <p className="text-gray-300 font-light text-left  text-xl">
                        Transcendnece
                    </p>
                </div>
            </div>

            <div className=" xl:w-[94%] w-[88%] h-[86%] px-1 py-6 bg-[#4F777A] overflow-hidden shadow-xl rounded-sm flex flex-col justify-evenly">
                {/* middle part */}

                {RenderSideBarElements(0, "/", "Dashboard")}
                {RenderSideBarElements(1, "/friends", "Friends")}
                {RenderSideBarElements(2, "/messages", "Messages")}
                {RenderSideBarElements(3, "/notifications", "Notifications")}
                {RenderSideBarElements(4, "/settings", "Settings")}

                {/* bottom part */}

                <div className="h-[50%] w-full  flex flex-col justify-end items-center px-2">
                    <div className="w-full h-[50%]  flex flex-col items-center justify-between pt-4">
                        <Link className="h-[34%] w-[92%]" href="/">
                            <div className="w-full h-full  xl:bg-palette-grey rounded-md flex justify-around items-center px-2">
                                <div className="border border-palette-green w-[18%] pb-[18%]  min-w-[70px] min-h-[70px] rounded-md  relative">
                                    <img
                                        className=" h-[100%] w-[100%] absolute rounded-md"
                                        src="/ozahid-.jpeg"
                                        alt=""
                                    />
                                </div>
                                <span className="text-gray-500 hidden xl:flex overflow-hidden font-bold font-body text-2xl drop-shadow-sm">
                                    Ozahid-
                                </span>
                            </div>
                        </Link>

                        <hr className="w-[80%]" />

                        <Link href="/login" className="w-full">
                            <div className="w-full h-16 border-4 rounded-md border-palette-white flex justify-around items-center">
                                
                                <LuLogOut size="40" />

                                <span className="text-2xl hidden xl:flex font-body font-bold ">
                                    Log out
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
