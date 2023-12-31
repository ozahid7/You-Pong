import { myRoutes } from "@/const";
import { notify } from "@/utils/game";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BsController } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

interface BannerProps {
	isGreen: boolean;
	opponent: string;
	avatar: string;
	wins: string;
	loses: string;
	style?: string;
	me: string;
	status: string;
	uid: string;
}

const Banner = ({
	isGreen,
	opponent,
	avatar,
	wins,
	loses,
	style,
	me,
	status,
	uid,
}: BannerProps) => {
	const start = isGreen ? "from-[#508286]" : "from-[#E97152]";
	const router = useRouter();
	const end = isGreen ? "to-[#9DBBBD]" : "to-[#F3947B]";
	const customClass = `w-[6%] sm:w-[3%] max-w-[20px] min-w-[14px] max-h-[100px] sm:min-h-full   ${
		isGreen ? "bg-palette-green" : "bg-palette-orange"
	}`;

	const classname = twMerge(
		"max-w-[500px] relative relative flex overflow-clip z-0 rounded-sm h-full min-h-[80px] h:min-h-[100px] max-h-[100px] w-full min-w-[200px]",
		style
	);
	const directIconStyle =
		"z-10 h-6 w-6 bg-palette-white p-[5px] rounded-lg drop-shadow-md absolute cursor-pointer";

	useEffect(() => {
		console.log("me = ", me, opponent);
	}, []);

	return (
		<div className={classname}>
			{opponent != me && (
				<BsController
					size={100}
					strokeWidth={0.5}
					className={`${directIconStyle} text-palette-green top-2 right-2`}
					onClick={() => {
						if (status === "INGAME")
							notify(
								opponent,
								avatar,
								false,
								2000,
								"Player Already In Game"
							);
						else router.push(myRoutes.game + "/" + uid);
					}}
				/>
			)}
			<div className={customClass}></div>
			<div
				className={`w-full max-h-[100px] sm:min-h-full  bg-gradient-to-r ${start} ${end} flex items-center justify-between px-2 sm:px-3`}
			>
				<div className="w-[17%] pb-[17%] xxs:w-[80px] xxs:h-[60px] sm:min-w-[64px 2xl:min-w-[76px] 2xl:min-h-[70px] sm:min-h-[60px]  relative">
					<img
						className=" h-[100%] w-[100%] absolute object-contain rounded-md"
						src={avatar}
						alt="avatar"
					/>
				</div>
				<div className="h-full px-2 w-full flex flex-col items-center justify-center h:justify-around  h:flex-row">
					<span
						data-tooltip-id="banner_tooltip"
						data-tooltip-content={opponent}
						className="text-white text-xl s:text-2xl 2xl:text-[25px] sm:flex font-bold drop-shadow-lg"
					>
						{opponent.length > 8 ? opponent.slice(0, 7) : opponent}
					</span>
					<span className="text-white text-xl s:text-3xl md:text-3xl  sm:flex font-bold drop-shadow-lg">
						{wins + " : " + loses}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Banner;
