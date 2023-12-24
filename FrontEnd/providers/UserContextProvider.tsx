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
import { useUser } from "@/api/getHero";
import ProfileSettings from "@/app/(main)/settings/ProfileSettings";
import { io } from "socket.io-client";

export interface myContextProps {
  userData: UserInfo;
  isLoged: boolean;
  socket: any;
}
export const MyContext = createContext<myContextProps | undefined>(undefined);

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
  const [socket, setSocket] = useState(null);

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
    if (!me.data && !me.isPending) {
      setchecked(true);
      localStorage.removeItem("isLoged");
      redirect(myRoutes.root);
    }
  }, [me]);

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
    oneTime = true;
    return (
      <ProfileSettings
        isOpen={me.data.createdAt === me.data.updatedAt}
        setIsOpen={() => {}}
        closeModal={() => {}}
      />
    );
  } else if (
    me.data &&
    isLoged &&
    loged &&
    tfaVerified &&
    me.data.createdAt !== me.data.updatedAt
  ) {
    if (oneTime == true) {
      setSocket(
        io(`http://localhost:4000/chat?id_user=${me.data.uid}`, {
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
        })
      );
      oneTime = false;
    }

    return (
      <MyContext.Provider value={{ userData, isLoged, socket }}>
        {children}
      </MyContext.Provider>
    );
  }
};

export default UserContextProvider;
