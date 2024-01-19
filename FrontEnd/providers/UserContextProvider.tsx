"use client";
import React, { useContext } from "react";
import { TwoFactor } from "@/components";
import { redirect, usePathname } from "next/navigation";
import { myRoutes, socketurl } from "@/const";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
	setTfaVerified: any;
	globalSocket: Socket;
	tfaVerified: boolean;
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
	const query = useQueryClient();
	const [isLoged, setIsLoged] = useState(false);
	const [updated, setUpdated] = useState(false);
	const [userData, setUserData] = useState(undefined);
	const [tfaStatus, setTfaStatus] = useState(false);
	const [globalSocket, setGlobalSocket] = useState<Socket>(null);
	const [toEmit, setToEmit] = useState(false);
	const path = usePathname();
	let i: number = 0;

	const me = useUser(tfaVerified, setchecked);

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
			if (me.data.createdAt !== me.data.updatedAt) setUpdated(true);
		}

		setToEmit(true);
	}, [me, me.failureCount]);

	useEffect(() => {
		if (globalSocket === null && me.data && updated) {
			setGlobalSocket(
				io(socketurl + "?id_user=" + me.data.uid, {
					transports: ["websocket"],
					autoConnect: true,
				})
			);
		}
	}, [updated]);

	useEffect(() => {
		if (globalSocket && path.slice(0, 5) !== "/game" && toEmit && updated) {
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
			console.log("tfa response =", response?.message);
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

	useLayoutEffect(() => {
		if (!loged && checked) {
			redirect(myRoutes.root);
		}
	}, [isLoged, checked]);

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
	else if (me.data && isLoged && loged && tfaVerified && !updated) {
		return (
			<ProfileSettings
				isOpen={true}
				setIsOpen={() => {}}
				closeModal={() => {}}
				user={me}
				globalSocket={globalSocket}
				setGlobalSocket={setGlobalSocket}
				showIcon={true}
				setUpdated={setUpdated}
			/>
		);
	} else if (
		me.data &&
		isLoged &&
		loged &&
		tfaVerified &&
		updated &&
		globalSocket
	)
		return (
			<GlobalContext.Provider
				value={{
					userData,
					isLoged,
					globalSocket,
					setTfaVerified,
					tfaVerified,
				}}
			>
				{children}
			</GlobalContext.Provider>
		);
};

export const useGlobalSocket = () => {
	return useContext(GlobalContext);
};

export default UserContextProvider;
