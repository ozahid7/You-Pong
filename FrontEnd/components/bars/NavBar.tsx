"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { LuSearch, LuBell } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { AnimatedText, MyDropdown } from "..";
import SearchBar from "./SearchBar";
import { MyContext } from "@/app/(main)/layout";

const obj = {
    name: "oussama zahid",
}
const NavBar = () => {
    const user = useContext(MyContext);
    const { username, level, avatar } = user.userData;
    const isMorethan: boolean = username.length > 7 ? true : false;
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
                <img
                    className="border-2 hidden s:flex border-white rounded-sm object-contain"
                    src={avatar || 'avatar.avif'}
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
                                    {username}
                                </span>
                            </div>
                        </div>
                        <span className="text-palette-grey font-light">
                            Lvl: {level}
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
