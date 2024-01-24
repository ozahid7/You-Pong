import useOtherUser from "@/api/useOtherUser";
import { defaultavatar, myRoutes } from "@/const";
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
	isBlocked: boolean;
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
	isBlocked,
}: BannerProps) => {
	const start = isGreen ? "from-[#508286]" : "from-[#E97152]";
	const router = useRouter();
	const otheruser = useOtherUser(opponent, true);
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

	return (
		<div className={classname}>
			{opponent != me && !isBlocked && (
				<BsController
					size={100}
					strokeWidth={0.5}
					className={`${directIconStyle} text-palette-green top-2 right-2`}
					onClick={() => {
						otheruser.refetch().then((res) => {
							if (res.data.status === "INGAME")
								notify(
									opponent,
									avatar,
									false,
									2000,
									"Player Already In Game"
								);
							else router.push(myRoutes.game + "/" + uid);
						});
					}}
				/>
			)}
			<div className={customClass}></div>
			<div
				className={`w-full max-h-[100px] sm:min-h-full pl-8 px-3 bg-gradient-to-r ${start} ${end} flex items-center justify-between`}
			>
				<div className="w-[10%] min-w-[45px] drop-shadow-md border-2 border-white h:w-[12%] md:w-[12%] xl:w-[14%] max-w-[160px] aspect-1 object-cover rounded-md">
					<img
						className=" h-[100%] w-[100%] aspect-1 absolute object-cover rounded-sm"
						src={avatar || defaultavatar}
						alt="avatar"
					/>
				</div>
				<div className="h-full px-2 w-[80%]  flex flex-col items-center justify-center h:justify-around  h:flex-row">
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
