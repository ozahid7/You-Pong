"use client";
import { SideBar, NavBar, MobileSideBar } from "@/components";
import "../globals.css";
import "../input.css";
import UserContextProvider, {
	useGlobalSocket,
} from "@/providers/UserContextProvider";
import { Button, usePagination } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyToast from "@/components/tools/MyToast";
import InviteProvider from "@/providers/InviteProvider";

interface lyoutProps {
	children: React.ReactNode;
}

function RootLayout({ children }: lyoutProps) {
	const notify = () => {
		toast.warning(<MyToast userName="oussama zahid" />, {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			style: {
				height: "120px",
				width: "280px",
			},
			progressStyle: {
				backgroundColor: "#EB6440",
			},
			icon: false,
			closeButton: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	};
	return (
		<UserContextProvider>
			<main className="flex h-screen w-full background">
				<SideBar />
				<main className="flex flex-col min-h-[800px] h-auto overflow-y-auto my_scroll_orange items-center justify- w-full">
					<NavBar />
					{children}
					<MobileSideBar />
					<Button
						onClick={notify}
						className="w-20 absolute top-0 h-20 "
					></Button>
					<InviteProvider />
				</main>
			</main>
		</UserContextProvider>
	);
}

export default RootLayout;
