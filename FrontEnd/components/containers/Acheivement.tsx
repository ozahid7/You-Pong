"use client";
import React from "react";
import Image from "next/image";
import { LuUnlock, LuLock } from "react-icons/lu";
import { AcheivementProps } from "@/types";
import { twMerge } from "tailwind-merge";

const Acheivement = ({
	isOpened,
	text,
	classname,
	avatar,
	description,
}: AcheivementProps) => {
	const customClass = twMerge("overflow-hidden dred", classname);

	return (
		<>
			<div
				data-tooltip-id="my-tooltip"
				data-tooltip-content={description}
				className="w-[60%]  aspect-1  min-w-[180px]  max-w-[200px] max-h-[120px] h:max-h-[140px]"
			>
				<section className="w-full h-full overflow-hidden make_center bg-palette-green rounded-t-md relative">
					<div className="h-auto  w-auto absolute top-2 right-2">
						<LuUnlock
							size={20}
							className={`${isOpened ? " text-white" : "hidden"}`}
						/>
					</div>
					<div
						className={`${
							isOpened
								? "hidden"
								: "h-full w-full make_center backdrop-blur-[5px] overflow-hidden rounded-md  z-10"
						}`}
					>
						<LuLock
							size={100}
							className=" text-white  w-10 sm:w-20 drop-shadow-xl "
						/>
					</div>
					<Image
						src={avatar}
						alt="badge"
						height={200}
						width={200}
						className="object-contain absolute w-[50%]"
					/>
				</section>
				<section className="make_center w-full h-[30%] bg-palette-orange rounded-b-md px-1">
					<span className="text-white font-body font-bold drop-shadow-lg md:text-xl">
						{text}
					</span>
				</section>
			</div>
		</>
	);
};

export default Acheivement;
