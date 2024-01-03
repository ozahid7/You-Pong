"use client";
import { MyDropdown } from "@/components";
import MyToggle from "@/components/tools/MyToggle";
import React, { useState } from "react";
import { LuMessageSquarePlus } from "react-icons/lu";
import MiniLoader from "@/components/tools/MiniLoader";
import { menuUserElements } from "@/const";
import { blockuser, todirect } from "@/api/friendShip";

const FriendBanner = (props: {
	zindex?: number;
	image: any;
	userName: string;
	uid: string;
	status: string;
	SetInvalidData: any;
}) => {
	const [enabled, setEnabled] = useState(false);
	const block = blockuser(props.uid);
	const direct = todirect(props.uid);

	if (block.isPending || direct.isPending)
		return <MiniLoader customClass="m-auto" />;
	else
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
						uid={props.uid}
						status={props.status}
						setDataInvalid={props.SetInvalidData}
					/>
					<div className="flex flex-col">
						<span
							data-tooltip-id="username"
							data-tooltip-content={props.userName}
							className="font-body text-palette-green text-lg font-bold"
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
					<LuMessageSquarePlus
						onClick={() => {
							direct.mutate();
						}}
						size={40}
						className="cursor-pointer bg-white p-1 drop-shadow-md rounded-md text-palette-green"
					/>
					<MyToggle
						otherclass="h-[38px] hidden sm:flex min-w-[120px]"
						handelCheck={() => {
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

export default FriendBanner;
