import Image from "next/image";
import Link from "next/link";
import {
    LuLayoutDashboard,
    LuUsers,
    LuBell,
    LuMessageSquare,
    LuSettings2,
} from "react-icons/lu";

const SideBar = () => {
    return (
        <aside className="text-white min-w-[280px] bg-[#537073] min-h-screen flex flex-col rounded-sm justify-between items-center border-2 border-[#D6E4E5]">
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
            <div className=" w-[94%] h-[50%] px-1 py-8 bg-[#4F777A] rounded-sm dblue flex flex-col justify-evenly">
                <Link href="/">
                    <div className="flex px-5 items-center hover:bg-greenborder  text-white h-auto dred w-full">
                        <LuLayoutDashboard size="54" />
                        <span className="text-white font-body w-full pl-7  font-bold text-2xl">
                            Dashboard
                        </span>
                    </div>
                </Link>
                <Link href="/friends">
                    <div className="flex px-5 items-center hover:bg-greenborder  h-auto text-white  w-full">
                        <LuUsers size="54" />
                        <span className="text-white font-body w-full pl-7   font-bold text-2xl">
                            Friends
                        </span>
                    </div>
                </Link>
                <Link href="/messages">
                    <div className="flex px-5 items-center hover:bg-greenborder  text-white h-auto w-full">
                        <LuMessageSquare size="54" />
                        <span className="text-white font-body w-full pl-7  font-bold text-2xl">
                            Messages
                        </span>
                    </div>
                </Link>
                <Link href="/notifications">
                    <div className="flex px-5 items-center hover:bg-greenborder  text-white h-auto w-full">
                        <LuBell size="54" />
                        <span className="text-white font-body w-full pl-6  font-bold text-2xl">
                            Notifications
                        </span>
                    </div>
                </Link>
                <Link href="/settings">
                    <div className="flex px-5 items-center hover:bg-greenborder  text-white h-auto w-full">
                        <LuSettings2 size="54" />
                        <span className="text-white font-body w-full pl-7  font-bold text-2xl">
                            Settings
                        </span>
                    </div>
                </Link>
            </div>
        </aside>
    );
};

export default SideBar;
