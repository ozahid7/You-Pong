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
        "max-w-[500px] flex overflow-clip rounded-sm h-full min-h-[100px] w-full min-w-[200px]", style
    );

    return (
        <div className={classname}>
            <div className={customClass}></div>
            <div
                className={`w-full max-h-[100px] sm:min-h-full  bg-gradient-to-r ${start} ${end} flex items-center justify-between px-2 sm:px-3`}
            >
                <div className="w-[18%] pb-[18%] xxs:w-[80px] xxs:h-[60px] sm:min-w-[76px] sm:min-h-[70px]  relative">
                    <img
                        className=" h-[100%] w-[100%] absolute object-contain rounded-md"
                        src={avatar}
                        alt="avatar"
                    />
                </div>
                <div className="h-full px-2 w-full flex flex-col items-center justify-center md:justify-around  md:flex-row">
                    <span className="text-white text-4xl s:text-3xl lg:text-4xl sm:flex font-bold drop-shadow-lg">
                        { userName.length > 7 ? userName.substring(0, 7) + "." : userName}
                    </span>
                    <span className="text-white text-4xl s:text-3xl lg:text-4xl sm:flex font-bold drop-shadow-lg">
                        {wins + " : " + loses}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Banner;
