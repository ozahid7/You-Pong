"use client";
import { MyDialog } from "@/components";
import Loader from "@/components/tools/Loader";
import { useGameContext } from "@/providers/InviteProvider";
import { inviteReturn } from "@/types/game";
import React, { useEffect, useState } from "react";
import { setData } from "../../chat/data/api";

const PlayerLoader = (props: {
	isOpen: boolean;
	showCounter: any;
	showLoader: any;
	avatar: string;
	username: string;
	level: number;
}) => {
	const [isMatched, setIsmatched] = useState(false);

	const otheruser = useGameContext();
	const [userInfo, setUserInfo] = useState<inviteReturn>();

	useEffect(() => {
		if (otheruser.data && otheruser.data !== undefined) {
			setIsmatched(true);
			setTimeout(() => {
				props.showLoader(false);
				props.showCounter(true);
			}, 2000);
			setUserInfo(otheruser.data);
			otheruser.setData(undefined);
		}
	}, [otheruser, otheruser.data]);

	return (
		<MyDialog
			isOpen={props.isOpen}
			closemodal={() => {}}
			withCorner={true}
			withClose={true}
			customClass="absolute h-[40%] lg:h-[50%] min-h-[400px] w-[80%] max-w-[800px]"
			conClass="bg-palette-grey border-4 rounded-md border-palette-white "
		>
			<div className="flex items-center justify-center flex-col h-full">
				<div className="w-full flex flex-col h:flex-row h-full">
					<div className="flex-1 flex flex-col justify-center items-center w-full">
						<img
							className="border-2 min-w-[40px] max-w-[80px] md:max-w-[120px] lg:max-w-[140px] xl:max-w-[180px] flex border-white rounded-sm object-contain"
							src={props.avatar}
							alt=""
							width={500}
							height={500}
						/>
						<div className="flex w-full items-center flex-col">
							<span className="font-body font-bold text-palette-green text-xl md:text-2xl lg:text-3xl">
								{props.username.slice(0, 7)}
							</span>
							<span className="font-roboto text-cardtitle text-md">
								Lvl: {props.level}
							</span>
						</div>
					</div>
					<div className="flex-1 flex justify-center items-center w-full">
						<span className="text-6xl sm:text-7xl lg:text-8xl drop-shadow-md text-palette-orange font-audio font-extrabold ">
							VS
						</span>
					</div>
					<div className="flex-1 flex flex-col justify-center items-center w-full">
						{isMatched ? (
							<div className="flex-1 flex flex-col justify-center items-center w-full">
								<img
									className="border-2 min-w-[40px] max-w-[80px] md:max-w-[120px] lg:max-w-[140px] xl:max-w-[180px] flex border-white rounded-sm object-contain"
									src={userInfo.avatar}
									alt=""
									width={500}
									height={500}
								/>
								<div className="flex w-full items-center flex-col">
									<span className="font-body font-bold text-palette-green text-xl md:text-2xl lg:text-3xl">
										{userInfo.username.slice(0, 7)}
									</span>
									<span className="font-roboto text-cardtitle text-md">
										Lvl: {userInfo.level}
									</span>
								</div>
							</div>
						) : (
							<Loader />
						)}
					</div>
				</div>
			</div>
		</MyDialog>
	);
};

export default PlayerLoader;
