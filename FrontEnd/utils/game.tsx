import MyToast from "@/components/tools/MyToast";
import { infoGame } from "@/types/game";
import { toast } from "react-toastify";
import { Socket } from "socket.io-client";

export const notify = (username: string, avatar: string, info: infoGame) => {
	toast.success(<MyToast userName={username} avatar={avatar} info={info} />, {
		position: "top-center",
		autoClose: 5000,
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
	});
};

export const inviteGame = (info: infoGame, socket: Socket) => {
	socket.emit("invite", info);
};

export const acceptGame = (info: infoGame, socket: Socket) => {
	console.log("from accept ", info.id_game);
	socket.emit("accept", info);
};

export const refuseGame = (info: infoGame, socket: Socket) => {
	socket.emit("refuse", info);
};
