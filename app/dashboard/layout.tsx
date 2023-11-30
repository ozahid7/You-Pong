"use client";
import React from "react";
import type { Metadata } from "next";
import { SideBar, NavBar, MobileSideBar } from "@/components";
import { QueryClient, QueryClientProvider } from "react-query";
import "../globals.css";
import "../input.css";

function RootLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex h-screen w-full background">
        <SideBar />
        <main className="flex relative flex-col h-full overflow-auto items-center justify-between w-full">
          <NavBar />
          {children}
          <MobileSideBar />
        </main>
      </main>
    </QueryClientProvider>
  );
}

export default RootLayout;
