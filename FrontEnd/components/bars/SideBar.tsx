"use client";

import { apiHost, defaultavatar, myRoutes } from "@/const";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoGameControllerOutline } from "react-icons/io5";
import { QueryCache, useQueryClient } from "@tanstack/react-query";

import {
	LuLayoutDashboard,
	LuUsers,
	LuMessageSquare,
	LuSettings,
	LuLogOut,
} from "react-icons/lu";
import { useUser } from "@/api/getHero";
import { useGlobalSocket } from "@/providers/UserContextProvider";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/providers/SocketProvider";

const RenderSideBarElements = (
	index: number,
	link: string,
	name: string,
	notif?: boolean
) => {
	const path = usePathname();
	const router = useRouter();

	const Elements = [
		<LuLayoutDashboard size="64" />,
		<LuUsers size="64" />,
		<LuMessageSquare size="64" />,
		<IoGameControllerOutline size="64" />,
		<LuSettings size="64" />,
	];

	const elm = Elements[index];

	const goTo = () => {
		router.push(link);
	};

	return (
		<div onClick={goTo}>
			<div
				className={`flex px-4 cursor-pointer relative items-center hover:bg-greenborder hover:rounded-md 2xl:space-x-7 h-auto w-full ${
					path === link
						? "bg-palette-green text-palette-orange  rounded-md"
						: "text-white rounded-md"
				} `}
			>
				{elm}
				<span
					className={` font-body w-full hidden 2xl:flex font-bold text-2xl ${
						path === link ? "text-palette-orange" : "text-white"
					} `}
				>
					{name}
				</span>
				{!notif && (index === 1 || index === 2) && (
					<span className="h-3 w-3 rounded-full absolute top-1 right-1 bg-palette-orange " />
				)}
			</div>
		</div>
	);
};

const SideBar = () => {
	const router = useRouter();
	const user = useUser(true);
	const { username, avatar } = user.data;
	const { globalSocket } = useGlobalSocket();
	const query = useQueryClient();
	const { viewed, setViewed, viewedChat } = useGlobalContext();

	const handleLogout = async () => {
		const apiUrl = `${apiHost}user/signout`;

		await new Promise((resolve) => setTimeout(resolve, 500));
		await axios
			.get(apiUrl, { withCredentials: true })
			.then((response) => {
				console.log("data posted successfuly : ");
				localStorage.removeItem("isLoged");
				globalSocket.emit("offline");
				router.push("/");
				query.removeQueries();
			})
			.catch((e) => {
				console.log(".catch error", e);
			});
	};

	return (
		<aside
			className={` text-white pb-3 2xl:min-w-[280px] w-[100px]  bg-[#537073] min-h-screen hidden sm:flex flex-col rounded-sm justify-between items-center border-y-2 border-r-2 border-[#D6E4E5]`}
		>
			{/* top part */}

			<div className=" h-auto py-12 w-full flex justify-around items-center">
				<img
					src="/sidebarlogo.png"
					alt="logo"
					height={60}
					width={60}
					className="object-contain"
				/>
				<div className="pr-8 hidden 2xl:flex xl:flex-col">
					<h2 className="text-white text-left font-bold text-2xl">
						YOU PONG
					</h2>
					<p className="text-gray-300 font-light text-left  text-xl">
						Transcendnece
					</p>
				</div>
			</div>

			<div className=" 2xl:w-[94%] w-[88%] h-full px-2 pb-3 pt-8 bg-[#4F777A] shadow-xl rounded-sm flex flex-col justify-between my_scroll_orange overflow-y-auto ">
				{/* middle part */}
				<div className="h-auto flex flex-col space-y-5">
					{RenderSideBarElements(0, myRoutes.dashboard, "Dashboard")}
					{RenderSideBarElements(
						1,
						myRoutes.friends,
						"Friends",
						viewed
					)}
					{RenderSideBarElements(
						2,
						myRoutes.chat,
						"Messages",
						viewedChat
					)}
					{RenderSideBarElements(3, myRoutes.gameme, "Game")}
					{RenderSideBarElements(4, myRoutes.settings, "Settings")}
				</div>
				{/* bottom part */}

				<div className="h-full w-full  pb-6 justify-end flex flex-col space-y-6 items-center px-2">
					<Link className="h-auto w-[92%] " href={myRoutes.dashboard}>
						<div className="w-full py-3 h-auto 2xl:bg-palette-grey rounded-md flex justify-evenly items-center">
							<img
								className="border-2 min-w-[40px] aspect-1 xl:max-w-[40px] hidden s:flex border-white rounded-sm object-cover"
								src={avatar || defaultavatar}
								alt=""
								width={100}
								height={100}
							/>
							<p className="text-gray-500 break-all text-center hidden 2xl:flex overflow-hidden font-bold font-body text-2xl drop-shadow-sm">
								{username.length > 9
									? username.slice(0, 9) + "."
									: username}
							</p>
						</div>
					</Link>

					<hr className="w-[80%] py-1" />

					<div
						onClick={() => handleLogout()}
						className="w-full flex cursor-pointer justify-center"
					>
						<div className="w-[90%]  h-12 border-2 rounded-md border-palette-white space-x-4 flex justify-center items-center">
							<LuLogOut size="30" />

							<span className="text-2xl hidden 2xl:flex font-body font-bold ">
								Log out
							</span>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default SideBar;
