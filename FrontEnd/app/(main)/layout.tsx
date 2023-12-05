"use client";
import { SideBar, NavBar, MobileSideBar, TwoFactor } from "@/components";
import "../globals.css";
import "../input.css";
import { redirect } from "next/navigation";
import { myRoutes } from "@/const";
import UseQueryProvider from "@/providers/UseQueryProvider";
import { useQuery } from "react-query";
import { useAxios } from "@/utils";
import { endPoints, tfaSwitch, userData, userInfo } from "@/types/Api";
import { createContext, useEffect, useLayoutEffect, useState } from "react";
import Loader from "@/components/tools/Loader";

interface myContextProps {
    userData: userInfo;
    isLoged: boolean;
}


export const MyContext = createContext<myContextProps | undefined>(undefined);



function RootLayout({ children }: { children: React.ReactNode }) {
    const [checked, setchecked] = useState(false);
    const [tfaVerified, setTfaVerified] = useState(false);
    const [isLoged, setIsLoged] = useState(false)
    const [userData, setUserData] = useState(undefined)
    const [tfaStatus, setTfaStatus] = useState(false)

    const getUser = async () => {
        try {
            const response = await useAxios<userData>("get", endPoints.getuser);
            setUserData(response.userInfo)
            setTfaStatus(response.userInfo.tfaStatus);
            setIsLoged(true)
            if (typeof window !== "undefined") {
                localStorage.setItem("isLoged", 'true')
            }
        } catch (error) {
            setchecked(true)
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
        getTfa()
    }, [])

    const UserQuery = useQuery({
        queryKey: ["user"],
        queryFn:  getUser,
        enabled: tfaVerified
    });

    useLayoutEffect(() => {
        if(!isLoged && checked){
            redirect(myRoutes.root)
        }
    }, [isLoged, checked])

    if(tfaStatus && !tfaVerified && !isLoged ) return (
        <TwoFactor
            isEnabled={true}
            isOpen={true}
            closemodal={() => {}}
            setValid={setTfaVerified}
            setIsLoged={setIsLoged}
        />
    );

    else if (UserQuery.isLoading) return (<Loader/>)

    else if (UserQuery.isSuccess && isLoged && tfaVerified)
    return (
        <MyContext.Provider value={{ userData, isLoged }}>
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
