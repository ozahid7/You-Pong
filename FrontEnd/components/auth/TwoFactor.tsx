"use client"

import React, { useEffect, useRef, useState } from "react";
import { CustomButton, MyDialog } from "..";
import axios from "axios";

interface TwoFactorProps {
    isOpen: boolean;
    closemodal: Function;
    isEnabled: boolean;
}

const TwoFactor = ({ isOpen, closemodal, isEnabled  }: TwoFactorProps) => {

   
    const ref1 = useRef<HTMLInputElement>(null);
    const ref2 = useRef<HTMLInputElement>(null);
    const ref3 = useRef<HTMLInputElement>(null);
    const ref4 = useRef<HTMLInputElement>(null);
    const ref5 = useRef<HTMLInputElement>(null);
    const ref6 = useRef<HTMLInputElement>(null);

    const image = isEnabled ? '/mobile.svg' : '/ozahid-.jpeg'
    const msg = !isEnabled ? "Scan the Qr code above and enter the code :" : "A verfication code has been set in :";

    const [Value, setValue] = useState({
        input1: "",
        input2: "",
        input3: "",
        input4: "",
        input5: "",
        input6: ""
    });
    const [key, setKey] = useState('')
    const [IsInvalid, setIsInvalid] = useState(false)
    const [IsSubmited, setIsSubmited] = useState(false)
    const rgx = /^\d+$/
    let code = ""
    
    const handleSend = () =>{
        code = Value.input1 + Value.input2 + Value.input3 + Value.input4 + Value.input5 + Value.input6;
        !rgx.test(code) ? setIsInvalid(true) : setIsInvalid(false)
        if(code.length !== 6)
            setIsInvalid(true)
        setIsSubmited(true)
    }
    
    useEffect(() => {
        if(IsSubmited && !IsInvalid){
            const apiUrl =
                "http://localhost:4000/auth/twoFactorAuth?id=0635007f-b80e-4b54-a85a-d0d4d903e5ec";
            let adam = { newUsername: code, tfoStatus: true };

            axios
            .post(apiUrl, adam)
            .then((response: any) => {
                console.log(response.data)
            })
            .catch((error) => (console.log(error)))
        }
        setIsSubmited(false)
    }, [IsInvalid, IsSubmited])


    function FocuseOn  (name: string, value: string){

        if (name === "input1" && key !== "Backspace") 
            ref2.current?.focus();
        if (name === "input2" && key !== "Backspace") {
            ref3.current?.focus();
        }
        if (name === "input3" && key !== "Backspace") {
            ref4.current?.focus();
        }
        if (name === "input4" && key !== "Backspace") {
            ref5.current?.focus();
        }
        if (name === "input5" && key !== "Backspace") {
            ref6.current?.focus();
        }
    }

    function clearInputs () {
        if (key === "Backspace") {
            setValue({
                input1: "",
                input2: "",
                input3: "",
                input4: "",
                input5: "",
                input6: "",
            });
            ref1.current?.focus()
        }
    }

    const renderInputElements = (name: string,  val: string, re?: any) => {
        return (
            <input
                onChange={(e) => {
                    setValue({ ...Value, [e.target.name]: e.target.value });
                    FocuseOn(name, e.target.value);
                }}
                onKeyDown={(e) => {
                    setKey(e.key), clearInputs();
                }}
                onKeyUp={(e) => {
                    setKey(e.key), clearInputs();
                }}
                type="text"
                required
                ref={re}
                value={val}
                maxLength={1}
                name={name}
                placeholder="___"
                className={`outline-none border ${
                    IsInvalid ? " border-red-600 animate-shake" : " border-gray-500"
                } placeholder:text-center text-center text-lg  rounded-sm w-[30%] max-w-[50px] h-[78%] h:h-[88%] sm:h-[94%] md:h-[96%] lg:h-[100%]`}
            />
        );
    };

    return (
        <MyDialog
            isOpen={isOpen}
            closemodal={() => {
                closemodal(false);
                setValue({
                    input1: "",
                    input2: "",
                    input3: "",
                    input4: "",
                    input5: "",
                    input6: "",
                });
                setIsSubmited(false);
                setIsInvalid(false);
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
                        src={image}
                        alt="logo"
                        className="h-20 h:h-24 sm:h-28 md:h-32 lg:h-36"
                    />
                    <span className="text-[10px] sm:text-[15px] text-gray-600 h:text-[13px] text-center md:text-[16px] lg:text-[18px]">
                        {msg}
                    </span>
                    <h3 className="font-bold text-sm md:text-[16px] text-palette-green">
                        Google Authenticator
                    </h3>
                    <div
                        onFocus={() => {
                            setIsInvalid(false);
                            setIsSubmited(false);
                        }}
                        className="w-[98%] h-[70px] md:mt-2 flex justify-between max-w-[360px]"
                    >
                        <div className="w-[48%] sm:w-[44%] flex justify-between">
                            {renderInputElements("input1", Value.input1, ref1)}
                            {renderInputElements("input2", Value.input2, ref2)}
                            {renderInputElements("input3", Value.input3, ref3)}
                        </div>
                        <div className="w-[48%] sm:w-[44%] justify-between flex">
                            {renderInputElements("input4", Value.input4, ref4)}
                            {renderInputElements("input5", Value.input5, ref5)}
                            {renderInputElements("input6", Value.input6, ref6)}
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
                            handleclick={handleSend}
                        />
                    </div>
                    <span className="sm:text-lg mt-2 text-[14px] lg:text-xl text-gray-500">
                        Didn't Validate?{" "}
                        <span className="text-blue-500 text-[14px] sm:text-lg cursor-pointer lg:text-xl">
                            Try Again
                        </span>{" "}
                    </span>
                </section>
            </div>
        </MyDialog>
    );
};

export default TwoFactor;
