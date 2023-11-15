import React from "react";

const MiniBanner = (props: {
    isGreen: boolean;
    name: string;
    value: string;
}) => {
    const start = props.isGreen ? "from-[#508286]" : "from-[#E97152]";
    const end = props.isGreen ? "to-[#9DBBBD]" : "to-[#ECAC9B]";
    const customClass = `w-[6%] sm:w-[3%] max-w-[20px] min-w-[14px] max-h-[100px] sm:min-h-full   ${
        props.isGreen ? "bg-palette-green" : "bg-palette-orange"
    }`;

    return (
        <div className="max-w-[300px] flex overflow-clip rounded-sm drop-shadow-md h-full h:w-[80%] md:min-h-[45px] min-h-[34px] h:min-h-[40px] w-full">
            <div className={customClass}></div>
            <div
                className={`w-full max-h-[100px] sm:min-h-full  bg-gradient-to-r ${start} ${end} flex items-center justify-between sm:justify-around px-2 sm:px-3`}
            >
                <p className="text-white font-body drop-shadow-lg font-bold text-lg h:text-2xl">{props.name}</p>
                <p className="text-white text-md h:text-xl drop-shadow-md font-bold">{props.value}</p>
            </div>
        </div>
    );
};

export default MiniBanner;
