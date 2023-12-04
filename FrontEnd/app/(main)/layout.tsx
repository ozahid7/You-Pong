"use client";
import { SideBar, NavBar, MobileSideBar } from "@/components";
import "../globals.css";
import "../input.css";
import { useRouter } from "next/navigation";
import { apiHost } from "@/const";
import axios from "axios";
import UseQueryProvider from "@/providers/UseQueryProvider";
import { useQuery } from "react-query";
import { useUser } from "@nextui-org/react";
import { useAxios } from "@/utils";
import { endPoints, userData } from "@/types/Api";
import { createContext, useContext, useEffect, useState } from "react";

interface myContextProps {
    userData: any;
    isLoged: boolean;
}


export const MyContext = createContext<myContextProps | undefined>(undefined);



function RootLayout({ children }: { children: React.ReactNode }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoged, setIsLoged] = useState(false)
    const [userData, setUserData] = useState(undefined)
    const router = useRouter();
    const getUser = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const response = await useAxios<userData>("get", endPoints.getuser);
            setUserData(response.userInfo)
            setIsLoged(true)
        } catch (error) {
            console.log("error = :", error);
        }
        return null;
    };

    const UserQuery = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });

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
