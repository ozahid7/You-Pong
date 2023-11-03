import React from "react";

const MyInput = (props: {text: string, customclass?: string, inputclass?: string}) => {
    return (
        <div
            className={` ${props.customclass} my_input max-w-[400px] w-full min-w-[120px] max-h-[50px] sm:max-h-[60px]  min-h-[45px] h-[12%] flex justify-center items-center`}
        >
            <input
                type="text"
                placeholder={props.text}
                className={`${props.inputclass} center placeholder-placeholdercolor placeholder:font-body sm:placeholder:text-xl text-gray-500 pl-5 pr-2 outline-none  fold:w-[97%]  h-[86%] s:w-[98%] sm:w-[97%] md:w-[98%] w-[96%] xl:w-[98%] 2xl:[99%] flex justify-center items-center overflow-hidden`}
            />
        </div>
    );
};

export default MyInput;