"use client";
import { CustomButtonProps } from "@/types";
import { twMerge } from "tailwind-merge";
import React from "react";

const CustomButton = ({
    color,
    text,
    otherclass,
    styleclass,
    handleclick,
    btnType,
}: CustomButtonProps) => {
    const customclass = twMerge(
        (color === "orange"
            ? "orange_button"
            : color === "green"
            ? "green_button"
            : color === "transparent"
            ? "transparent_button"
            : "signin_button") +
            " max-w-[400px]  w-[100%] min-w-[120px] max-h-[55px] p-[2px] sm:p-[3px]  sm:max-h-[70px]  min-h-[40px] h-[100%] flex justify-center items-center",
        otherclass
    );
            
    return (
        <button
            type={btnType}
            onClick={handleclick}
            onSubmit={handleclick}
            className= {`${customclass}`}
        >
            <div
                className={` ${styleclass} center h-full w-full  flex justify-center items-center overflow-hidden`}
            >
                <span className="text-white drop-shadow-lg font-bold font-body fold:text-md h:text-xl sm:text-2xl md:text-3xl lg:text-4xl ">
                    {text}
                </span>
            </div>
        </button>
    );
};

export default CustomButton;
