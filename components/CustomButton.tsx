import { CustomButtonProps } from "@/types";
import React from "react";

const CustomButton = ({ color, text, handleclick }: CustomButtonProps) => {

    const customclass = color === 'orange' ? 'orange_button' : 'green_button';
    
    return (
        <div className={`${customclass} max-w-[400px]  w-[60%] min-w-[120px] max-h-[55px] sm:max-h-[70px]   min-h-[45px] h-[12%] flex justify-center items-center m-auto`}>
            <div className="center  fold:w-[95%]  h-[90%] s:w-[97%] sm:w-[97%] md:w-[98%] w-[92%] xl:w-[98%] 2xl:[99%] flex justify-center items-center overflow-hidden">
                <text className="text-white drop-shadow-lg font-bold font-body fold:text-md h:text-xl sm:text-2xl md:text-3xl lg:text-4xl ">
                    {text}
                </text>
            </div>
        </div>
    );
};

export default CustomButton;
