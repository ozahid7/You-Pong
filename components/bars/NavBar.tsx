import React from "react";
import Image from "next/image";
import { LuSearch, LuBell } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { AnimatedText } from "..";

const NavBar = () => {
    const name = "oussama zahid";
    const isMorethan: boolean = name.length > 7 ? true : false;
    const childcustomClass = `${
        isMorethan ? "animate-marquee" : "animate-m"
    } whitespace-nowrap`;

    return (
        <nav className="flex justify-end w-full items-center px-2 sm:px-14 py-6">
            <div className="flex justify-end s:w-full sm:w-[90%] max-w-[800px] space-x-4 md:w-[80%] h-full s:flex overflow-auto items-center">
                {/* input search */}
                <div className="search_input  w-[60%] max-h-[50px] max-w-[220px] min-w-[140px] sm:max-h-[60px]   min-h-[40px] h-[10%] flex justify-center items-center">
                    <div className="center pl-3 outline-none   fold:w-[95%]  h-[88%] s:w-[97%] sm:w-[97%] md:w-[98%] w-[96%] xl:w-[98%] 2xl:[99%] flex justify-center items-center overflow-hidden">
                        <LuSearch className="h-7 w-7 text-white" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="center text-white font-body placeholder:font-bold fold:placeholder:text-lg placeholder-palette-grey pl-5 outline-none h-full w-[84%]"
                        />
                    </div>
                </div>

                <div className="p-2 border-2 border-white rounded-sm">
                    <LuBell className="text-white stroke-white h-5 w-5" />
                </div>
                <Image
                    className="border-2 hidden s:flex border-white rounded-sm object-contain"
                    src="/ozahid-.jpeg"
                    alt=""
                    width={44}
                    height={44}
                />
                <div className="flex">
                    <div className="flex-col hidden h:flex">
                        <div
                            className={`relative w-[78px] flex justify-center overflow-x-hidden`}
                        >
                            <div className={childcustomClass}>
                                <span className="text-white overflow-hidden text-lg font-bold drop-shadow-lg">
                                    {name}
                                </span>
                            </div>
                        </div>
                        <span className="text-white font-light">Lvl: 69</span>
                    </div>
                    <FiChevronDown className="text-white ml-1 h-6 w-6" />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
