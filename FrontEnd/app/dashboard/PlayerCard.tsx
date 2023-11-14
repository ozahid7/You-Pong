"use client";
import { MyCard } from "@/components";
import React, { useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { ImUserMinus, ImUserPlus } from "react-icons/im";
import { LuSettings } from "react-icons/lu";

const PlayerCard = () => {
    let [Icon, setIcon] = useState(false);
    const [isFriend, setIsFriend] = useState(false);


    const hideIcon = () => {
        setIcon(!Icon);
    };

    return (
        <div className="flex justify-center w-[90%] overflow-hidden h-[16%] h:h-[20%]">
            <MyCard
                otherclass="max-h-[180px]"
                midleclass="w-[97%] h-[96%] justify-between"
            >
                <div className="w-full  justify-between flex h-full">
                    <div className="w-[40%] flex rounded-tl-[26px] s:rounded-tl-[30px] h:rounded-tl-[40px] overflow-hidden h-full">
                        <img
                            src="/ozahid-.jpeg"
                            alt="image"
                            className="object-fill h-full border-r-2 border-gray-200 w-full"
                        />
                    </div>
                    <div className="w-[58%] h-full flex flex-col items-center justify-center pt-2 relative">
                        <h3 className=" text-cardtitle absolute top-1 left-1 h:text-xl font-bold font-audio drop-shadow-sm">
                            Player Card
                        </h3>
                        <div className="w-[86%] mt-1 h:pl-4 relative">
                            <div className="w-full  h:w-[86%] flex justify-end">
                                {Icon ? (
                                    <ImUserMinus
                                        onClick={hideIcon}
                                        size={120}
                                        className="z-10 h-[20%] w-[20%] s:h-[16%] s:w-[16%]   text-cardtitle cursor-pointer"
                                    />
                                ) : (
                                    <ImUserPlus
                                        onClick={hideIcon}
                                        size={30}
                                        className="z-10 h-[20%] w-[20%] s:h-[16%] s:w-[16%] text-cardtitle cursor-pointer"
                                    />
                                )}
                            </div>
                            <h2 className="font-extrabold font-black text-2xl h:text-3xl text-palette-green drop-shadow">
                                OZAHID-
                            </h2>
                            <hr className="border rounded-sm border-placeholdercolor w-[70%]" />
                            <div className="flex  justify-between max-w-[110px] pt-2 w-[86%]">
                                <div className="flex flex-col">
                                    <p className="text-lg font-semibold text-gray-600">
                                        Level
                                    </p>
                                    <p className="text-sm text-gray-600">60</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-lg font-semibold text-gray-600">
                                        Rank
                                    </p>
                                    <p className="text-sm text-gray-600">10</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MyCard>
        </div>
    );
};

export default PlayerCard;
