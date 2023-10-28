import type { Metadata } from "next";
import { SideBar, NavBar } from "@/components";
import "./globals.css";

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
            <body className="flex overflow-auto background">
                    <SideBar />
                <main className="flex flex-col items-center w-full">
                     <NavBar />
                    {children}
                </main>
            </body>
        </html>
    );
}
