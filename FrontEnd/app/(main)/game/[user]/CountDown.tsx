"use client";
import { MyDialog } from "@/components";
import { useGlobalSocket } from "@/providers/UserContextProvider";
import React, { useEffect, useState } from "react";

const MyCountDown = (props: { isOpen: boolean; setIsOpen: any }) => {
	let [counter, setCounter] = useState(3);
	const { globalSocket } = useGlobalSocket();
	useEffect(() => {
		if (props.isOpen) {
			const time = setInterval(() => {
				if (counter >= 0) {
					setCounter(counter--);
				}
			}, 1000);

			setTimeout(() => {
				props.setIsOpen(false);
			}, 5000);
			return () => clearInterval(time);
		}
	}, [props.isOpen]);

	return (
		<MyDialog
			isOpen={props.isOpen}
			closemodal={() => {}}
			withCorner={true}
			withClose={true}
			customClass="absolute h-[50%] md:h-[60%] min-h-[600px] lg-h-[64%] w-[80%] max-w-[1100px]"
			conClass=" rounded-md derd bg- border-palette-white "
		>
			<div className="flex items-center justify-center flex-col h-full">
				<button></button>
				<span className=" font-body font-extrabold drop-shadow-lg text-palette-white text-[100px]   sm:text-[200px]">
					<span>{counter}</span>
				</span>
			</div>
			<img
				src="/mouse.gif"
				className="w-[40%] md:w-[30%]  max-w-[500px] absolute  bottom-0 left-[50%] translate-x-[-50%] "
			/>
		</MyDialog>
	);
};

export default MyCountDown;
