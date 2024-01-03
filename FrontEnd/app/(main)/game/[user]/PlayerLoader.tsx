"use client";
import { MyDialog } from "@/components";
import Loader from "@/components/tools/Loader";
import { useGameContext } from "@/providers/InviteProvider";
import { inviteReturn } from "@/types/game";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { defaultavatar, myRoutes } from "@/const";
import { MdCancelPresentation } from "react-icons/md";
import { useGlobalSocket } from "@/providers/UserContextProvider";
import { Socket } from "socket.io-client";
import { cancelGame, refuseGame } from "@/utils/game";

const PlayerLoader = (props: {
	isOpen: boolean;
	showCounter: any;
	showLoader: any;
	avatar: string;
	username: string;
	level: number;
	map: string;
	mode: string;
	opponent_uid: string;
	my_id: string;
	game_id: string;
	socket: Socket;
	path: string;
	setotheruser: any;
}) => {
	const [isMatched, setIsmatched] = useState(false);
	const router = useRouter();
	const otheruser = useGameContext();
	const { setData } = otheruser;
	const { globalSocket } = useGlobalSocket();
	const [userInfo, setUserInfo] = useState<inviteReturn>();
	let editedLevel2;
	let editedLevel1;

	useEffect(() => {
		if (otheruser.data && otheruser.data !== undefined) {
			setIsmatched(true);
			setTimeout(() => {
				props.showLoader(false);
				props.showCounter(true);
			}, 2000);
			setUserInfo(otheruser.data);
			props.setotheruser({
				avatar: otheruser.data.avatar,
				username: otheruser.data.username,
			});
			otheruser.setData(undefined);
		}
	}, [otheruser, otheruser.data]);

	useEffect(() => {
		props.socket.emit("inGame", {
			id_sender: props.my_id,
			map: props.map.toUpperCase(),
			mode: props.mode.toUpperCase(),
			is_public: props.path === "me",
		});
	}, []);

	const onClose = () => {
		cancelGame(
			{
				id_game: props.game_id,
				id_sender: props.my_id,
				id_receiver: props.opponent_uid,
				socket_player: props.socket.id,
				map: props.map,
				mode: props.mode,
			},
			props.socket
		);
		router.push(myRoutes.dashboard);
		setData(undefined);
	};

	if (userInfo && userInfo !== undefined) {
		editedLevel2 = userInfo.level.toFixed(1);
		editedLevel2 = editedLevel2.endsWith(".0")
			? editedLevel2.slice(0, editedLevel2.length - 2)
			: editedLevel2;
	}

	editedLevel1 = props.level.toFixed(1);
	editedLevel1 = editedLevel1.endsWith(".0")
		? editedLevel1.slice(0, editedLevel1.length - 2)
		: editedLevel1;

	return (
		<MyDialog
			isOpen={props.isOpen}
			closemodal={() => {
				onClose();
			}}
			withCorner={true}
			withClose={true}
			customClass="absolute h-[40%] lg:h-[50%] min-h-[400px] w-[80%] max-w-[800px]"
			conClass="bg-palette-grey border-4 rounded-md border-palette-white "
		>
			<MdCancelPresentation
				size={25}
				onClick={() => {
					onClose();
				}}
				className="absolute z-10 text-gray-400  cursor-pointer  top-0 right-0  rounded-sm"
			/>
			<div className="flex items-center justify-center flex-col h-full">
				<div className="w-full flex flex-col h:flex-row h-full">
					<div className="flex-1 flex flex-col justify-center items-center w-full">
						<img
							className="border-2 min-w-[40px] max-w-[80px] md:max-w-[120px] lg:max-w-[140px] xl:max-w-[180px] flex border-white rounded-sm object-contain"
							src={props.avatar || defaultavatar}
							alt=""
							width={500}
							height={500}
						/>
						<button className=""></button>

						<div className="flex w-full items-center flex-col">
							<span className="font-body font-bold text-palette-green text-xl md:text-2xl lg:text-3xl">
								{props.username.slice(0, 7)}
							</span>
							<span className="font-roboto text-cardtitle text-md">
								Lvl: {editedLevel1}
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
									src={userInfo.avatar || defaultavatar}
									alt=""
									width={500}
									height={500}
								/>
								<div className="flex w-full items-center flex-col">
									<span className="font-body font-bold text-palette-green text-xl md:text-2xl lg:text-3xl">
										{userInfo.username.slice(0, 7)}
									</span>
									<span className="font-roboto text-cardtitle text-md">
										Lvl: {editedLevel2}
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
