import MyToast from "@/components/tools/MyToast";
import { myRoutes } from "@/const";
import { infoGame } from "@/types/game";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Socket } from "socket.io-client";

export const notify = (
	username: string,
	avatar: string,
	isInvite: boolean,
	duration: number,
	message?: string,
	info?: infoGame
) => {
	toast.success(
		<MyToast
			userName={username}
			avatar={avatar}
			info={info}
			isInvite={isInvite}
			message={message}
		/>,
		{
			position: "top-center",
			autoClose: duration,
			hideProgressBar: false,
			closeOnClick: true,
			style: {
				height: "120px",
				width: "280px",
			},
			progressStyle: {
				backgroundColor: "#EB6440",
			},
			icon: false,
			closeButton: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		}
	);
};

export const inviteGame = (info: infoGame, socket: Socket) => {
	console.log("socket from invite = ", socket.id);
	socket.emit("invite", info);
};

export const acceptGame = (
	info: infoGame,
	socket: Socket,
	router: AppRouterInstance
) => {
	console.log("from accept ", info.id_game);
	socket.emit("accept", info);
	router.push(myRoutes.game + "/" + info.mode + info.map);
};

export const refuseGame = (info: infoGame, socket: Socket) => {
	socket.emit("refuse", info);
};

export const cancelGame = (info: infoGame, socket: Socket) => {
	console.log("from cancel");
	socket.emit("cancel", info);
};
