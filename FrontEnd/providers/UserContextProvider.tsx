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

interface myContextProps {
    userData: UserInfo;
    isLoged: boolean;
    FriendData: FriendArr;
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
    const [FriendData, setFriendData] = useState(undefined);

    const getHero = async () => {
        try {
            const response = await useAxios<UserData>("get", endPoints.gethero);
            console.log("hero response = ", response.userInfo);
            setUserData(response.userInfo);
            setTfaStatus(response.userInfo.tfaStatus);
            if (typeof window !== "undefined") {
                localStorage.setItem("isLoged", "true");
                localStorage.getItem("isLoged") === "true"
                    ? setIsLoged(true)
                    : setIsLoged(false);
            }
        } catch (error) {
            setchecked(true);
            localStorage.removeItem("isLoged");
            console.log("get hero error = :", error);
            redirect(myRoutes.root);
        }
        return null;
    };

    const getTfa = async () => {
        try {
            const response = await useAxios<tfaSwitch>(
                "get",
                endPoints.getTfaStatus
            );
            if (response === false) setTfaVerified(true);
            console.log(response);
            setTfaStatus(response);
        } catch (error) {
            setTfaVerified(true);
            console.log("error : ", error);
        }
        return null;
    };

    const getFriends = async () => {
        try {
            const response = await useAxios<FriendsReturn>(
                "get",
                endPoints.getFriend
            );
            console.log("response = ", response);
            setFriendData(response.Object);
        } catch (error) {
            console.log("error get Friends : ", error);
        }
        return null;
    };

    useEffect(() => {
        if (!loged) getTfa();
        else setTfaVerified(true);
    }, []);

    const heroQuery = useQuery({
        queryKey: ["user"],
        queryFn: getHero,
        enabled: tfaVerified,
    });

    useLayoutEffect(() => {
        if (!loged && checked) {
            redirect(myRoutes.root);
        }
    }, [isLoged, checked]);

    const FriendsQuery = useQuery({
        queryKey: ["friends"],
        queryFn: getFriends,
        enabled: isLoged,
    });
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
    else if (heroQuery.isLoading || FriendsQuery.isLoading) return <Loader />;
    else if (heroQuery.isSuccess && isLoged && loged && tfaVerified)
        return (
            <MyContext.Provider value={{ userData, isLoged, FriendData }}>
                {children}
            </MyContext.Provider>
        );
};

export const useUser = () => {
    const user = useContext(MyContext);
    return user;
};

export default UserContextProvider;
