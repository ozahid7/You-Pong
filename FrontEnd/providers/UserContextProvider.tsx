"use client";
import React, { useContext } from "react";
import { SideBar, NavBar, MobileSideBar, TwoFactor } from "@/components";
import { redirect } from "next/navigation";
import { myRoutes } from "@/const";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/utils";
import {
  FriendArr,
  endPoints,
  tfaSwitch,
  UserData,
  UserInfo,
  FriendsReturn,
} from "@/types/Api";
import { createContext, useEffect, useLayoutEffect, useState } from "react";
import Loader from "@/components/tools/Loader";
import UseQueryProvider from "./UseQueryProvider";
import { getMe } from "@/api/getHero";
import ProfileSettings from "@/app/(main)/settings/ProfileSettings";

interface myContextProps {
  userData: UserInfo;
  isLoged: boolean;
}
export const MyContext = createContext<myContextProps | undefined>(undefined);

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

  const me = getMe(tfaVerified);

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
		} else if (me.isError) {
			setchecked(true);
			localStorage.removeItem("isLoged");
			redirect(myRoutes.root);
		}
  }, [me.isSuccess, me.isError]);

  const getTfa = async () => {
    try {
      const response = await useAxios<tfaSwitch>("get", endPoints.getTfaStatus);
      if (response === false) setTfaVerified(true);
      console.log(response);
      setTfaStatus(response);
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
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {}, [isOpen]);

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
  else if (me.data && isLoged && loged && tfaVerified && isOpen)
		return (
			<ProfileSettings
				isOpen={isOpen}
				setIsOpen={() => {}}
				closeModal={setIsOpen}
			/>
		);
  else if (me.data && isLoged && loged && tfaVerified)
		return (
			<MyContext.Provider value={{ userData, isLoged }}>
				{children}
			</MyContext.Provider>
		);
};

export const useUser = () => {
  const user = useContext(MyContext);
  return user;
};

export default UserContextProvider;
