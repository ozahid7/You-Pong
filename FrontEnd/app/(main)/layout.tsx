"use client";
import { SideBar, NavBar, MobileSideBar } from "@/components";
import "../globals.css";
import "../input.css";
import UserContextProvider, {
	useGlobalSocket,
} from "@/providers/UserContextProvider";
import { usePagination } from "@nextui-org/react";
import { usePathname } from "next/navigation";

interface lyoutProps {
	children: React.ReactNode;
}

function RootLayout({ children }: lyoutProps) {
	return (
		<UserContextProvider>
			<main className="flex h-screen w-full background">
				<SideBar />
				<main className="flex flex-col min-h-[800px] h-auto overflow-y-auto my_scroll_orange items-center justify- w-full">
					<NavBar />
					{children}
					<MobileSideBar />
				</main>
			</main>
		</UserContextProvider>
	);
}

export default RootLayout;
