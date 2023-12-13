import { color } from "framer-motion";
import React from "react";

interface Props {
    text: string;
    handelClick: any;
}

export function Mode({ text, handelClick }: Props) {
    let text1;
    if (text == "Easy" || text == "Hard")
        text1 = text.replace(text[0], text[0] + 0);
    return (
        <div
            onClick={handelClick}
            className="flex  w-[45%]  max-w-[260px] md:w-[40%] h-fit border-[2px] min-h-[50px] border-palette-green rounded-sm justify-evenly items-center"
        >
            <label
                htmlFor={text1}
                className="font-['Chakra_Petch'] text-[#497174] font-[700] text-[100%] s:text-[150%] md:text-[250%] xl:text-[300%]"
            >
                {text}
            </label>
            <input
                checked
                type="radio"
                name="difficulty"
                id={text1}
                className="border-2 rounded-sm border-palette-green bg-transparent cursor-pointer checkbox  checkbox-success xxs:w-[20px] xxs:h-[20px]"
            />
        </div>
    );
}

export default Mode;
