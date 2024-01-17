"use client";
import React, { useContext } from "react";
import { TwoFactor } from "@/components";
import { redirect, usePathname } from "next/navigation";
import { myRoutes, socketurl } from "@/const";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/utils";
import { endPoints, tfaSwitch, UserInfo } from "@/types/Api";
import { createContext, useEffect, useLayoutEffect, useState } from "react";
import Loader from "@/components/tools/Loader";
import { useUser } from "@/api/getHero";
import ProfileSettings from "@/app/(main)/settings/ProfileSettings";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

export interface myContextProps {
	userData: UserInfo;
	isLoged: boolean;
	globalSocket: Socket;
}
export const GlobalContext = createContext<myContextProps | undefined>(
	undefined
);

let oneTime: boolean = false;

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
	let loged: boolean = false;
	if (typeof window !== "undefined") {
		loged = localStorage.getItem("isLoged") === "true" ? true : false;
	}
	const [checked, setchecked] = useState(false);

	const [tfaVerified, setTfaVerified] = useState(false);
	const [isLoged, setIsLoged] = useState(false);
	const [userData, setUserData] = useState(undefined);
	const [tfaStatus, setTfaStatus] = useState(false);
	const [globalSocket, setGlobalSocket] = useState<Socket>(null);
	const [toEmit, setToEmit] = useState(false);
	const path = usePathname();
	let i: number = 0;

	const me = useUser(tfaVerified);

	useEffect(() => {
		if (me.data) {
			setUserData(me.data);
			setTfaStatus(me.data.tfaStatus);
			if (typeof window !== "undefined") {
				localStorage.setItem("isLoged", "true");
				localStorage.getItem("isLoged") === "true"
					? setIsLoged(true)
					: setIsLoged(false);
			}
		}

		if (
			globalSocket === null &&
			me.data &&
			me.data.createdAt !== me.data.updatedAt
		) {
			setGlobalSocket(
				io(socketurl + "?id_user=" + me.data.uid, {
					transports: ["websocket"],
					transportOptions: {
						polling: {
							extraHeaders: {
								"Sec-WebSocket-Version": "13",
								"Sec-WebSocket-Key": "0Me1PSdr2zimQ28+k6ug8w==",
								"Sec-WebSocket-Extensions":
									"permessage-deflate; client_max_window_bits",
							},
						},
					},
					autoConnect: true,
				})
			);
		}
		if (tfaVerified && me.isFetched) setchecked(true);
		setToEmit(true);
	}, [me]);

	useEffect(() => {
		if (
			globalSocket &&
			path.slice(0, 5) !== "/game" &&
			toEmit &&
			me.data.createdAt !== me.data.updatedAt
		) {
			console.log("emit from provider");
			globalSocket.emit("online");
			me.refetch();
		}
	}, [globalSocket, path]);

	const getTfa = async () => {
		try {
			const response = await useAxios<{ message: string }>(
				"get",
				endPoints.getTfaStatus
			);
			console.log("tfa response = == ", response?.message);
			if (response.message === "False") setTfaVerified(true);
			response.message === "False"
				? setTfaStatus(false)
				: setTfaStatus(true);
		} catch (error) {
			setTfaVerified(true);
			console.log("error : ", error);
		}
		return null;
	};

	useEffect(() => {
		if (!loged) getTfa();
		else setTfaVerified(true);
	}, []);

	// useLayoutEffect(() => {
	// 	if (!loged && checked) {
	// 		redirect(myRoutes.root);
	// 	}
	// }, [isLoged, checked]);

	if (tfaStatus && !tfaVerified && !loged)
		return (
			<TwoFactor
				isEnabled={true}
				isOpen={true}
				closemodal={() => {}}
				setValid={setTfaVerified}
				setIsLoged={setIsLoged}
			/>
		);
	else if (me.isLoading) return <Loader />;
	else if (
		me.data &&
		isLoged &&
		loged &&
		tfaVerified &&
		me.data.createdAt === me.data.updatedAt
	) {
		return (
			<ProfileSettings
				isOpen={me.data.createdAt === me.data.updatedAt}
				setIsOpen={() => {}}
				closeModal={() => {}}
				user={me}
				globalSocket={globalSocket}
				setGlobalSocket={setGlobalSocket}
				showIcon={true}
			/>
		);
	} else if (
		me.data &&
		isLoged &&
		loged &&
		tfaVerified &&
		me.data.createdAt !== me.data.updatedAt &&
		globalSocket
	)
		return (
			<GlobalContext.Provider value={{ userData, isLoged, globalSocket }}>
				{children}
			</GlobalContext.Provider>
		);
};

export const useGlobalSocket = () => {
	return useContext(GlobalContext);
};

export default UserContextProvider;
