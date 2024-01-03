"use client";
import { SideBar, NavBar, MobileSideBar } from "@/components";
import "../globals.css";
import "../input.css";
import UserContextProvider from "@/providers/UserContextProvider";
import { Button } from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";
import InviteProvider from "@/providers/SocketProvider";
import { notify } from "@/utils/game";
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
					<InviteProvider>
						<SideBar />
						<main className="flex flex-col min-h-[800px] h-auto  items-center justify- w-full">
							<NavBar />
							{children}
							<MobileSideBar />
						</main>
					</InviteProvider>
				</main>
			</QueryClientProvider>
		</UserContextProvider>
	);
}

export default RootLayout;
