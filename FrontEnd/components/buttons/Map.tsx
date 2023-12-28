import React, { useState } from "react";

interface Props {
	elements: string;
	border: string;
	background: string;
	name: string;
}

const arrayMap: Props[] = [
	{
		elements: "#EB6440",
		border: "#EB6440",
		background: "white",
		name: "orange",
	},
	{
		elements: "white",
		border: "white",
		background: "black",
		name: "classic",
	},
	{
		elements: "#497174",
		border: "#D6E4E5",
		background: "#EFF5F5",
		name: "green",
	},
];

function Map(props: { handelClick: any }) {
	const [selected, setSelected] = useState("Classic");
	return (
		<>
			{(arrayMap as Props[]).map((items: Props, index: number) => (
				<div
					key={index}
					onClick={() => {
						props.handelClick(items.name);
						setSelected(items.name);
					}}
					className="flex h-1 min-h-[110px] space-y-2 sm:min-h-[160px] s:max-w-[160px] sm:max-w-none lg:min-h-[200px] h:w-[50%]  w-[70%] md:w-[30%] md max-w-[300px] justify-center flex-col items-center"
				>
					<div
						id={items.name}
						style={{ background: `${items.background}` }}
						className={`flex w-[85%] ${
							selected === items.name
								? "border-[4px] rounded-[4px] border-palette-orange scale-110"
								: ""
						} h-full shadow-md px-4 py-3 z-10 justify-center items-center  flex-col rounded-sm`}
					>
						<button
							style={{ borderColor: `${items.border}` }}
							className={`flex shadow-lg dblue rounded-sm h-full w-full outline-none  lg:border-4 items-center justify-center hover:scale-110 transform-gpu btn btn-ghost`}
						>
							<div className="flex w-[95%] h-[95%] justify-between flex-col items-center ">
								<div
									style={{ background: `${items.elements}` }}
									className={`flex w-[35%] h-[3%] 2xl_:w-[32%]`}
								></div>
								<div
									style={{ background: `${items.elements}` }}
									className={`flex rounded-full w-[6px] h-[6px] sm_:w-[6px] sm_:h-[6px] md_:w-[7px] md_:h-[7px] lg_:w-[8px] lg_:h-[8px] 2xl_:w-[10px] 2xl_:h-[10px] 3xl_:w-[11px] 3xl_:h-[11px]`}
								></div>
								<div
									style={{ background: `${items.elements}` }}
									className={`flex w-[35%] h-[3%]`}
								></div>
							</div>
						</button>
					</div>
					<label
						htmlFor={items.name}
						className="font-['Chakra_Petch'] cursor-pointer text-[11px] s:text-[13px] sm_:text-[15px] md_:text-[16px] lg_:text-[18px] xl_:text-[20px] 2xl_:text-[22px] text-[#686868] font-[700] w-fit h-fit underline"
					>
						{items.name} map
					</label>
				</div>
			))}
		</>
	);
}

export default Map;
