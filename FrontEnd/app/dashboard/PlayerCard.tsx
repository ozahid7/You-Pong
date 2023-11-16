"use client";
import { MiniBanner, MyCard } from "@/components";
import React, { useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { ImUserMinus, ImUserPlus } from "react-icons/im";
import { MdOutlineSettings } from "react-icons/md";


const PlayerCard = () => {
    let [Icon, setIcon] = useState(false);
    const [isFriend, setIsFriend] = useState(false);
    const isOnline = false;
    


    const hideIcon = () => {
        setIcon(!Icon);
    };

    return (
        <div className="flex justify-center w-[90%] overflow-hidden h-[16%] md:h-[24%] h:h-[20%]">
            <MyCard otherclass="">
                <div className="w-full  justify-between flex h-full">
                    <div className="sm:w-[40%] w-[34%] flex relative flex-col justify-center  md:justify-end  pb-[14px] items-center h-full">
                        <h3 className=" whitespace-nowrap text-cardtitle absolute text-[12px] top-2 left-2 h:left-6 sm:left-8 md:top-4 md:left-8 h:text-lg md:text-2xl font-bold font-audio drop-shadow-sm">
                            Player Card
                        </h3>
                        <div className="w-[80%] h:w-[70%] sm:w-[60%] md:w-[70%] md:mb-4 mt-8 overflow-hidden rounded-md">
                            <img
                                src="/ozahid-.jpeg"
                                alt="image"
                                className="object-contain h-full aspect-square border-2 border-palette-white w-full"
                            />
                        </div>
                    </div>
                    <div className="w-[62%] h-full pr-1 sm:pr-0 flex flex-col items-center justify-center pt-1 sm:pt-2 relative">
                        <MdOutlineSettings
                            size={120}
                            className="z-10 h-5 w-5 sm:h-[14%]  sm:w-[14%] s:h-[16%] s:w-[16%] absolute top-1 right-1 sm:top-2 sm:right-2  text-cardtitle cursor-pointer"
                        />
                        {Icon ? (
                            <ImUserMinus
                                onClick={hideIcon}
                                size={120}
                                className="z-10 h-[20%] w-[20%] s:h-[16%] s:w-[16%] absolute sm:bottom-6 sm:right-2 bottom-3 right-3  text-cardtitle cursor-pointer"
                            />
                        ) : (
                            <ImUserPlus
                                onClick={hideIcon}
                                size={120}
                                className="z-10 h-[14%] w-[14%] s:h-[16%] s:w-[16%] absolute h:bottom-6 h:right-2 bottom-4 right-1  text-cardtitle cursor-pointer"
                            />
                        )}
                        <div className="sm:w-[86%] h-[78%] w-full flex flex-col justify-evenly space-y-1 relative">
                            <div className=" w-[80%] xs:w-[60%] s:w-[50%] sm:w-[76%] flex justify-end">
                                <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                                    <span
                                        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                                            isOnline
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }  opacity-75`}
                                    ></span>
                                    <span
                                        className={`relative inline-flex rounded-full w-2 h-2 sm:h-3 sm:w-3 ${
                                            isOnline
                                                ? "bg-green-600"
                                                : "bg-red-600"
                                        } `}
                                    ></span>
                                </span>
                            </div>
                            <h2 className="font-extrabold font-black text-2xl h:text-3xl sm:text-4xl md:text-5xl text-cardtitle drop-shadow">
                                OZAHID-
                            </h2>
                            <div className="flex flex-col justify-between h-auto space-y-3 w-[80%] sm:w-[90%]">
                                <MiniBanner
                                    isGreen={true}
                                    value="69,7"
                                    name="Level"
                                />

                                <MiniBanner
                                    isGreen={false}
                                    value="10"
                                    name="Rank"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </MyCard>
        </div>
    );
};

export default PlayerCard;
