import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useGlobalSocket } from "./UserContextProvider";

function InviteProvider() {
	const globalSocket = useGlobalSocket().globalSocket;

	useEffect(() => {
		globalSocket.on("invitation", (obj) => {
			console.log("inv obj = ", obj);
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
