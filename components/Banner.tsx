import React from "react";
import { AnimatedText } from ".";

interface BannerProps {
    isGreen: boolean;
    userName: string
}

const Banner = ({isGreen, userName}: BannerProps) => {
    const start = isGreen ? "from-[#508286]" : "from-[#E97152]";
    const end = isGreen ? "to-[#9DBBBD]" : "to-[#F3947B]";
    const customClass = `w-[6%] sm:w-[3%] max-w-[20px] min-w-[14px] max-h-[100px] sm:min-h-full   ${
        isGreen ? "bg-palette-green" : "bg-palette-orange"
    }`;

    return (
        <div className="max-w-[500px] flex overflow-clip rounded-sm h-[12%] w-[60%] min-w-[200px]">
            <div className={customClass}></div>
            <div
                className={`w-full max-h-[100px] sm:min-h-full  bg-gradient-to-r ${start} ${end} flex items-center justify-between px-2 sm:px-5`}
            >
                <div className="w-[18%] pb-[18%] xxs:w-[46px] xxs:h-[46px] sm:min-w-[70px] sm:min-h-[70px]  relative">
                    <img
                        className=" h-[100%] w-[100%] absolute rounded-md"
                        src="/ozahid-.jpeg"
                        alt=""
                    />
                </div>
                <AnimatedText name={userName} />
                <span className="text-white text-5xl lg:text-4xl sm:flex font-bold drop-shadow-lg">
                    7 : 0
                </span>
            </div>
        </div>
    );
};

export default Banner;
