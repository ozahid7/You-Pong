import { MyCard } from "@/components";
import { ImUserPlus } from "react-icons/im";

import React from "react";
import { LuSettings } from "react-icons/lu";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full w-full make_center dred items-center">
            <div className="h-[98%] w-full flex flex-col dgreen pb-4 items-center">
                <div className="flex justify-center w-[90%] overflow-hidden h-[16%]">
                    <MyCard
                        otherclass="max-h-[180px]"
                        midleclass="w-[97%] h-[96%] justify-between"
                    >
                        <div className="w-full  justify-between flex h-full">
                            <div className="w-[40%] flex rounded-tl-[26px] overflow-hidden h-full">
                                <img
                                    src="/ozahid-.jpeg"
                                    alt="image"
                                    className="object-fill h-full border-r-2 border-gray-200 w-full"
                                />
                            </div>
                            <div className="w-[58%] h-full dblue flex flex-col items-center justify-center  relative">
                                <h3 className="absolute top-2 left-1 text-cardtitle h:text-md font-bold font-audio drop-shadow-sm">
                                    Player Card
                                </h3>
                                <div className="w-[86%] mt-1 relative">
                                    <LuSettings size={18} className="absolute right-0 top-0"/>
                                    <h2 className="font-extrabold text-2xl text-palette-green drop-shadow">
                                        OZAHID-
                                    </h2>
                                    <hr className="border rounded-sm border-placeholdercolor w-[70%]" />
                                    <div className="flex dred justify-between pt-2">
                                        <ImUserPlus
                                            size={25}
                                            className="text-cardtitle"
                                        />
                                        <p className="text-lg text-gray-600">Level : 60</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MyCard>
                </div>
            </div>
        </div>
    );
}
