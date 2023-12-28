import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useGlobalSocket } from "./UserContextProvider";
import { inviteReturn } from "@/types/game";
import { notify } from "@/utils/game";

function InviteProvider() {
	const globalSocket = useGlobalSocket().globalSocket;

	useEffect(() => {
		console.log("from invite provider");
		globalSocket.on("invitation", (obj: inviteReturn) => {
			notify(obj.username, obj.avatar);
		});
		globalSocket.on("accepted", (obj) => {
			console.log("accpet obj = ", obj);
		});
		globalSocket.on("refused", (obj) => {
			console.log("ref obj = ", obj);
		});
		globalSocket.on("canceled", (obj) => {
			console.log("cancel obj = ", obj);
		});
	}, []);

	return <ToastContainer />;
}

export default InviteProvider;
