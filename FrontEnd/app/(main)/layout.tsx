"use client";
import { SideBar, NavBar, MobileSideBar, TwoFactor } from "@/components";
import "../globals.css";
import "../input.css";
import { redirect } from "next/navigation";
import { myRoutes } from "@/const";
import UseQueryProvider from "@/providers/UseQueryProvider";
import { useQuery } from "react-query";
import { useAxios } from "@/utils";
import { FriendArr, endPoints, tfaSwitch, userData, userInfo } from "@/types/Api";
import { createContext, useEffect, useLayoutEffect, useState } from "react";
import Loader from "@/components/tools/Loader";

interface myContextProps {
    userData: userInfo;
    isLoged: boolean;
    FriendData: FriendArr
}


export  const MyContext = createContext<myContextProps | undefined>(undefined);



function RootLayout({ children }: { children: React.ReactNode }) {
    let    loged: boolean = false;
    if (typeof window !== "undefined") {
       loged = localStorage.getItem("isLoged") === 'true' ? true : false;
    }

    const [checked, setchecked] = useState(false);
    const [tfaVerified, setTfaVerified] = useState(false);
    const [isLoged, setIsLoged] = useState(false)
    const [userData, setUserData] = useState(undefined)
    const [tfaStatus, setTfaStatus] = useState(false)
    const [FriendData, setFriendData] = useState(undefined)

    const getUser = async () => {
        try {
            const response = await useAxios<userData>("get", endPoints.getuser);
            setUserData(response.userInfo)
            setTfaStatus(response.userInfo.tfaStatus);
            if (typeof window !== "undefined") {
                localStorage.setItem("isLoged", 'true')
                localStorage.getItem("isLoged") === "true" ? setIsLoged(true) : setIsLoged(false);
            }
        } catch (error) {
            setchecked(true)
            localStorage.removeItem("isLoged");
            redirect(myRoutes.root)
            console.log("error = :", error);
        }
        return null;
    };

    const getTfa = async () => {
        try{
            const response = await useAxios<tfaSwitch>(
                "get",
                endPoints.getTfaStatus,
            );
            if(response === false)
                setTfaVerified(true)
            console.log(response)
            setTfaStatus(response)
        }catch(error){
            setTfaVerified(true)
            console.log('error : ', error)
        }
    }

    useEffect(() => {
        if(!loged)
            getTfa()
        else
            setTfaVerified(true)
    }, [])

    const UserQuery = useQuery({
        queryKey: ["user"],
        queryFn:  getUser,
        enabled: tfaVerified
    });

    useLayoutEffect(() => {
        if(!loged && checked){
            redirect(myRoutes.root)
        }
    }, [isLoged, checked])

    const getFriends = async () => {
        try{
            const response = await useAxios<FriendArr>('get', endPoints.getFriend)
            console.log('response = ', response)
            setFriendData(response)
        }catch(error){
            console.log('error get Friends : ', error)
        }
    };

    const FriendsQuery = useQuery({
        queryKey: ["friends"],
        queryFn: getFriends,
        enabled: isLoged
    });

    if(tfaStatus && !tfaVerified && !loged ) return (
        <TwoFactor
            isEnabled={true}
            isOpen={true}
            closemodal={() => {}}
            setValid={setTfaVerified}
            setIsLoged={setIsLoged}
        />
    );

    else if (UserQuery.isLoading || FriendsQuery.isLoading) return (<Loader/>)

    else if (UserQuery.isSuccess && isLoged && loged && tfaVerified)
    return (
        <MyContext.Provider value={{ userData, isLoged, FriendData }}>
            <main className="flex h-screen w-full background">
                <SideBar />
                <main className="flex flex-col min-h-[800px] h-auto overflow-y-auto my_scroll_orange items-center justify- w-full">
                    <NavBar />
                    {children}
                    <MobileSideBar />
                </main>
            </main>
        </MyContext.Provider>
    );
}

export default UseQueryProvider(RootLayout);
