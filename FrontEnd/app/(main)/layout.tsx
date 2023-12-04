"use client";
import { SideBar, NavBar, MobileSideBar } from "@/components";
import "../globals.css";
import "../input.css";
import { useRouter } from "next/navigation";
import { apiHost } from "@/const";
import axios from "axios";
import UseQueryProvider from "@/providers/UseQueryProvider";
import { useQuery } from "react-query";

function RootLayout({ children }: { children: React.ReactNode }) {

     const router = useRouter();
    const getUser = async () => {
        const apiUrl = `${apiHost}user/GetHero`;
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            await axios
                .get(apiUrl, { withCredentials: true })
                .then((response: any) => {
                    console.log('from layout',  response.data);
                    setTimeout(() => {
                        localStorage.setItem("isLogedIn", "true");
                    }, 1000);
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
        return null;
    };

    const UserQuery = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });
    return (
        <main className="flex h-screen w-full background">
            <SideBar />
            <main className="flex flex-col min-h-[800px] h-auto overflow-y-auto my_scroll_orange items-center justify- w-full">
                <NavBar />
                {children}
                <MobileSideBar />
            </main>
        </main>
    );
}

export default UseQueryProvider(RootLayout);
