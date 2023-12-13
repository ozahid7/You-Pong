"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { LuSearch, LuBell } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { AnimatedText, MyDropdown } from "..";
import SearchBar from "./SearchBar";
import { MyContext } from "@/app/(main)/layout";
import { useQuery } from "@tanstack/react-query";
import { friendsEndPoint, searchUsers } from "@/types/Api";
import { useAxios } from "@/utils";
import { myRoutes, navMenuElements } from "@/const";
import { useRouter } from "next/navigation";

const NavBar = () => {
    const user = useContext(MyContext);
    const router = useRouter()
    const { username, level, avatar } = user.userData;
    const [friends, setFriends] = useState<searchUsers>();
    const isMorethan: boolean = username.length > 7 ? true : false;
    const childcustomClass = `${
        isMorethan ? "animate-marquee" : "animate-m"
    } whitespace-nowrap`;

    const getUsers = async () => {
        try {
            const response = await useAxios<searchUsers>(
                "get",
                friendsEndPoint.search
            );
            setFriends(response);
        } catch (error) {
        }
        return null
    };

    const searchQuery = useQuery({
        queryKey: ["search"],
        queryFn: getUsers,
    });

    return (
        <nav className="flex justify-end w-full items-center px-4 h:px-8 sm:px-14 py-6">
            <div className="flex justify-end  s:w-full sm:w-[90%] max-w-[800px] space-x-4 md:w-[80%] h-full s:flex items-center">
                {/* input search */}
                <SearchBar FriendsList={friends} />
                <img
                    className="border-2 hidden cursor-pointer s:flex border-white rounded-sm object-contain"
                    src={avatar}
                    alt=""
                    onClick={() => {
                        router.push(myRoutes.dashboard);
                    }}
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
                        menuElements={navMenuElements}
                    />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
