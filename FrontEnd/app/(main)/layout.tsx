"use client";
import { SideBar, NavBar, MobileSideBar } from "@/components";
import "../globals.css";
import "../input.css";
import UseQueryProvider from "@/providers/UseQueryProvider";
import UserContextProvider from "@/providers/UserContextProvider";
import { QueryClient, QueryClientProvider } from "react-query";

interface lyoutProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

function RootLayout({ children }: lyoutProps) {
  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <main className="flex h-screen w-full background">
          <SideBar />
          <main className="flex flex-col min-h-[800px] h-auto overflow-y-auto my_scroll_orange items-center justify- w-full">
            <NavBar />
            {children}
            <MobileSideBar />
          </main>
        </main>
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default RootLayout;
