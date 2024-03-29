"use client";
import { Map, CustomButton, Mode, MyDialog } from "@/components";
import { myRoutes } from "@/const";
import { UserInfo } from "@/types/Api";
import { inviteGame, notify } from "@/utils/game";
import { UseQueryResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { MdCancelPresentation } from "react-icons/md";
import { Socket } from "socket.io-client";

export default function GameSettings(props: {
	setMap: any;
	setMode: any;
	map: string;
	mode: string;
	isOpen: boolean;
	setIsOpen: any;
	showPlayerLoader: any;
	opponent_uid?: string;
	socket?: Socket;
	my_id: string;
	game_id: string;
	status: string;
	user: UseQueryResult<UserInfo, Error>;
}) {
	const router = useRouter();

	return (
		<>
			<MyDialog
				isOpen={props.isOpen}
				closemodal={() => {
					router.push(myRoutes.dashboard);
				}}
				withCorner={true}
				withClose={true}
				customClass="absolute h-[40%] md:h-[60%] min-h-[600px] max-h-[800px] lg:h-[70%] w-[80%] max-w-[1100px]"
				conClass="bg-palette-grey border-4 rounded-md border-palette-white "
			>
				<MdCancelPresentation
					size={25}
					onClick={() => {
						router.push(myRoutes.dashboard);
					}}
					className="absolute z-10 text-gray-400  cursor-pointer  top-0 right-0  rounded-sm"
				/>
				<div className="flex items-center  flex-col h-full">
					<div className="w-full h-[10%]">
						<h1 className="text-cardtitle pb-8 sm:pb-0 font-['Chakra_Petch']  font-extrabold text-lg sm:text-2xl h:text-xl md:text-4xl">
							Game Options
						</h1>
					</div>
					<div className="flex flex-col h-[94%] w-full justify-around">
						<div className="w-full space-y-4">
							<h2 className="text-[#686868] font-roboto md:text-xl text-sm ">
								Choose a map
							</h2>
							<div className="flex  flex-col w-full items-center h:justify-around h:flex-row  md:gap-3 gap-2">
								<Map handelClick={props.setMap} />
							</div>
						</div>
						<div className="w-full mt-2 space-y-3 h-auto">
							<div className="">
								<h2 className="text-[#686868] font-roboto md:text-xl text-sm">
									Choose a mode
								</h2>
							</div>
							<div className="flex w-full justify-evenly">
								<Mode handelClick={props.setMode} text="" />
							</div>
						</div>
						<div className="min-h-[30px] sm:min-h-[40px] md:min-h-[50px] flex justify-center  items-center w-full">
							<CustomButton
								text="Play"
								color="orange"
								otherclass="max-w-[300px] mt-10 w-[60%] min-h-[40px]"
								handleclick={() => {
									props.user.refetch().then((responce) => {
										if (responce.data.status === "INGAME") {
											notify(
												"",
												"",
												false,
												2000,
												"You are already in game 🤬"
											);
											router.push(myRoutes.dashboard);
										} else {
											inviteGame(
												{
													id_game: props.game_id,
													id_sender: props.my_id,
													id_receiver:
														props.opponent_uid,
													socket_player:
														props.socket.id,
													map: props.map.toUpperCase(),
													mode: props.mode.toUpperCase(),
												},
												props.socket
											);
											props.setIsOpen(false);
											props.showPlayerLoader(true);
										}
									});
								}}
							/>
						</div>
					</div>
				</div>
			</MyDialog>
		</>
	);
}
