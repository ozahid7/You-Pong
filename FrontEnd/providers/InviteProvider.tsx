import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useGlobalSocket } from "./UserContextProvider";
import { inviteReturn } from "@/types/game";
import { notify } from "@/utils/game";
import { useRouter } from "next/navigation";
import { myRoutes } from "@/const";

function InviteProvider() {
	const globalSocket = useGlobalSocket().globalSocket;
	const router = useRouter();
	useEffect(() => {
		console.log("from invite provider");
		globalSocket.on("invitation", (obj: inviteReturn) => {
			notify(obj.username, obj.avatar, obj.info);
		});
		globalSocket.on("accepted", (obj: inviteReturn) => {
			console.log("from accepted ", obj);
		});
		globalSocket.on("refused", (obj) => {
			console.log("refused obj = ", obj);
		});
		globalSocket.on("canceled", (obj: inviteReturn) => {
			console.log("from cancled = ", obj);
			router.push(myRoutes.game + "/" + obj.info.mode + obj.info.map);
		});
	}, []);

	return <ToastContainer />;
}

export default InviteProvider;
