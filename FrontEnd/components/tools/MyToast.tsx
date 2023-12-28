"use client";
import React from "react";
import MyToolTip from "./MyToolTip";
import { useGlobalSocket } from "@/providers/UserContextProvider";
import { infoGame } from "@/types/game";
import { acceptGame, refuseGame } from "@/utils/game";
import { useRouter } from "next/navigation";

const MyToast = (props: {
	userName: string;
	avatar: string;
	info: infoGame;
}) => {
	const router = useRouter();
	const { globalSocket } = useGlobalSocket();

	return (
		<div className="h-[100px] flex flex-col items-center justify-center mb-8 w-full bg-white">
			<div className="flex items-center justify-around w-full h-full max-h-[80px]">
				<div className="w-auto   max-w-[80px]">
					<div className="w-[70%] pb-[70%] mx-auto relative">
						<img
							className=" h-[100%] drop-shadow-md w-[100%] border-b border-palette-orange absolute object-contain rounded-md"
							src={props.avatar}
							alt="avatar"
						/>
					</div>
					<MyToolTip id="username" />
					<span
						data-tooltip-id="username"
						data-tooltip-content={props.userName}
						className="font-body text-palette-green text-sm font-bold"
					>
						{props.userName.length > 8
							? props.userName.slice(0, 8)
							: props.userName}
					</span>
				</div>
				<button
					onClick={() => {
						acceptGame(props.info, globalSocket, router);
					}}
					className="bg-palette-green p-2 drop-shadow-md hover:opacity-70 focus:animate-pulse rounded-md text-white text-sm"
				>
					Accept
				</button>
				<button
					onClick={() => {
						refuseGame(props.info, globalSocket);
					}}
					className="bg-palette-orange p-2 drop-shadow-md hover:opacity-70 rounded-md text-sm text-white"
				>
					Cancel
				</button>
			</div>
			<span className="text-[14px] drop-shadow-md font-orbitron text-cardtitle">
				Invite You To A New Game ?
			</span>
		</div>
	);
};

export default MyToast;
