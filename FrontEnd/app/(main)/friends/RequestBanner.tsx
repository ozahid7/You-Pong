"use client";
import { MyDropdown } from "@/components";
import MyToggle from "@/components/tools/MyToggle";
import React, { useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import MiniLoader from "@/components/tools/MiniLoader";
import { menuUserElements } from "@/const";
import { acceptuser, blockuser, declineuser } from "@/api/friendShip";
import { useGlobalSocket } from "@/providers/UserContextProvider";

const RequestBanner = (props: {
	zindex?: number;
	image: any;
	userName: string;
	uid: string;
	status: string;
	SetInvalidData: any;
}) => {
	const [enabled, setEnabled] = useState(false);
	const block = blockuser(props.uid, () => {}, props.userName);
	const accept = acceptuser(props.uid);
	const decline = declineuser(props.uid);
	const { globalSocket } = useGlobalSocket();

	if (decline.isPending || accept.isPending || block.isPending)
		return <MiniLoader customClass="m-auto" />;
	return (
		<div
			className={`h-full w-full min-h-[70px] shadow-lg bg-palette-white rounded-sm flex justify-around items-center`}
		>
			<div className="h-full items-center space-x-2 md:space-x-4 flex">
				<MyDropdown
					icon=""
					image={props.image}
					placement="left-0"
					menuElements={menuUserElements}
					user={props.userName}
					setDataInvalid={props.SetInvalidData}
				/>
				<div className="flex flex-col">
					<span
						data-tooltip-id="username"
						data-tooltip-content={props.userName}
						className="font-body text-palette-green text-sm h:text-lg font-bold"
					>
						{props.userName.length > 7
							? props.userName.slice(0, 7) + "."
							: props.userName}
					</span>
					<span className="font-light text-cardtitle text-sm">
						{props.status}
					</span>
				</div>
			</div>
			<div className="flex space-x-2 md:space-x-8">
				<div
					onClick={() => {
						accept.mutate();
					}}
					className="h-auto w-auto"
				>
					<FaUserCheck
						size={40}
						className="cursor-pointer bg-white p-1 drop-shadow-md rounded-md text-palette-green"
					/>
				</div>
				<div
					onClick={() => {
						decline.mutate();
					}}
					className="h-auto w-auto"
				>
					<FaUserTimes
						size={40}
						className="cursor-pointer bg-white p-1 drop-shadow-md rounded-md text-palette-orange"
					/>
				</div>
				<MyToggle
					otherclass="h-[38px] hidden lg:flex min-w-[120px]"
					handelCheck={() => {
						globalSocket.emit("removeRequest", {
							id_receiver: props.uid,
							is_message: false,
						});
						block.mutate();
					}}
					string1="unblock"
					string2="block"
					enabled={enabled}
					setIsEnabled={setEnabled}
				/>
			</div>
		</div>
	);
};

export default RequestBanner;
