import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalSocket } from "./UserContextProvider";
import { inviteReturn } from "@/types/game";
import { notify } from "@/utils/game";
import { usePathname, useRouter } from "next/navigation";
import { myRoutes } from "@/const";
import { useQueryClient } from "@tanstack/react-query";
import useFriends from "@/api/useFriends";
import { useUser } from "@/api/getHero";

interface globalContextProps {
	data: inviteReturn;
	setData: any;
	viewedChat: boolean;
	setViewedChat: any;
	requests: number;
	setRequests: any;
	id: string;
	isMessage: number;
}

export const globalContext = createContext<globalContextProps | undefined>(
	undefined
);

function InviteProvider({ children }: { children: React.ReactNode }) {
	const { globalSocket, tfaVerified } = useGlobalSocket();
	const [data, setData] = useState<inviteReturn>();
	const query = useQueryClient();
	const [viewedChat, setViewedChat] = useState(true);
	const [id, setID] = useState<string>("");
	const [isMessage, SetIsMessage] = useState<number>(0);
	let [requests, setRequests] = useState(0);
	const friends = useFriends();
	const user = useUser(true, undefined);

	const router = useRouter();
	const style =
		"text-[16px] text-center drop-shadow-sm font-orbitron text-palette-orange";
	const pathname = usePathname();

	pathname.startsWith("/chat/")
		? globalSocket.emit("inChat")
		: globalSocket.emit("outChat");

	useEffect(() => {
		//notification
		if (globalSocket.listeners("addNotif").length === 0)
			globalSocket.on("addNotif", (obj) => {
				const message = obj.is_message
					? "Sent you a message 💬"
					: "Sent you a friend request 👥";

				if (!obj.is_message) {
					notify(obj.username, obj.avatar, false, 5000, message);
					setRequests(++requests);
					// friends.refetch();
				} else if (obj.is_message) {
					SetIsMessage((prevCount) => prevCount + 1);
					setID(obj.info.id_channel);
					if (!obj.in_chat) {
						notify(obj.username, obj.avatar, false, 2000, message);
						setViewedChat(false);
						query.invalidateQueries({ queryKey: ["messages"] });
					}
				}
			});

		if (globalSocket.listeners("removeNotif").length === 0)
			globalSocket.on("removeNotif", (obj) => {
				if (requests > 0) setRequests(--requests);
				friends.refetch();
			});
		if (globalSocket.listeners("status").length === 0)
			globalSocket.on("status", (obj) => {
				if (obj.status !== "OFFLINE") user.refetch();
			});

		if (globalSocket.listeners("invitation").length === 0)
			globalSocket.on("invitation", (obj: inviteReturn) => {
				setData(obj);
				notify(obj.username, obj.avatar, true, 10000, "", obj.info);
			});
		if (globalSocket.listeners("accepted").length === 0)
			globalSocket.on("accepted", (obj: inviteReturn) => {
				setData(obj);
			});

		if (globalSocket.listeners("refused").length === 0)
			globalSocket.on("refused", (obj: inviteReturn) => {
				setData(undefined);
				notify(
					obj.username,
					obj.avatar,
					false,
					3000,
					obj.username.slice(0, 7) + " canceled the game 😔",
					obj.info
				);
				router.push(myRoutes.dashboard);
			});

		if (globalSocket.listeners("canceled").length === 0)
			globalSocket.on("canceled", (obj: inviteReturn) => {
				setData(undefined);
				toast.update("toast_id", {
					render: () => (
						<div className={style}>
							{obj.username.slice(0, 7)} has canceled the game 😔
						</div>
					),
					type: toast.TYPE.INFO,
					autoClose: 5000,
					toastId: "cancel_toast",
				});
			});

		//Random game accepted
		if (globalSocket.listeners("acceptedGame").length === 0)
			globalSocket.on("acceptedGame", (obj: inviteReturn) => {
				setData(obj);
			});

		//Random game Cancled
		if (globalSocket.listeners("canceledGame").length === 0)
			globalSocket.on("canceledGame", (obj: inviteReturn) => {
				setData(undefined);
				toast.update("toast_id", {
					render: () => (
						<div className={style}>Something went Wrong 😔</div>
					),
					type: toast.TYPE.INFO,
					autoClose: 3000,
					toastId: "canceledGame_toast",
				});
				router.push(myRoutes.dashboard);
			});
	}, []);

	return (
		<globalContext.Provider
			value={{
				data,
				setData,
				viewedChat,
				setViewedChat,
				requests,
				setRequests,
				id,
				isMessage,
			}}
		>
			{children}
			<ToastContainer />
		</globalContext.Provider>
	);
}

export const useGlobalContext = () => {
	return useContext(globalContext);
};

export default InviteProvider;
