"use client";
import React from "react";
import { Tooltip } from "react-tooltip";

const MyToolTip = (props: { id: string }) => {
	return (
		<Tooltip
			id={props.id}
			className="greenTooltip max-w-[160px] font-body border-2 border-palette-grey font-semibold shadow-lg"
			style={{
				backgroundColor: "#46686A",
				color: "#fff",
				zIndex: 1000,
			}}
			opacity={1}
			place={"top"}
		/>
	);
};

export default MyToolTip;
