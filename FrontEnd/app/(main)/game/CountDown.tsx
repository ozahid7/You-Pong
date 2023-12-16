"use client";
import { MyDialog } from "@/components";
import Countdown from "react-countdown";

import React, { useEffect, useState } from "react";
import { render } from "react-dom";

const MyCountDown = (props: { isOpen: boolean; setIsOpen: any}) => {
    let [counter, setCounter] = useState(3)
    useEffect(() => {
        if (props.isOpen) {
            const time = setInterval(() => {
                if (counter >= 0) {
                    setCounter(counter--);
                }
            }, 1000);

            setTimeout(() => {
              props.setIsOpen(false)
            }, 5000)
            return () => clearInterval(time)
        }
    }, [props.isOpen]);

    return (
        <MyDialog
            isOpen={props.isOpen}
            closemodal={() => {}}
            withCorner={true}
            withClose={true}
            customClass="absolute h-[50%] md:h-[60%] min-h-[600px] lg-h-[64%] w-[80%] max-w-[1100px]"
            conClass=" rounded-md bg- border-palette-white "
        >
            <div className="flex items-center justify-center flex-col h-full">
                <span className=" font-body font-extrabold drop-shadow-lg text-palette-white text-[100px]   sm:text-[200px]">
                    <span >{counter}</span>
                </span>
            </div>
        </MyDialog>
    );
};

export default MyCountDown;
