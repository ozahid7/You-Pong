import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { ToastContainer } from "react-toastify";
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

	useEffect(() => {
		console.log("from invite provider");
		if (globalSocket.listeners("invitation").length === 0)
			globalSocket.on("invitation", (obj: inviteReturn) => {
				console.log("from invitation", obj);
				notify(obj.username, obj.avatar, obj.info);
			});

		if (globalSocket.listeners("accepted").length === 0)
			globalSocket.on("accepted", (obj: inviteReturn) => {
				setData(obj);
				console.log("from accepted ", obj);
			});

		if (globalSocket.listeners("refused").length === 0)
			globalSocket.on("refused", (obj) => {
				console.log("refused obj = ", obj);
			});

		if (globalSocket.listeners("canceled").length === 0)
			globalSocket.on("canceled", (obj: inviteReturn) => {
				console.log("from cancled = ", obj);
				router.push(myRoutes.game + "/" + obj.info.mode + obj.info.map);
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
