import React from "react";
import { MyDialog } from "..";

interface TwoFactorProps {
    isOpen: boolean;
    closemodal: Function;
}

const TwoFactor = ({ isOpen, closemodal }: TwoFactorProps) => {
    return (
        <MyDialog
            isOpen={isOpen}
            closemodal={() => {
                closemodal(false);
            }}
            withCorner={false}
            customClass="absolute sm:h-[50%] max-h-[620px] max-w-[540px] h-[40%] md:w-[50%] w-[90%] s:w-[70%] h:min-h-[560px] min-h-[500px]"
        >
            <div className="flex items-center flex-col h-full overflow-auto">
                <div className="w-full flex justify-evenly items-end ">
                    <hr className="w-[10%] border border-palette-grey rounded-sm" />
                    <h2 className="text-gray-400 mt-4 font-body text-sm sm:text-xl lg:text-2xl font-bold ">
                        Two Factor Autentication
                    </h2>
                    <hr className="w-[10%] border border-palette-grey rounded-sm" />
                </div>

                {/* middle section */}
                <section className="dred w-full h-[60%] flex flex-col items-center">
                    <img src="mobile.svg" alt="logo" className="h-20 dred" />
                    <span className="text-[7px] text-gray-600">
                        A verfication code has been sent to this mobile number:
                    </span>
                    <h3 className="font-bold text-sm text-palette-green">+212 65*****71</h3>
                    <div className="w-[70%] h-auto dgreen">
                    
                    </div>

                </section>
            </div>
        </MyDialog>
    );
};

export default TwoFactor;
