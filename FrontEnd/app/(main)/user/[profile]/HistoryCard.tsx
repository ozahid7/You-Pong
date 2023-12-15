"use client";
import useOtherUser from "@/api/useOtherUser";
import { Banner, MyCard } from "@/components";
import { MyContext, useUser } from "@/providers/UserContextProvider";
import { UserToShow } from "@/types/Api";
import React, { useContext } from "react";
import { Tooltip } from "react-tooltip";




const HistoryCard = ({ otheruser }: { otheruser: UserToShow }) => {
    const user = useUser();

    let  matchs  = user.userData.matchs;
    if (otheruser && otheruser !== undefined){
        matchs = otheruser.matchs
    }
    return (
        <div className="flex justify-center z-0 items-center   max-w-[720px] xl:max-h-none max-h-[500px] xl:max-w-[520px] min-w-[256px] w-[90%] xl:w-[92%] h-[94%] xl:h-[90%] ">
            <MyCard type="nocorner" otherclass="max-h-full w-full flex ">
                <div className="w-full relative   h-full flex flex-col justify-end items-end">
                    <h3 className=" whitespace-nowrap text-cardtitle  text-[12px] absolute top-4 left-4 h:left-6 sm:left-8 md:left-8  h:text-lg md:text-xl font-bold font-audio drop-shadow-sm">
                        Match History
                    </h3>
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
                    <div className="w-full xl:h-[90%] h:h-[84%] h-[88%] items-center relative flex justify-center overflow-auto my_scroll_green mb-2">
                        {matchs.length < 1 && (
                            <span className="absolute font-audio text-xl text-cardtitle">
                                No match yet
                            </span>
                        )}
                        <div className=" flex w-[90%] min-w-[180px] h-[100%] flex-col items-center space-y-10">
                            {matchs.map((e, index) => (
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

export default HistoryCard;
