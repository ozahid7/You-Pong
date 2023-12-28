import { CustomButton, MyCard } from "@/components";
import { myRoutes } from "@/const";
import { useRouter } from "next/navigation";
import React from "react";

const NewGameCard = () => {
	const router = useRouter();
	return (
		<div className="flex z-0 justify-center w-[90%] md:w-full max-w-[600px] overflow-hidden min-h-[120px] h:min-h-[150px] h:max-h-[160px] md:max-h-[200px]  md:h-[24%] h:h-[20%]">
			<MyCard otherclass="">
				<div className="w-full relative px-2 h:px-4 sm:px-6  justify-between flex items-end h-full">
					<h3 className=" whitespace-nowrap text-cardtitle absolute text-[12px] top-2 left-2 h:left-6 sm:left-8 md:top-4 md:left-8 h:text-lg md:text-xl font-bold font-audio drop-shadow-sm">
						Ready For New Chalenge ?
					</h3>
					<div className=" h-[80%] w-full flex justify-center items-center">
						<CustomButton
							color="green"
							text="New Game"
							otherclass="min-w-[100px] max-w-[200px] sm:max-w-[360px]"
							handleclick={() => {
								router.push(myRoutes.gameme);
							}}
						/>
					</div>
				</div>
			</MyCard>
		</div>
	);
};

export default NewGameCard;
