'use client'
import React, { useEffect } from "react";
import { useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";

interface MyInputProps {
    text: string;
    customclass?: string;
    inputclass?: string;
    type: string;
    isPassword?: boolean;
    setInput: Function;
    isValid?: boolean
}

const MyInput = ({ text, customclass, inputclass, type, isPassword, setInput, isValid }: MyInputProps) => {
    let [Icon, setIcon] = useState(false);



    const hideIcon = () => {
        setIcon(Icon = !Icon)
    };

    if (isPassword){
        type =  Icon ? 'text' : 'password';
        
    }

    return (
        <>
        <div
            className={` ${customclass} my_input max-w-[400px] overflow-hidden relative w-full min-w-[120px] max-h-[50px] sm:max-h-[60px]  min-h-[45px] h-[12%] flex justify-center items-center`}
            >
            <input
                onChange={(e) => setInput(e.target.value)}
                type={type}
                placeholder={text}
                className={` ${isPassword ? "pr-12" : "pr-2"} center placeholder-placeholdercolor placeholder:text-sm placeholder:font-body sm:placeholder:text-md text-gray-500 pl-5 outline-none  fold:w-[97%]  h-[86%] s:w-[98%] sm:w-[97%] md:w-[98%] w-[96%] xl:w-[98%] 2xl:[99%] flex justify-center items-center overflow-hidden`}
                />
            {isPassword &&
                (Icon ? (
                    <BiShowAlt
                    onClick={hideIcon}
                    size={20}
                    className="absolute text-placeholdercolor cursor-pointer right-5 color"
                    />
                    ) : (
                        <BiHide
                        onClick={hideIcon}
                        size={20}
                        className="absolute  text-placeholdercolor cursor-pointer right-5 color"
                        />
                        ))}
                </div>
                {isValid && <span className="text-red-600">Invalid Input</span>}
                </>
    );
};

export default MyInput;
