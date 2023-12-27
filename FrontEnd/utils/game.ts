import { infoGame } from "@/types/game";
import { Socket } from "socket.io-client";

export const inviteGame = (info: infoGame, socket: Socket) => {
	console.log("emit from invite game ", socket.id);
	socket.emit("invite");
	socket.emit("canceled");
	socket.emit("refuse");
	socket.emit("accepted");
};
