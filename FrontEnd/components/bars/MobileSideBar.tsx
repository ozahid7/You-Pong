"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoGameControllerOutline } from "react-icons/io5";

import {
	LuLayoutDashboard,
	LuUsers,
	LuBell,
	LuMessageSquare,
	LuSettings,
	LuLogOut,
} from "react-icons/lu";
import { myRoutes } from "@/const";
import { useGlobalContext } from "@/providers/SocketProvider";

const RenderMobileSidBarElement = (
	index: number,
	link: string,
	notif?: boolean
) => {
	const path = usePathname();
	const customclass = "h-[30px] sm:h-[40px]";

	const Elements = [
		<LuLayoutDashboard size="40" className={customclass} />,
		<LuUsers size="40" className={customclass} />,
		<LuMessageSquare size="40" className={customclass} />,
		<IoGameControllerOutline size="40" className={customclass} />,
		<LuSettings size="40" className={customclass} />,
	];

	const elm = Elements[index];

	return (
		<Link href={link}>
			<div
				className={`flex px-[1px] py-[3px] s:px-2 s:py-2  items-center hover:bg-palette-green hover:rounded-md relative  h-auto w-full ${
					path === link
						? "text-palette-orange bg-palette-green rounded-lg"
						: "text-white"
				} `}
			>
				{elm}
				{!notif && index === 2 && (
					<span className="h-[6px] w-[6px] rounded-full absolute top-1 right-1 bg-palette-orange " />
				)}
			</div>
		</Link>
	);
};

export const renderFriends = (
	link: string,
	name: string,
	requests?: number
) => {
	const path = usePathname();

	return (
		<Link href={link}>
			<div
				className={`flex px-4 cursor-pointer relative items-center hover:bg-greenborder hover:rounded-md 2xl:space-x-7 h-auto w-full ${
					path === link
						? "bg-palette-green text-palette-orange  rounded-md"
						: "text-white rounded-md"
				} `}
			>
				{<LuUsers size="40" />}

				{requests > 0 && (
					<span className="h-[6px] w-[6px] rounded-full absolute top-1 right-1 bg-palette-orange " />
				)}
			</div>
		</Link>
	);
};

const MobileSideBar = () => {
	const { viewed, viewedChat, requests } = useGlobalContext();

	return (
		<aside className=" w-full fixed bottom-0 flex sm:hidden items-end">
			<div className=" s:px-6 w-full py-2 bg-greenborder border-t-2  border-palette-grey flex items-center px-2 rounded-t-3xl  justify-between">
				{RenderMobileSidBarElement(0, myRoutes.dashboard)}
				{renderFriends(myRoutes.friends, "Friends", requests)}
				{RenderMobileSidBarElement(2, myRoutes.chat, viewedChat)}
				{RenderMobileSidBarElement(3, myRoutes.gameme)}
				{RenderMobileSidBarElement(4, myRoutes.settings)}
			</div>
		</aside>
	);
};

export default MobileSideBar;
