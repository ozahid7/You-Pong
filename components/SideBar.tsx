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
        <aside
            className={` text-white pb-3 overflow-auto xl:min-w-[280px] w-[100px] bg-[#537073] min-h-screen hidden sm:flex flex-col rounded-sm justify-between items-center border-2 border-[#D6E4E5]`}
        >
            {/* top part */}

            <div className=" h-auto py-8 w-full flex justify-around items-center">
                <Image
                    src="/sidebarlogo.png"
                    alt="logo"
                    height={50}
                    width={50}
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

            <div className=" xl:w-[94%] w-[88%] h-full px-1 pb-3 pt-6 bg-[#4F777A] shadow-xl rounded-sm flex flex-col justify-between overflow-y-auto ">
                {/* middle part */}
                <div className="h-auto flex flex-col space-y-5">

                {RenderSideBarElements(0, "/", "Dashboard")}
                {RenderSideBarElements(1, "/friends", "Friends")}
                {RenderSideBarElements(2, "/messages", "Messages")}
                {RenderSideBarElements(3, "/notifications", "Notifications")}
                {RenderSideBarElements(4, "/settings", "Settings")}

                </div>
                {/* bottom part */}

                <div className="h-full w-full  pb-2 justify-end flex flex-col space-y-4 items-center px-2">
                    <Link className="h-auto w-[92%] " href="/">
                        <div className="w-full py-1 h-auto xl:bg-palette-grey rounded-md flex justify-around items-center">
                            <Image
                                className="border-2 min-w-[50px] xl:max-w-[60px] hidden s:flex border-white rounded-sm object-contain"
                                src="/ozahid-.jpeg"
                                alt=""
                                width={100}
                                height={100}
                            />
                            <span className="text-gray-500 hidden xl:flex overflow-hidden font-bold font-body text-2xl drop-shadow-sm">
                                Ozahid-
                            </span>
                        </div>
                    </Link>

                    <hr className="w-[80%] py-1" />

                    <Link href="/login" className="w-full flex justify-center">
                        <div className="w-[90%]  h-12 border-2 rounded-md border-palette-white flex justify-center items-center">
                            <LuLogOut size="30" />

                            <span className="text-2xl hidden xl:flex font-body font-bold ">
                                Log out
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
