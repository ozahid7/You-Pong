"use client";
import { SideBar, NavBar, MobileSideBar } from "@/components";
import "../globals.css";
import "../input.css";
import { redirect, useRouter } from "next/navigation";
import { apiHost, myRoutes } from "@/const";
import axios from "axios";
import UseQueryProvider from "@/providers/UseQueryProvider";
import { useQuery } from "react-query";
import { useUser } from "@nextui-org/react";
import { useAxios } from "@/utils";
import { endPoints, userData, userInfo } from "@/types/Api";
import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import Loader from "@/components/tools/Loader";

interface myContextProps {
    userData: userInfo;
    isLoged: boolean;
}


export const MyContext = createContext<myContextProps | undefined>(undefined);



function RootLayout({ children }: { children: React.ReactNode }) {
    const [checked, setchecked] = useState(false);
    const [isLoged, setIsLoged] = useState(false)
    const [userData, setUserData] = useState(undefined)

    const getUser = async () => {
        try {
            const response = await useAxios<userData>("get", endPoints.getuser);
            setUserData(response.userInfo)
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

    const UserQuery = useQuery({
        queryKey: ["user"],
        queryFn:  getUser,
    });

    useLayoutEffect(() => {
        if(!isLoged && checked){
            redirect(myRoutes.root)
        }
    }, [isLoged, checked])

    if(UserQuery.isLoading && isLoged) return <Loader/> 

    else if(UserQuery.isSuccess  && isLoged)
    return (
        <MyContext.Provider value={{userData, isLoged}}>
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
