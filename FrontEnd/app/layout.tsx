import type { Metadata } from "next";
import "./globals.css";
import "./input.css";
import UseQueryProvider from "@/providers/UseQueryProvider";

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
			<body className="flex h-screen min-w-[280px]   background">
				<UseQueryProvider>
					<main className="flex flex-col overflow-y-auto my_scroll_orange h-full items-center justify-between w-full">
						{children}
					</main>
				</UseQueryProvider>
			</body>
		</html>
	);
}
