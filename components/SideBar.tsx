import Image from "next/image";
import Link from "next/link";
import {
    LuLayoutDashboard,
    LuUsers,
    LuBell,
    LuMessageSquare,
    LuSettings,
    LuLogOut,
} from "react-icons/lu";

const SideBar = () => {
    return (
        <aside className="text-white pb-6 min-w-[280px] bg-[#537073] min-h-screen flex flex-col rounded-sm justify-between items-center border-2 border-[#D6E4E5]">
            {/* top part */}

            <div className=" h-[12%] w-full flex justify-around items-center">
                <Image
                    src="/sidebarlogo.png"
                    alt="logo"
                    height={60}
                    width={60}
                    className="object-contain"
                />
                <div className="">
                    <h2 className="text-white text-left font-bold text-2xl">
                        YOU PONG
                    </h2>
                    <p className="text-gray-300 font-light text-left  text-xl">
                        Transcendnece
                    </p>
                </div>
            </div>

            {/* middle part */}

            <div className=" w-[94%] h-[86%] px-1 py-6 bg-[#4F777A] overflow-auto shadow-xl rounded-sm dblue flex flex-col justify-evenly">
                <Link href="/">
                    <div className="flex px-5 items-center hover:bg-greenborder text-white h-auto w-full">
                        <LuLayoutDashboard size="54" />
                        <span className="text-white font-body w-full pl-7 font-bold text-2xl">
                            Dashboard
                        </span>
                    </div>
                </Link>
                <Link href="/friends">
                    <div className="flex px-5 items-center hover:bg-greenborder h-auto text-white  w-full">
                        <LuUsers size="54" />
                        <span className="text-white font-body w-full pl-7 font-bold text-2xl">
                            Friends
                        </span>
                    </div>
                </Link>
                <Link href="/messages">
                    <div className="flex px-5 items-center hover:bg-greenborder text-white h-auto w-full">
                        <LuMessageSquare size="54" />
                        <span className="text-white font-body w-full pl-7 font-bold text-2xl">
                            Messages
                        </span>
                    </div>
                </Link>
                <Link href="/notifications">
                    <div className="flex px-5 items-center hover:bg-greenborder text-white h-auto w-full">
                        <LuBell size="54" />
                        <span className="text-white font-body w-full pl-6 font-bold text-2xl">
                            Notifications
                        </span>
                    </div>
                </Link>
                <Link href="/settings">
                    <div className="flex px-5 items-center hover:bg-greenborder text-white h-auto w-full">
                        <LuSettings size="54" />
                        <span className="text-white font-body w-full pl-7 font-bold text-2xl">
                            Settings
                        </span>
                    </div>
                </Link>
                <div className="h-[50%] w-full dred flex flex-col justify-end items-center px-2">
                    <div className="w-full h-[50%] dblue flex flex-col justify-between pt-4">
                        <div className="w-full h-[40%] dblue bg-palette-grey rounded-md flex justify-between items-center">
                        </div>
                        <Link href="/login" className="w-full">
                            <div className="w-full h-16 border-4 rounded-md border-palette-white flex justify-around items-center">
                                <LuLogOut size="40" />
                                <span className="text-2xl font-body font-bold ">
                                    Log out
                                </span>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>

            {/* bottom part */}
        </aside>
    );
};

export default SideBar;
