import React from "react";
import { twMerge } from "tailwind-merge";

const MiniBanner = (props: {
    isGreen: boolean;
    name: string;
    value: string;
    valueStyle?: string;
    nameStyle?: string
    className?: string
}) => {
    const start = props.isGreen ? "from-[#508286]" : "from-[#E97152]";
    const valuestyle = twMerge(
        "text-white font-body drop-shadow-lg font-bold text-md h:text-lg md:text-xl" , props.valueStyle
    );
    const namestyle = twMerge(
        "text-white text-md h:text-lg md:text-xl drop-shadow-md font-bold", props.nameStyle
    );
    const className = twMerge(
        "max-w-[300px] flex overflow-clip rounded-sm drop-shadow-md h-full font-body h:w-[80%] md:min-h-[45px] min-h-[34px] h:min-h-[40px] w-full", props.className
    );
    const end = props.isGreen ? "to-[#9DBBBD]" : "to-[#ECAC9B]";
    const customClass = `w-[6%] sm:w-[3%] max-w-[20px] min-w-[14px] max-h-[100px] sm:min-h-full   ${
        props.isGreen ? "bg-palette-green" : "bg-palette-orange"
    }`;

    return (
        <div className={className}>
            <div className={customClass}></div>
            <div
                className={`w-full max-h-[100px] sm:min-h-full  bg-gradient-to-r ${start} ${end} flex items-center justify-between h:justify-around px-2 sm:px-3`}
            >
                <p className={namestyle}>{props.name}</p>
                <p className={valuestyle}>{props.value}</p>
            </div>
        </div>
    );
};

export default MiniBanner;
