"use client";
import React from "react";
import MyToolTip from "./MyToolTip";
import { useGlobalSocket } from "@/providers/UserContextProvider";

const MyToast = (props: { userName: string }) => {
	const { globalSocket } = useGlobalSocket();

	const handelClick = (cmd: string) => {
		if (cmd === "accept") {
			globalSocket.emit("accept");
		} else {
			globalSocket.emit("refuse");
		}
	};
	return (
		<div className="h-[100px] flex flex-col items-center justify-center mb-8 w-full bg-white">
			<div className="flex items-center justify-around w-full h-full max-h-[80px]">
				<div className="w-auto   max-w-[80px]">
					<div className="w-[70%] pb-[70%] mx-auto relative">
						<img
							className=" h-[100%] drop-shadow-md w-[100%] border-b border-palette-orange absolute object-contain rounded-md"
							src={"/ozahid-.jpeg"}
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
						handelClick("accept");
					}}
					className="bg-palette-green p-2 drop-shadow-md hover:opacity-70 focus:animate-pulse rounded-md text-white text-sm"
				>
					Accept
				</button>
				<button
					onClick={() => {
						handelClick("refuse");
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
