"use client";
import { useMatchs } from "@/api/useMatchs";
import { Banner, MyCard } from "@/components";
import MiniLoader from "@/components/tools/MiniLoader";
import { defaultavatar } from "@/const";
import React, { useEffect } from "react";
import { Tooltip } from "react-tooltip";

const HistoryCard = (props: { uid: string; me: string }) => {
	const matchsQuery = useMatchs(props.uid);
	const matchs = matchsQuery.data;

	useEffect(() => {
		matchsQuery.refetch();
	}, []);
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
										isGreen={e.win}
										opponent={
											e.is_blocked
												? "Unknown"
												: e.username
										}
										avatar={
											e.is_blocked
												? defaultavatar
												: e.avatar
										}
										wins={e.player_score}
										loses={e.opponent_score}
										key={index}
										me={props.me}
										status={e.status}
										uid={e.uid}
										isBlocked={e.is_blocked}
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
