import type { Metadata } from "next";
import { SideBar, NavBar, MobileSideBar } from "@/components";
import "../globals.css";
import "../input.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex h-screen w-full background">
            <SideBar />
            <main className="flex flex-col min-h-[800px] h-full overflow-y-auto my_scroll_orange items-center justify-between w-full">
                <NavBar />
                {children}
                <MobileSideBar />
            </main>
        </main>
    );
}
