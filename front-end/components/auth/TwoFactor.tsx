import React from "react";
import { CustomButton, MyDialog } from "..";

interface TwoFactorProps {
    isOpen: boolean;
    closemodal: Function;
}

const renderInputElements = () => {
    return (
        <input
            type="number"
            placeholder="___"
            className="outline-none border placeholder:text-center rounded-sm border-gray-500 w-[30%] max-w-[50px] h-[78%] h:h-[88%] sm:h-[94%] md:h-[96%] lg:h-[100%]"
        />
    );
};

const TwoFactor = ({ isOpen, closemodal }: TwoFactorProps) => {
    return (
        <MyDialog
            isOpen={isOpen}
            closemodal={() => {
                closemodal(false);
            }}
            withCorner={false}
            customClass="absolute sm:h-[50%] max-h-[620px] max-w-[540px] h-[40%] md:w-[70%] w-[90%] s:w-[74%] h:min-h-[560px] min-h-[500px]"
        >
            <div className="flex items-center flex-col h-full overflow-auto">
                <div className="w-full flex justify-evenly items-end ">
                    <hr className="w-[10%] border border-palette-grey rounded-sm" />
                    <h2 className="text-gray-400 mt-4 font-body text-sm h:text-md sm:text-xl lg:text-2xl font-bold ">
                        Two Factor Autentication
                    </h2>
                    <hr className="w-[10%] border border-palette-grey rounded-sm" />
                </div>

                {/* middle section */}
                <section className=" w-full h-[60%] md:h-[62%] flex flex-col justify-evenly items-center">
                    <img
                        src="mobile.svg"
                        alt="logo"
                        className="h-20 h:h-24 sm:h-28 md:h-32 lg:h-36"
                    />
                    <span className="text-[10px] sm:text-[15px] text-gray-600 h:text-[13px] text-center md:text-[16px] lg:text-[18px]">
                        A verfication code has been sent to this mobile number:
                    </span>
                    <h3 className="font-bold text-sm md:text-[16px] text-palette-green">
                        +212 65*****71
                    </h3>
                    <div className="w-[98%] h-[70px] md:mt-2 flex justify-between max-w-[360px]">
                        <div className="w-[48%] flex justify-between">
                            {renderInputElements()}
                            {renderInputElements()}
                            {renderInputElements()}
                        </div>
                        <div className="w-[48%] flex justify-between">
                            {renderInputElements()}
                            {renderInputElements()}
                            {renderInputElements()}
                        </div>
                    </div>
                    <span className="text-gray-500 font-extralight text-[10px] h:text-[14px] tracking-[2px]">
                        Enter the code
                    </span>
                </section>
                <section className="h-[30%] flex flex-col justify-around items-center w-full">
                    <div className="min-h-[40px] sm:min-h-[56px] md:min-h-[62px] flex justify-center  items-center w-full">
                        <CustomButton
                            text="Send"
                            color="orange"
                            otherclass="max-w-[280px] w-[60%]"
                        />
                    </div>
                    <span className="sm:text-lg mt-2 text-[14px] lg:text-xl text-gray-500">
                        Didn't receive a code?{" "}
                        <span className="text-blue-500 text-[14px] sm:text-lg cursor-pointer lg:text-xl">
                            Resend
                        </span>{" "}
                    </span>
                </section>
            </div>
        </MyDialog>
    );
};

export default TwoFactor;
