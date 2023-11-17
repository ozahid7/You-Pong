import { CustomButton, MyCard } from "@/components";
import React from "react";

const NewGame = () => {
    return (
        <div className="flex justify-center w-[90%] overflow-hidden min-h-[110px] h:min-h-[140px] h:max-h-[160px] md:max-h-[200px]  md:h-[24%] h:h-[20%]">
            <MyCard otherclass="">
                <div className="w-full relative px-2 h:px-4 sm:px-6  justify-between flex items-end h-full">
                    <h3 className=" whitespace-nowrap text-cardtitle absolute text-[12px] top-2 left-2 h:left-6 sm:left-8 md:top-4 md:left-8 h:text-lg md:text-2xl font-bold font-audio drop-shadow-sm">
                        New Game
                    </h3>
                    <div className="h-[80%] w-full flex justify-between items-center">
                        <div className="h-full w-[48%] max-h-[45px] h:max-h-[75px] flex items-center">
                            <CustomButton
                                color="green"
                                text="RANKED"
                                otherclass="min-w-[100px]"
                            />
                        </div>
                        <div className="h-full max-h-[45px] w-[48%] h:max-h-[75px] flex items-center">
                            <CustomButton
                                color="orange"
                                text="CLASSIC"
                                otherclass="min-w-[100px]"
                            />
                        </div>
                    </div>
                </div>
            </MyCard>
        </div>
    );
};

export default NewGame;
