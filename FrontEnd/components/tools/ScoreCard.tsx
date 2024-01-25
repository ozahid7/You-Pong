import { Scores } from "@/app/(main)/game/[user]/Game";
import { defaultavatar } from "@/const";
import React from "react";

const ScoreCard = (props: {
	type?: string;
	username: string;
	avatar: string;
	otheravatar: string;
	otherusername: string;
	scores: Scores;
}) => {
	return (
		<div className="my_score max-w-[700px] score_card w-full h:w-[72%] p-1 bg-gray-500  h-full flex justify-center items-center">
			<div className="center w-full h-full flex justify-center items-center">
				<div className="flex w-full  h:w-[90%] justify-evenly h-full">
					{" "}
					<div className="flex items-center gap-4">
						<img
							className="border-2 min-w-[30px] max-w-[50px] xl:max-w-[50px] aspect-1 flex border-white rounded-sm object-cover"
							src={props.avatar || defaultavatar}
							alt=""
							width={90}
							height={90}
						/>
						<div className="text-white font-body hidden lg:flex font-[700] text:lg sm:text-xl lg:text-2xl">
							<p>
								{props.username.length > 7
									? props.username.slice(0, 3) +
									  "-" +
									  props.username.slice(
											props.username.length - 3
									  )
									: props.username}
							</p>
						</div>
					</div>
					<div className="w-[40%] h-full flex justify-center items-center ">
						<div className="w-[80%] h-[90%] flex flex-row justify-evenly items-center">
							<span className="w-fit h-fit font-number text_stroke text-palette-orange text-3xl lg:text-4xl ">
								{props.scores.player}
							</span>
							<span className="w-fit h-fit font-number text_stroke text-palette-orange text-3xl lg:text-4xl ">
								:
							</span>
							<span className="w-fit h-fit font-number text_stroke text-palette-orange text-3xl lg:text-4xl ">
								{props.scores.opponent}
							</span>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<div className="text-white font-body font-[700] hidden lg:flex text-lg sm:text-xl lg:text-2xl">
							<p>
								{props.otherusername.length > 7
									? props.otherusername.slice(0, 3) +
									  "-" +
									  props.otherusername.slice(
											props.otherusername.length - 3
									  )
									: props.otherusername}
							</p>
						</div>
						<img
							className="border-2 min-w-[30px] max-w-[50px] xl:max-w-[50px] flex border-white rounded-sm aspect-1 object-cover"
							src={props.otheravatar || defaultavatar}
							alt=""
							width={90}
							height={90}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScoreCard;
