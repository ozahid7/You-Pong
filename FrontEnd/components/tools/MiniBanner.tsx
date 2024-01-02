import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Tooltip } from "react-tooltip";

const MiniBanner = (props: {
	isGreen: boolean;
	name: string;
	value: string;
	valueStyle?: string;
	nameStyle?: string;
	isRank?: boolean;
	rank?: string;
	isLevel?: boolean;
	className?: string;
}) => {
	const start = props.isGreen ? "from-[#508286]" : "from-[#E97152]";
	const valuestyle = twMerge(
		"text-white font-body drop-shadow-lg font-bold text-md h:text-lg md:text-xl",
		props.valueStyle
	);
	const namestyle = twMerge(
		"text-white text-md h:text-lg md:text-xl drop-shadow-md font-bold",
		props.nameStyle
	);
	const className = twMerge(
		"max-w-[300px] flex  rounded-sm drop-shadow-md h-full font-body h:w-[80%] md:min-h-[45px] min-h-[34px] h:min-h-[40px] w-full",
		props.className
	);
	const end = props.isGreen ? "to-[#9DBBBD]" : "to-[#ECAC9B]";
	const customClass = `w-[6%] sm:w-[3%] max-w-[20px] min-w-[14px] max-h-[100px] sm:min-h-full   ${
		props.isGreen ? "bg-palette-green" : "bg-palette-orange"
	}`;

	const [avatar, setAvatar] = useState("");
	const [message, setMessage] = useState("");

	//choose rank
	useEffect(() => {
		if (props.rank === "BIOS") {
			setAvatar("/bios.png");
			setMessage("Bios 🥺");
		} else if (props.rank === "COMODORE") {
			setMessage("Comodore 😌");
			setAvatar("/comodor.png");
		} else if (props.rank === "FREAX") {
			setMessage("Freax 🙁");
			setAvatar("/freax.png");
		} else {
			setMessage("Pandora 😍");
			setAvatar("/pandora.png");
		}
	}, []);

	const tmp = props.isLevel
		? parseFloat(props.value).toFixed(1)
		: props.value;
	const value = tmp.endsWith(".0") ? tmp.slice(0, tmp.length - 2) : tmp;
	return (
		<div className={className}>
			<div className={customClass}></div>
			<div
				className={`w-full max-h-[100px] sm:min-h-full  bg-gradient-to-r ${start} ${end} flex items-center justify-between h:justify-around px-2 sm:px-3`}
			>
				<p className={namestyle}>{props.name}</p>
				{!props.isRank ? (
					<p className={valuestyle}>{value}</p>
				) : (
					<>
						<Tooltip
							id="rank_image"
							className="greenTooltip max-w-[160px] font-body border-2 border-palette-grey drop-shadow-lg font-semibold z-10"
							style={{
								backgroundColor: "#46686A",
								color: "#fff",
							}}
							opacity={1}
							place={"right"}
							positionStrategy={"absolute"}
						/>
						<img
							data-tooltip-content={message}
							data-tooltip-id="rank_image"
							data-tooltip-hidden={!props.isRank}
							className="border-2 max-w-[20px] h:max-w-[26px] flex border-white rounded-sm object-contain"
							src={avatar}
							alt=""
							width={90}
							height={90}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default MiniBanner;
