"use client";
import {
    CustomButton,
    IntraButton,
    MyContainer,
    MyDialog,
    MyInput,
} from "@/components";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignUp = (props: { isOpen: boolean; closemodal: () => void }) => {
    return (
        <MyDialog
            isOpen={props.isOpen}
            closemodal={props.closemodal}
            isActive={false}
            customClass="absolute sm:h-[50%] max-h-[700px] max-w-[540px] h-[40%] md:w-[50%] w-[90%] s:w-[70%] h:min-h-[500px] min-h-[440px]"
        >
            <div className="flex items-center flex-col h-full overflow-auto">
                <div className="w-full flex justify-evenly items-end ">
                    <hr className="w-[30%] border border-palette-grey rounded-sm" />
                    <h2 className="text-gray-400 drop-shadow font-body text-xl sm:text-2xl md:text-3xl font-bold ">
                        Sign Up
                    </h2>
                    <hr className="w-[30%] border border-palette-grey rounded-sm" />
                </div>
                <form
                    action=""
                    className="h:w-[90%] w-full h-full flex flex-col justify-evenly items-center px-2"
                >
                    <div className="w-[80%] flex flex-col items-center justify-around h-[44%]">
                        <MyInput text="Email" customclass="sm:min-h-[50px]" />
                        <MyInput
                            text="Password"
                            customclass="sm:min-h-[50px]"
                        />
                        <MyInput
                            text="Confirm Password"
                            customclass="sm:min-h-[50px]"
                        />
                    </div>
                    <Link
                        href="/dashboard"
                        className="md:w-[70%] w-[80%] xl:w-full  sm:h-[60px] flex justify-center items-center"
                    >
                        <CustomButton
                            text="Sign Up"
                            color="orange"
                            otherclass="max-w-[340px]"
                        />
                    </Link>
                    <div className="w-full flex justify-evenly items-end">
                        <hr className="w-[30%] border border-palette-grey rounded-sm" />
                        <h2 className="text-gray-400 drop-shadow font-body text-xl sm:text-2xl md:text-3xl font-bold ">
                            OR
                        </h2>
                        <hr className="w-[30%] border border-palette-grey rounded-sm" />
                    </div>
                    <Link
                        href="/dashboard"
                        className="md:w-[70%] w-[80%] xl:w-full max-w-[340px]  sm:h-[60px] mt-2 flex justify-center items-center"
                    >
                        <IntraButton type="login" />
                    </Link>
                </form>
            </div>
        </MyDialog>
    );
};

export default SignUp;
