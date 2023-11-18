'use client'
import { MiniBanner, MyCard } from "@/components";
import React from "react";
import { PieChart } from "react-minimal-pie-chart";

const OverviewCard = () => {

    const wins = 10;
    const lose = 8;
    let result: number; 
    
    result = (wins + lose) != 0 ? Math.round(wins * 100 / (wins + lose)) : 50;

    return (
        <div className="flex justify-center w-full h:w-[90%] overflow-hidden min-h-[140px] h:min-h-[180px] lg:min-h-[220px] h-[20%] md:h-[28%] h:h-[24%]">
            <MyCard >
                <div className="w-full relative px-2 h:px-4 sm:px-6  justify-between flex items-end h-full">
                    <h3 className=" whitespace-nowrap text-cardtitle absolute text-[12px] top-2 left-2 h:left-6 sm:left-8 md:top-4 md:left-8 h:text-lg md:text-2xl font-bold font-audio drop-shadow-sm">
                        Overview
                    </h3>
                    <div className="h-[84%] flex justify-between w-full ">
                        <div className="h-full s:pl-4 flex flex-col justify-evenly w-[50%] h:w-[48%]">
                            <MiniBanner
                                isGreen={false}
                                className="h-[30%] h:w-full"
                                name="Lose"
                                value="220"
                                valueStyle="md:text-2xl"
                                nameStyle="md:text-3xl"
                            />
                            <MiniBanner
                                isGreen={true}
                                className="h-[30%] h:w-full justify-around"
                                name="Wins"
                                value="220"
                                valueStyle="md:text-2xl"
                                nameStyle="md:text-3xl"
                            />
                        </div>
                        <div className="w-[48%] h-full flex  flex-col justify-evenly items-center">
                            <div className="">
                                <h2 className="font-body text-cardtitle font-bold text-lg h:text-2xl sm:text-2xl">
                                    Win Rate
                                </h2>
                            </div>
                            <div className="h-[70%] relative mt-2 md:mt-6  mb-4 sm:mb-6 flex justify-center items-center w-full">
                            <p className="absolute font-body font-extrabold  text-gray-700 text-lg h:text-2xl sm:text-3xl">{result.toString() + "%"}</p>
                                <PieChart
                                    lineWidth={20}
                                    rounded={true}
                                    labelPosition={0}
                                    paddingAngle={0}
                                    animate={true}
                                    data={[
                                        {
                                            title: "lose",
                                            value: lose,
                                            color: "#EB6440",
                                        },
                                        {
                                            title: "wins",
                                            value: wins,
                                            color: "#497174",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </MyCard>
        </div>
    );
};

export default OverviewCard;
