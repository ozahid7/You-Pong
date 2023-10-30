import React from "react";

const CustomInput = () => {
    return (
        <div className="my_input max-w-[400px] w-[60%] min-w-[120px] max-h-[50px] sm:max-h-[60px]  min-h-[45px] h-[12%] flex justify-center items-center mt-10 m-auto ">
            <input
                type="text"
                placeholder="Email"
                className="center placeholder-gray-600 pl-5 outline-none  fold:w-[95%]  h-[86%] s:w-[96%] sm:w-[97%] md:w-[98%] w-[92%] xl:w-[98%] 2xl:[99%] flex justify-center items-center overflow-hidden"
            />
        </div>
    );
};

export default CustomInput;
