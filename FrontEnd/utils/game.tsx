import MyToast from "@/components/tools/MyToast";
import { infoGame } from "@/types/game";
import { toast } from "react-toastify";
import { Socket } from "socket.io-client";

export const notify = (username: string, avatar: string) => {
	toast(<MyToast userName={username} avatar={avatar} />, {
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
	console.log("emit from invite game ", socket.id);
	socket.emit("invite", info);
	// socket.emit("canceled");
	// socket.emit("refuse");
	// socket.emit("accepted");
};
