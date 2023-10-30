import { CustomButtonProps } from "@/types";
import React from "react";

const CustomButton = ({ color, text, handleclick }: CustomButtonProps) => {

    const customclass = color === 'orange' ? 'orange_button' : 'green_button';
    
    return (
        <button onClick={handleclick} className={`${customclass} max-w-[400px]  w-[100%] min-w-[120px] max-h-[55px] sm:max-h-[70px]   min-h-[45px] h-[100%] flex justify-center items-center`}>
            <div className="center  fold:w-[95%]  h-[90%] s:w-[97%] sm:w-[97%] md:w-[98%] w-[92%] xl:w-[98%] 2xl:[99%] flex justify-center items-center overflow-hidden">
                <text className="text-white drop-shadow-lg font-bold font-body fold:text-md h:text-xl sm:text-2xl md:text-3xl lg:text-4xl ">
                    {text}
                </text>
            </div>
        </button>
    );
};

export default CustomButton;
