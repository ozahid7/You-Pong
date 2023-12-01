import React from "react";
import { AnimatedText } from "..";
import { twMerge } from "tailwind-merge";

interface BannerProps {
    isGreen: boolean;
    userName: string;
    avatar: string
    wins: string
    loses: string
    style?: string
}

const Banner = ({ isGreen, userName, avatar, wins, loses, style }: BannerProps) => {
    const start = isGreen ? "from-[#508286]" : "from-[#E97152]";
    const end = isGreen ? "to-[#9DBBBD]" : "to-[#F3947B]";
    const customClass = `w-[6%] sm:w-[3%] max-w-[20px] min-w-[14px] max-h-[100px] sm:min-h-full   ${
        isGreen ? "bg-palette-green" : "bg-palette-orange"
    }`;

    const classname = twMerge(
        "max-w-[500px] flex overflow-clip z-0 rounded-sm h-full min-h-[80px] h:min-h-[100px] max-h-[100px] w-full min-w-[200px]", style
    );

    return (
        <div
            
            className={classname}
        >
            <div className={customClass}></div>
            <div
                className={`w-full max-h-[100px] sm:min-h-full  bg-gradient-to-r ${start} ${end} flex items-center justify-between px-2 sm:px-3`}
            >
                <div className="w-[17%] pb-[17%] xxs:w-[80px] xxs:h-[60px] sm:min-w-[64px 2xl:min-w-[76px] 2xl:min-h-[70px] sm:min-h-[60px]  relative">
                    <img
                        className=" h-[100%] w-[100%] absolute object-contain rounded-md"
                        src={avatar}
                        alt="avatar"
                    />
                </div>
                <div className="h-full px-2 w-full flex flex-col items-center justify-center h:justify-around  h:flex-row">
                    <span
                        data-tooltip-id="banner_tooltip"
                        data-tooltip-content={userName}
                        className="text-white text-xl s:text-3xl md:text-3xl sm:flex font-bold drop-shadow-lg"
                    >
                        {userName.length > 7
                            ? userName.slice(0, 4) + "..."
                            : userName}
                    </span>
                    <span className="text-white text-xl s:text-3xl md:text-3xl sm:flex font-bold drop-shadow-lg">
                        {wins + " : " + loses}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Banner;
