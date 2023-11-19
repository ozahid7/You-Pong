import { CustomButton, MyCard } from "@/components";
import React from "react";

const NewGame = () => {
    return (
        <div className="flex justify-center w-full  h:w-[94%] overflow-hidden min-h-[110px] h:min-h-[140px] lg:min-h-[180px] h:max-h-[160px] md:max-h-[200px]  md:h-[24%] h:h-[20%]">
            <MyCard otherclass="">
                <div className="w-full relative px-2 h:px-4 sm:px-6  justify-between flex items-end h-full">
                    <h3 className=" whitespace-nowrap text-cardtitle absolute text-[12px] top-2 left-2 h:left-6 sm:left-8 md:top-4 md:left-8 h:text-lg md:text-xl font-bold font-audio drop-shadow-sm">
                        New Game
                    </h3>
                    <div className="h-[80%] w-full flex justify-center items-center">
                        <CustomButton
                            color="green"
                            text="New Game"
                            otherclass="min-w-[100px] max-w-[200px] sm:max-w-[360px]"
                        />
                    </div>
                </div>
            </MyCard>
        </div>
    );
};

export default NewGame;
