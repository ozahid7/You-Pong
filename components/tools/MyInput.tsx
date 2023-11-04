import React from "react";
import { useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";

interface MyInputProps {
    text: string;
    customclass?: string;
    inputclass?: strring;
    type: string;
    hideIcon: () => void;
}

const MyInput = ({
    text,
    customclass,
    inputclass,
    type,
    hideIcon,
}: MyInputProps) => {
    const [Icon, setIcon] = useState(<BiHide
            size={20}
            className="absolute text-placeholdercolor right-5 color"
        />);

    const hideicon = () => {
        if (Icon === <BiHide
            size={20}
            className="absolute text-placeholdercolor right-5 color"
        />)
        setIcon(
        <BiShowAlt
            size={20}
            className="absolute text-placeholdercolor right-5 color"/>)
    }




    return (
        <div
            onClick={() => {hideicon}}
            className={` ${customclass} my_input max-w-[400px] overflow-hidden relative w-full min-w-[120px] max-h-[50px] sm:max-h-[60px]  min-h-[45px] h-[12%] flex justify-center items-center`}
        >
            <input
                type="text"
                placeholder={text}
                className={`${inputclass} center placeholder-placeholdercolor placeholder:text-sm placeholder:font-body sm:placeholder:text-md text-gray-500 pl-5 pr-2 outline-none  fold:w-[97%]  h-[86%] s:w-[98%] sm:w-[97%] md:w-[98%] w-[96%] xl:w-[98%] 2xl:[99%] flex justify-center items-center overflow-hidden`}
            />
            {type === "password" && Icon}
        </div>
    );
};

export default MyInput;
