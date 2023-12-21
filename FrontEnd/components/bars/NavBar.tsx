"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { LuSearch, LuBell } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { AnimatedText, MyDropdown } from "..";
import SearchBar from "./SearchBar";
import { useQuery } from "@tanstack/react-query";
import { friendsEndPoint, searchBarReturn, searchUsers } from "@/types/Api";
import { useAxios } from "@/utils";
import { myRoutes, navMenuElements } from "@/const";
import { useRouter } from "next/navigation";
import { MyContext, useUser } from "@/providers/UserContextProvider";
import { searchusers } from "@/api/friendShip";
import Loader from "../tools/Loader";
import { getMe } from "@/api/getHero";

const NavBar = () => {
	const user = getMe(true);
	const router = useRouter();
	const { username, level, avatar } = user.data;
	const isMorethan: boolean = username.length > 7 ? true : false;
	const childcustomClass = `${
		isMorethan ? "animate-marquee" : "animate-m"
	} whitespace-nowrap`;
	const search = searchusers();

	return (
		<nav className="flex justify-end w-full items-center px-4 h:px-8 sm:px-14 py-6">
			<div className="flex justify-end  s:w-full sm:w-[90%] max-w-[800px] space-x-4 md:w-[80%] h-full s:flex items-center">
				{search.data && <SearchBar FriendsList={search.data} />}
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
