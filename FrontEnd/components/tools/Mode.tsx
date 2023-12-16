"use client";
import { color } from "framer-motion";
import React, { useState } from "react";

interface Props {
    text: string;
    handelClick: any;
}

const modeArr: Props[] = [
    {
        text: "Easy",
        handelClick: Function,
    },
    {
        text: "Hard",
        handelClick: Function,
    },
];

export function Mode({ text, handelClick }: Props) {
    const [selectedMode, setSelectedMode] = useState("Easy");

    return (
        <>
            {modeArr.map((elm, index) => (
                <div
                    key={index}
                    onClick={() => {
                        handelClick(elm.text);
                        setSelectedMode(elm.text);
                    }}
                    className={`flex ${
                        selectedMode === elm.text
                            ? "bg-palette-orange border-none scale-105"
                            : ""
                    }  w-[30%] cursor-pointer  max-w-[200px] md:w-[40%] h-fit border-[2px] sm:min-h-[50px] min-h-[40px] border-palette-green rounded-sm justify-evenly items-center`}
                >
                    <span
                        className={`font-['Chakra_Petch'] ${
                            selectedMode === elm.text
                                ? "text-white"
                                : "text-[#497174]"
                        }   font-[700] text-[100%] s:text-[150%] md:text-[250%] xl:text-[300%]`}
                    >
                        {elm.text}
                    </span>
                </div>
            ))}
        </>
    );
}

export default Mode;
