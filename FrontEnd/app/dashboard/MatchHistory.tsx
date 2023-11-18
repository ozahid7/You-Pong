'use client'
import { Banner, MyCard } from "@/components";
import React from "react";
import { Tooltip } from "react-tooltip";

interface match {
    avatar: string;
    user: string;
    wins: string;
    loses: string;
}

const matchList: match[] = [
    {
        avatar: "/ozahid-.jpeg",
        user: "ozahid-",
        wins: "5",
        loses: "5",
    },
    {
        avatar: "/ozahid-.jpeg",
        user: "ozahid-",
        wins: "7",
        loses: "5",
    },
    {
        avatar: "/ozahid-.jpeg",
        user: "ozahid-",
        wins: "5",
        loses: "7",
    },
    {
        avatar: "/ozahid-.jpeg",
        user: "ozahid-",
        wins: "5",
        loses: "7",
    },
    {
        avatar: "/ozahid-.jpeg",
        user: "ozahid-",
        wins: "5",
        loses: "5",
    },
    {
        avatar: "/ozahid-.jpeg",
        user: "ozahid-",
        wins: "5",
        loses: "5",
    },
    {
        avatar: "/ozahid-.jpeg",
        user: "ozahid-",
        wins: "5",
        loses: "7",
    },
    {
        avatar: "/ozahid-.jpeg",
        user: "ozahid-fffff",
        wins: "7",
        loses: "5",
    },
    {
        avatar: "/ozahid-.jpeg",
        user: "ozahid-",
        wins: "5",
        loses: "7",
    },
];

const MatchHistory = () => {
    return (
        <div className="flex justify-center 2xl:max-w-[520px] min-w-[256px] w-[90%] dblue h-[100%] ">
            <MyCard type="nocorner" otherclass="max-h-full w-[94%] flex">
                <div className="w-full dgreen   h-full flex flex-col justify-around items-center">
                    <div className="w-full pl-12 md:h-[20%] h-[10%] xl:h-[8%] flex items-center">
                        <h3 className=" whitespace-nowrap text-cardtitle  text-[12px]  h:text-lg md:text-2xl font-bold font-audio drop-shadow-sm">
                            Match History
                        </h3>
                    </div>
                    <Tooltip
                        id="banner_tooltip"
                        className="greenTooltip font-body border-2 border-palette-grey font-semibold drop-shadow-lg z-10"
                        style={{
                            backgroundColor: "#46686A",
                            color: "#fff",
                        }}
                        opacity={1}
                        place={"top"}
                    />
                    <div className="w-full h-[90%] flex justify-center overflow-auto my_scroll">
                        <div className=" flex w-[90%] space-y-8 min-w-[180px]  h-[90%] flex-col items-center justify-between">
                            {matchList.map((e, index) => (
                                <Banner
                                    isGreen={e.wins >= e.loses ? true : false}
                                    userName={e.user}
                                    avatar={e.avatar}
                                    wins={e.wins}
                                    loses={e.loses}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </MyCard>
        </div>
    );
};

export default MatchHistory;
