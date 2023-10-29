import React from "react";
import Image from "next/image";
import { LuSearch, LuBell } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";


const NavBar = () => {
    return (
        <nav className="flex justify-end w-full items-center px-2 h:px-10 h-[10vh]">
            <div className="flex s:w-full sm:w-[90%] max-w-[800px] space-x-4 md:w-[80%] overflow-hidden h-full s:flex items-center">
                {/* input search */}
                <div className="my_input w-[60%] max-h-[50px] max-w-[360px] min-w-[140px] sm:max-h-[60px]   min-h-[45px] h-[12%] flex justify-center items-center">
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
                    <LuBell className="text-white stroke-white h-6 w-6" />
                </div>
                    <Image
                        className="border-2 hidden s:flex border-white rounded-sm object-contain"
                        src="/ozahid-.jpeg"
                        alt=""
                        width={50}
                        height={50}
                    />
                    <div className="flex-col hidden h:flex">
                        <span className="text-white font-body font-bold text-lg">OZAHID-</span>
                        <span className="text-white font-light">Lvl: 69</span>
                    </div>
                    <FiChevronDown className="text-white h-10 w-10"/>
            </div>
        </nav>
    );
};

export default NavBar;
