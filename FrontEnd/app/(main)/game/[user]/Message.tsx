import { MyDialog } from "@/components";
import { myRoutes } from "@/const";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Message = (props: {
	isOpen: boolean;
	bgColor: string;
	setIsOpen: any;
}) => {
	let message: string;
	const router = useRouter();

	if (props.bgColor.includes("green")) message = "You Win 🤩";
	if (props.bgColor.includes("orange")) message = "You Lose 😔";
	if (props.bgColor.includes("grey")) message = "Game Over !!";

	useEffect(() => {
		setTimeout(() => {
			props.setIsOpen(false);
			router.replace(myRoutes.dashboard);
		}, 4000);
	}, []);

	return (
		<MyDialog
			isOpen={props.isOpen}
			closemodal={() => {}}
			withCorner={true}
			withClose={true}
			customClass="absolute w-[240px] h-[140px] md:w-[460px] md:h-[260px]"
			conClass={` ${props.bgColor} rounded-md`}
		>
			<div className="flex items-center justify-center flex-col h-full">
				<button></button>
				<span
					className={`text-2xl md:text-5xl font-orbitron font-extrabold ${
						message === "Game Over !!"
							? "text-palette-green"
							: "text-white"
					} drop-shadow-lg`}
				>
					{message}
				</span>
			</div>
		</MyDialog>
	);
};

export default Message;
