import { MyCard } from "@/components";
import React from "react";

const OverviewCard = () => {
    return (
        <div className="flex justify-center w-[90%] overflow-hidden h-[16%] md:h-[24%] h:h-[20%]">
            <MyCard>
                <div className="w-full relative  justify-between flex items-end h-full">
                    <h3 className=" whitespace-nowrap text-cardtitle absolute text-[12px] top-2 left-2 h:left-6 sm:left-8 md:top-4 md:left-8 h:text-lg md:text-2xl font-bold font-audio drop-shadow-sm">
                        Overview
                    </h3>
                    <div className="h-[84%] w-full dred"></div>
                </div>
            </MyCard>
        </div>
    );
};

export default OverviewCard;
