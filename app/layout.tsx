import type { Metadata } from "next";
import { SideBar, NavBar, MobileSideBar } from "@/components";
import "./globals.css";
import "./input.css";


export const metadata: Metadata = {
    title: "You Pong",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="flex h-screen min-w-[280px] min-body max-h-screen  background">
                <SideBar />
                <main className="flex relative flex-col h-full overflow-auto items-center justify-between w-full">
                    <NavBar />
                    {children}
                    <MobileSideBar />
                </main>
            </body>
        </html>
    );
}
