import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalSocket } from "./UserContextProvider";
import { inviteReturn } from "@/types/game";
import { notify } from "@/utils/game";
import { useRouter } from "next/navigation";
import { myRoutes } from "@/const";

interface gameContextProps {
	data: inviteReturn;
	setData: any;
}

export const gameContext = createContext<gameContextProps | undefined>(
	undefined
);

function InviteProvider({ children }: { children: React.ReactNode }) {
	const globalSocket = useGlobalSocket().globalSocket;
	const [data, setData] = useState<inviteReturn>();
	const router = useRouter();
	const style =
		"text-[16px] text-center drop-shadow-sm font-orbitron text-palette-orange";

	useEffect(() => {
		console.log("from invite provider");
		if (globalSocket.listeners("invitation").length === 0)
			globalSocket.on("invitation", (obj: inviteReturn) => {
				console.log("from invitation", obj);
				setData(obj);
				notify(obj.username, obj.avatar, true, 5000, "", obj.info);
			});

		if (globalSocket.listeners("accepted").length === 0)
			globalSocket.on("accepted", (obj: inviteReturn) => {
				setData(obj);
				console.log("from accepted ", obj);
			});

		if (globalSocket.listeners("refused").length === 0)
			globalSocket.on("refused", (obj: inviteReturn) => {
				console.log("refused obj = ", obj);

				notify(
					obj.username,
					obj.avatar,
					false,
					3000,
					obj.username.slice(0, 7) + " canceled the game ",
					obj.info
				);
				router.push(myRoutes.dashboard);
			});

		if (globalSocket.listeners("canceled").length === 0)
			globalSocket.on("canceled", (obj: inviteReturn) => {
				console.log("from cancled = ", obj);
				toast.update("toast_id", {
					render: () => (
						<div className={style}>
							{obj.username.slice(0, 7)} has canceled the game
						</div>
					),
					type: toast.TYPE.INFO,
					autoClose: 5000,
					toastId: "cancel_toast",
				});
			});
	}, []);

	return (
		<gameContext.Provider value={{ data, setData }}>
			{children}
			<ToastContainer />
		</gameContext.Provider>
	);
}

export const useGameContext = () => {
	return useContext(gameContext);
};

export default InviteProvider;
