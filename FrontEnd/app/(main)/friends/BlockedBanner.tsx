"use client";
import { MyDropdown } from "@/components";
import MyToggle from "@/components/tools/MyToggle";
import React, { useState } from "react";
import MiniLoader from "@/components/tools/MiniLoader";
import { unblockuser } from "@/api/friendShip";

const BlockedBanner = (props: {
	zindex?: number;
	image: any;
	userName: string;
	status: string;
	uid: string;
	SetInvalidData: any;
	friends: any;
	isNotBlocked: boolean;
}) => {
	const [enabled, setEnabled] = useState(true);
	const unblock = unblockuser(props.uid, props.userName);

	if (unblock.isPending || props.friends.isFetching)
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
						user={props.userName}
						setDataInvalid={props.SetInvalidData}
						isNotBlocked={props.isNotBlocked}
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
					<MyToggle
						otherclass="h-[38px] flex min-w-[120px]"
						handelCheck={() => {
							unblock.mutate();
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

export default BlockedBanner;
