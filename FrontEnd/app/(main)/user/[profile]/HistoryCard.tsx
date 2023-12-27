"use client";
import { useUser } from "@/api/getHero";
import { useMatchs } from "@/api/useMatchs";
import { Banner, MyCard } from "@/components";
import Loader from "@/components/tools/Loader";
import MiniLoader from "@/components/tools/MiniLoader";
import { match } from "@/types/Api";
import React from "react";
import { Tooltip } from "react-tooltip";

const HistoryCard = (props: { uid: string }) => {
	const matchs = useMatchs(props.uid).data;
	const user = useUser(true);
	return (
		<div className="flex justify-center z-0 items-center   max-w-[720px] xl:max-h-none max-h-[500px] xl:max-w-[520px] min-w-[256px] w-[90%] xl:w-[92%] h-[94%] xl:h-[90%] ">
			<MyCard type="nocorner" otherclass="max-h-full w-full flex ">
				{matchs ? (
					<div className="w-full relative   h-full flex flex-col justify-end items-end">
						<h3 className=" whitespace-nowrap text-cardtitle  text-[12px] absolute top-4 left-4 h:left-6 sm:left-8 md:left-8  h:text-lg md:text-xl font-bold font-audio drop-shadow-sm">
							Match History
						</h3>
						<Tooltip
							id="banner_tooltip"
							className="greenTooltip font-body border-2 border-palette-grey font-semibold drop-shadow-lg z-10"
							style={{
								backgroundColor: "#46686A",
								color: "#fff",
							}}
							opacity={1}
							place={"top"}
						/>
						<div className="w-full xl:h-[90%] h:h-[84%] h-[88%] items-center relative flex justify-center overflow-auto my_scroll_green mb-2">
							{matchs.length < 1 && (
								<span className="absolute font-audio text-xl text-gray-400">
									No match yet
								</span>
							)}
							<div className=" flex w-[90%] min-w-[180px] h-[100%] flex-col items-center space-y-10">
								{matchs.map((e, index) => (
									<Banner
										isGreen={
											e.player_score >= e.opponent_score
												? true
												: false
										}
										opponent={e.username}
										avatar={e.avatar}
										wins={e.player_score}
										loses={e.opponent_score}
										key={index}
										me={user.data.username}
									/>
								))}
							</div>
						</div>
					</div>
				) : (
					<MiniLoader />
				)}
			</MyCard>
		</div>
	);
};

export default HistoryCard;
