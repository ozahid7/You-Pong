"use client";

import { MiniBanner, MyCard } from "@/components";
import React, { useEffect, useState } from "react";
import { MdOutlineSettings } from "react-icons/md";
import { FaUserClock, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { HiBan } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { myRoutes } from "@/const";
import useFriends from "@/api/useFriends";
import { adduser, blockuser, removeuser } from "@/api/friendShip";
import { IconType } from "react-icons";
import { useGlobalSocket } from "@/providers/UserContextProvider";

interface statuProps {
	id_user: string;
	status: string;
}

const PlayerCard = (props: {
	username: string;
	avatar: string;
	rank: number;
	level: number;
	isMe: boolean;
	isPending: boolean;
	status: string;
	uid: string;
}) => {
	const userIconStyle =
		"z-10 h-[14%] w-[14%]  absolute sm:bottom-6 xl:w-[12%] xl:h-[12%] h:right-3 bottom-4 right-1  text-cardtitle cursor-pointer";
	const [isFriend, setIsFriend] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const router = useRouter();
	const [color, setColor] = useState("");
	const [subcolor, setSubColor] = useState("");
	const friends = useFriends();
	

	var Block = blockuser(props.uid, friends, undefined);
	var Add = adduser(props.uid, friends);
	var Remove = removeuser(props.uid, friends);

	const globalSocket = useGlobalSocket();
	useEffect(() => {
		globalSocket.on("status", (obj: statuProps) => {
			{
				if (obj.status === 'ONLINE')
				{
					setColor( "bg-green-600")
					setSubColor( "bg-green-500")
				}
				else if (obj.status === 'OFFLINE')
				{
					setColor("bg-red-600");
					setSubColor("bg-red-500");
				}
				else if (obj.status === 'INGAME')
				{
					setColor("bg-blue-600");
					setSubColor("bg-blue-500");
				}
			}
		});
	}, []);

	useEffect(() => {
		if (friends.data) {
			friends.data.accepted.map((elm: any) => {
				if (props.username === elm.username) setIsFriend(true);
			});
			friends.data.pending.map((elm) => {
				if (props.username === elm.username) setIsPending(true);
			});
		}
	});
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
			className={userIconStyle}
		/>
	);
	const addIcon = (
		<FaUserPlus
			onClick={() => {
				Add.mutate();
				setIcon(pendingIcon);
			}}
			size={100}
			className={userIconStyle}
		/>
	);

	const removeIcon = (
		<FaUserMinus
			onClick={() => {
				Remove.mutate();
				setIcon(addIcon);
			}}
			size={100}
			className={userIconStyle}
		/>
	);

	const [Icon, setIcon] = useState<any>(FaUserClock);
	useEffect(() => {
		!isFriend && !isPending && !props.isPending
			? setIcon(addIcon)
			: isPending || props.isPending
			? setIcon(pendingIcon)
			: setIcon(removeIcon);
	}, [isFriend, isPending]);
	return (
		<div className="flex justify-center z-0 w-[90%] md:w-full overflow-hidden min-h-[180px] max-w-[600px] h:min-h-[204px] h-[20%] md:h-[30%] h:h-[24%]">
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
								className="z-10 h-5 w-5 sm:h-[12%]  sm:w-[12%] s:h-[16%] s:w-[16%] absolute top-1 right-1 sm:top-2 sm:right-2  text-cardtitle cursor-pointer"
							/>
						) : (
							<HiBan
								onClick={() => {
									Block.mutate();
									router.push(myRoutes.dashboard);
								}}
								size={100}
								className="z-10 h-5 w-5 sm:h-[12%]  sm:w-[12%] s:h-[16%] s:w-[16%] absolute top-1 right-1 sm:top-2 sm:right-2  text-cardtitle cursor-pointer"
							/>
						)}

						{!props.isMe && Icon}
						<div className="sm:w-[86%] h-[76%] mt-4 w-full flex flex-col justify-evenly space-y-1 relative">
							<div className=" w-full space-x-1  flex">
								<h2 className="font-extrabold mt-2 font-russo text-2xl h:text-3xl sm:text-4xl md:text-4xl text-cardtitle drop-shadow">
									{name}
								</h2>
								<span className="relative flex h-2 w-2  sm:h-3 sm:w-3">
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
									value={props.rank.toString()}
									name="Rank"
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
