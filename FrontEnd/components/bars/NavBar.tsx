"use client";
import React from "react";
import Image from "next/image";
import { LuSearch, LuBell } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { AnimatedText, MyDropdown } from "..";
import SearchBar from "./SearchBar";

const obj = {
    name: "oussama zahid",
}
const NavBar = () => {
    const name = obj.name;
    const isMorethan: boolean = name.length > 7 ? true : false;
    const childcustomClass = `${
        isMorethan ? "animate-marquee" : "animate-m"
    } whitespace-nowrap`;

    return (
        <nav className="flex justify-end w-full items-center px-2 sm:px-14 py-6">
            <div className="flex justify-end  s:w-full sm:w-[90%] max-w-[800px] space-x-4 md:w-[80%] h-full s:flex items-center">
                {/* input search */}
                <SearchBar/>

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
                <div className="flex relative">
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
                        <span className="text-palette-grey font-light">
                            Lvl: 69
                        </span>
                    </div>
                    <MyDropdown
                        icon={FiChevronDown}
                        style="text-white cursor-pointer"
                        size={25}
                        placement="right-0"
                    />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
