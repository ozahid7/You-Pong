'use client'
import { Acheivement, MyCard } from "@/components";
import { Tooltip } from "react-tooltip";
import React from "react";
import { color } from "chart.js/helpers";

interface Achievement {
    title: string
    description: string
    isOwned: boolean
}

const Achievements: Achievement[] = [
    {title: "Achievement 1", description: "Play your first game", isOwned: true},
    {title: "Achievement 2", description: "Play your first game", isOwned: false},
    {title: "Achievement 3", description: "Play your first game", isOwned: false},
    {title: "Achievement 4", description: "Play your first game", isOwned: true},
    {title: "Achievement 5", description: "Play your first game", isOwned: false},
    {title: "Achievement 5", description: "Play your first game", isOwned: true},
    {title: "Achievement 5", description: "Play your first game", isOwned: false},
    {title: "Achievement 5", description: "Play your first game", isOwned: true}
];

const AchievementCard = () => {
    return (
        <div className="flex justify-center min-w-[240px] w-full sm:w-[94%] h-[100%] ">
            <MyCard type="nocorner" otherclass="max-h-full flex">
                <div className="w-full  h-full flex flex-col justify-around items-center">
                    <div className="w-full h-[16%] relative  lg:h-[8%] md:h-[30%]  flex items-center">
                        <h3 className=" whitespace-nowrap text-cardtitle absolute top-3 left-3 h:left-6 h:top-2 sm:left-8 md:top-4 md:left-8 text-[12px]  h:text-lg md:text-2xl font-bold font-audio drop-shadow-sm">
                            Achievement
                        </h3>
                    </div>
                    <Tooltip
                        id="my-tooltip"
                        className="greenTooltip font-body border-2 border-palette-grey font-semibold drop-shadow-lg z-10"
                        style={{
                            backgroundColor: "#46686A",
                            color: "#fff",
                        }}
                        opacity={1}
                        place={"left-start"}
                    />
                    <div className=" flex w-full overflow-y-auto  my_scroll  relative space-y-8 min-w-[180px]  h-[90%] flex-col z-10 items-center justify-between">
                        {Achievements.map((e: Achievement, index) => (
                            <Acheivement
                                classname=""
                                isOpened={e.isOwned ? true : false}
                                text={e.title}
                                description={e.description}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            </MyCard>
        </div>
    );
};

export default AchievementCard;
