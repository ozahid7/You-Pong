import React from "react";
import { AnimatedText } from ".";

const Banner = ({ isGreen }: { isGreen: boolean }) => {
    const start = isGreen ? "#508286" : "#E97152";
    const end = isGreen ? "#9DBBBD" : "#F3947B";
    const customClass = `w-[6%] sm:w-[3%] max-w-[600px] max-h-[100px] sm:min-h-full bg-palette-${
        isGreen ? "green" : "orange"
    }`;

    return (
        <div className=" flex overflow-clip rounded-sm h-[12%] w-[60%] min-w-[260px]">
            <div className={customClass}></div>
            <div
                className={`w-full max-w-[600px] max-h-[100px] sm:min-h-full  bg-gradient-to-r from-[#508286] to-[#9DBBBD] pl-6 flex items-center justify-between pr-6`}
            >
                <div className="w-[18%] pb-[18%]  min-w-[70px] min-h-[70px]  relative">
                    <img
                        className=" h-[100%] w-[100%] absolute rounded-md"
                        src="/ozahid-.jpeg"
                        alt=""
                    />
                </div>
                    <AnimatedText name="OZAHID-" size='120px'/>
                <span className="text-white text-5xl md:text-4xl sm:flex font-bold drop-shadow-lg">
                    7 : 0
                </span>
            </div>
        </div>
    );
};

export default Banner;
