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

            <div className=" w-[94%] h-[86%] px-1 py-6 bg-[#4F777A] overflow-auto shadow-xl rounded-sm flex flex-col justify-evenly">
                <Link href="/">
                    <div className="flex px-5 items-center hover:bg-greenborder space-x-7 text-white h-auto w-full">
                        <LuLayoutDashboard size="58" />
                        <span className="text-white font-body w-full font-bold text-2xl">
                            Dashboard
                        </span>
                    </div>
                </Link>
                <Link href="/friends">
                    <div className="flex px-5 items-center hover:bg-greenborder space-x-7 h-auto text-white  w-full">
                        <LuUsers size="58" />
                        <span className="text-white font-body w-full  font-bold text-2xl">
                            Friends
                        </span>
                    </div>
                </Link>
                <Link href="/messages">
                    <div className="flex px-5 items-center hover:bg-greenborder space-x-7 text-white h-auto w-full">
                        <LuMessageSquare size="58" />
                        <span className="text-white font-body w-full  font-bold text-2xl">
                            Messages
                        </span>
                    </div>
                </Link>
                <Link href="/notifications">
                    <div className="flex px-5 items-center hover:bg-greenborder space-x-7 text-white h-auto w-full">
                        <LuBell size="58" />
                        <span className="text-white font-body w-full  font-bold text-2xl">
                            Notifications
                        </span>
                    </div>
                </Link>
                <Link href="/settings">
                    <div className="flex px-5 items-center hover:bg-greenborder space-x-7 text-white h-auto w-full">
                        <LuSettings size="58" />
                        <span className="text-white font-body w-full  font-bold text-2xl">
                            Settings
                        </span>
                    </div>
                </Link>

                {/* bottom part */}

                <div className="h-[50%] w-full  flex flex-col justify-end items-center px-2">
                    <div className="w-full h-[50%]  flex flex-col items-center justify-between pt-4">
                        <Link className="h-[34%] w-[92%]" href="/">
                            <div className="w-full h-full  bg-palette-grey rounded-md flex justify-around items-center px-2">
                                <div className="border border-palette-green w-[18%] pb-[18%]  min-w-[70px] min-h-[70px] rounded-md  relative">
                                    <img
                                        className=" h-[100%] w-[100%] absolute rounded-md"
                                        src="/ozahid-.jpeg"
                                        alt=""
                                    />
                                </div>
                                <span className="text-gray-500 hidden  md:flex overflow-hidden font-bold font-body text-2xl drop-shadow-sm">
                                    Ozahid-
                                </span>
                            </div>
                        </Link>

                        <hr className="w-[80%]" />

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
        </aside>
    );
};

export default SideBar;
