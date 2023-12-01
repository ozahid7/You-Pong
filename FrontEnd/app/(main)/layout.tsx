"use client";
import type { Metadata } from "next";
import { SideBar, NavBar, MobileSideBar } from "@/components";
import "../globals.css";
import "../input.css";
import withAuth from "@/components/auth/withAuth";
import { useQuery } from "react-query";
import Loader from "@/components/tools/Loader";
import { useRouter } from "next/navigation";
import { apiHost } from "@/const";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import UseQueryProvider from "@/providers/UseQueryProvider";

function RootLayout({ children }: { children: React.ReactNode }) {
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

export default RootLayout;
