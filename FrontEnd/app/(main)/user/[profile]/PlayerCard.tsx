"use client";

import { MiniBanner, MyCard } from "@/components";
import React, { useEffect, useState } from "react";
import { MdOutlineSettings } from "react-icons/md";
import { FaUserClock, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { HiBan } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { myRoutes } from "@/const";
import { adduser, blockuser, removeuser, todirect } from "@/api/friendShip";
import { useGlobalSocket } from "@/providers/UserContextProvider";
import { LuMessageSquarePlus } from "react-icons/lu";
import { BsController } from "react-icons/bs";

import useOtherUser from "@/api/useOtherUser";
import { UseQueryResult } from "@tanstack/react-query";
import { UserInfo } from "@/types/Api";
import { notify } from "@/utils/game";

const PlayerCard = (props: {
	param: string;
	avatar: string;
	username: string;
	rank: string;
	level: number;
	isMe: boolean;
	user_relation: number;
	status: string;
	uid: string;
	user: UseQueryResult<UserInfo, Error>;
}) => {
	const iconsStyle =
		"z-10 h-[16%] w-[16%] bg-palette-white p-[7px] rounded-lg drop-shadow-md absolute sm:bottom-6 xl:w-[12%] xl:h-[12%] h:right-3 bottom-4 right-1 text-palette-green cursor-pointer";
	const directIconStyle =
		"z-10 h-[16%] w-[16%] bg-palette-white p-[5px] rounded-lg drop-shadow-md absolute  xl:w-[12%] xl:h-[12%] h:right-3  right-1  cursor-pointer";
	const [isFriend, setIsFriend] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const [color, setColor] = useState("");
	const [subcolor, setSubColor] = useState("");
	const [textColor, setTextColor] = useState("");
	const { globalSocket } = useGlobalSocket();
	const Block = blockuser(props.uid, undefined);
	const Add = adduser(props.uid, props.username);
	const Remove = removeuser(props.uid, props.username);
	const direct = todirect(props.uid);
	const otheruser = useOtherUser(props.param);

	useEffect(() => {
		if (props.isMe)
			props.user.refetch().then((response) => {
				const status = response.data.status;
				if (status === "ONLINE") {
					setColor("bg-green-600");
					setSubColor("bg-green-500");
					setTextColor("text-green-600");
				} else if (status === "OFFLINE") {
					setTextColor("text-red-600");
					setColor("bg-red-600");
					setSubColor("bg-red-500");
				} else if (status === "INGAME") {
					setTextColor("text-yellow-600");
					setColor("bg-yellow-600");
					setSubColor("bg-yellow-500");
				}
			});
		if (!props.isMe) {
			otheruser.refetch().then((response) => {
				const status = response.data.status;
				if (status === "ONLINE") {
					setColor("bg-green-600");
					setSubColor("bg-green-500");
					setTextColor("text-green-600");
				} else if (status === "OFFLINE") {
					setTextColor("text-red-600");
					setColor("bg-red-600");
					setSubColor("bg-red-500");
				} else if (status === "INGAME") {
					setTextColor("text-yellow-600");
					setColor("bg-yellow-600");
					setSubColor("bg-yellow-500");
				}
			});
		}
	}, [globalSocket.disconnected, globalSocket.connected, props.status]);

	let name = props.username.replace(/[^a-zA-Z]/g, "");

	name =
		props.username.length > 7
			? name.slice(0, 3) +
			  "-" +
			  props.username.slice(props.username.length - 3)
			: props.username;

	const pendingIcon = (
		<FaUserClock
			onClick={() => {
				Remove.mutate();
				setIcon(addIcon);
			}}
			size={100}
			className={iconsStyle}
		/>
	);
	const addIcon = (
		<FaUserPlus
			onClick={() => {
				Add.mutate();
				setIcon(pendingIcon);
				otheruser.refetch();
			}}
			size={100}
			className={iconsStyle}
		/>
	);

	const removeIcon = (
		<FaUserMinus
			onClick={() => {
				Remove.mutate();
				setIcon(addIcon);
				otheruser.refetch();
			}}
			size={100}
			className={iconsStyle}
		/>
	);

	const [Icon, setIcon] = useState<any>(FaUserClock);
	useEffect(() => {
		props.user_relation === 2
			? setIcon(addIcon)
			: props.user_relation === 0
			? setIcon(pendingIcon)
			: setIcon(removeIcon);
	}, [isFriend, isPending]);
	return (
		<div className="flex justify-center  z-0 w-[90%] md:w-full overflow-hidden min-h-[180px] max-w-[600px] h:min-h-[204px] h-[20%] md:h-[30%] h:h-[24%]">
			<MyCard otherclass="">
				<div className="w-full relative justify-between items-center flex h-full">
					<h3 className=" whitespace-nowrap absolute top-2 left-4 sm:left-8 sm:top-4   text-cardtitle  text-[12px] h:text-lg md:text-xl font-bold font-audio drop-shadow-sm">
						Player Card
					</h3>
					<div className="sm:w-[40%] w-[34%] md:pt-4 flex flex-col justify-center items-center h-[60%] md:h-[80%]">
						<div className="w-[80%] pt-4 md:pt-2 h-[90%] md:w-[60%] md:pb-[60%] xl:w-[80%] xl:h-[80%] relative">
							<img
								className=" h-[100%] w-[100%] absolute object-contain rounded-md"
								src={props.avatar}
								alt="avatar"
							/>
						</div>
					</div>
					<div className="w-[62%] h-full pr-1 sm:pr-0 flex flex-col items-center justify-center pt-1 sm:pt-2 relative">
						{props.isMe ? (
							<MdOutlineSettings
								onClick={() => {
									router.push("/settings");
								}}
								size={120}
								className="z-10 h-[12%] w-[12%] absolute top-2 right-1 text-palette-green cursor-pointer"
							/>
						) : (
							<HiBan
								onClick={() => {
									Block.mutate();
									router.push(myRoutes.dashboard);
								}}
								size={100}
								className="z-10 h-[12%] w-[12%] absolute top-2 right-1 text-red-600 cursor-pointer"
							/>
						)}

						{!props.isMe && Icon}
						{!props.isMe && (
							<>
								<LuMessageSquarePlus
									size={100}
									strokeWidth={2.5}
									className={`${directIconStyle} sm:bottom-[70px] bottom-14 text-palette-orange`}
									onClick={() => {
										console.log("first");
										direct.mutate();
									}}
								/>
								<BsController
									size={100}
									strokeWidth={0.5}
									className={`${directIconStyle} sm:bottom-[117px] bottom-24 text-palette-green`}
									onClick={() => {
										if (otheruser.data.status === "INGAME")
											notify(
												props.username,
												props.avatar,
												false,
												2000,
												"Player Already In Game 😞"
											);
										else
											router.push(
												myRoutes.game +
													"/" +
													otheruser.data.uid
											);
									}}
								/>
							</>
						)}
						<div className="sm:w-[86%] h-[76%] mt-4 w-full flex flex-col justify-evenly space-y-1 relative">
							<div className=" w-full relative space-x-1  flex">
								<h2 className="font-extrabold mt-2 font-russo text-2xl h:text-3xl lg:text-4xl text-cardtitle drop-shadow">
									{name}
								</h2>
								{textColor.length > 0 ? (
									<p
										className={`absolute -top-1 left-0 text-[12px] ${textColor}`}
									>
										{props.status.toLowerCase()}
									</p>
								) : (
									<></>
								)}
								<span className="relative  flex h-2 w-2  sm:h-3 sm:w-3">
									<span
										className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color}  opacity-75`}
									></span>
									<span
										className={`relative inline-flex rounded-full w-2 h-2 sm:h-3 sm:w-3 ${subcolor} `}
									></span>
								</span>
							</div>
							<div className="flex flex-col justify-between h-auto space-y-3 w-[80%] sm:w-[90%]">
								<MiniBanner
									isGreen={true}
									value={props.level.toString()}
									name="Level"
								/>

								<MiniBanner
									isGreen={false}
									isRank={true}
									value={props.rank.toString()}
									name="Rank"
									rank={props.rank}
								/>
							</div>
						</div>
					</div>
				</div>
			</MyCard>
		</div>
	);
};

export default PlayerCard;
