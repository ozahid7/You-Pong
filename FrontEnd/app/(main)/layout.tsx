"use client";
import { SideBar, NavBar, MobileSideBar } from "@/components";
import "../globals.css";
import "../input.css";
import UserContextProvider from "@/providers/UserContextProvider";
import { Button } from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";
import InviteProvider from "@/providers/InviteProvider";
import { notify } from "@/utils/game";

interface lyoutProps {
	children: React.ReactNode;
}

function RootLayout({ children }: lyoutProps) {
	return (
		<UserContextProvider>
			<main className="flex h-screen w-full background">
				<InviteProvider>
					<SideBar />
					<main className="flex flex-col min-h-[800px] h-auto overflow-y-auto my_scroll_orange items-center justify- w-full">
						<NavBar />
						{children}
						<MobileSideBar />
					</main>
				</InviteProvider>
			</main>
		</UserContextProvider>
	);
}

export default RootLayout;
