"use client";
import { CustomButton, IntraButton, MyContainer, MyInput } from "@/components";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignUp = () => {
    return (
        <div className="h-full backdrop-blur-[6px] w-full make_center">
            <div className="flex justify-center max-w-[700px] max-h-[500px] h:max-h-[600px] sm:max-h-[800px] w-[90%] h:w-[80%] h-[70%]">
                <MyContainer>
                    <div className="flex items-center flex-col h-full sm:p-4 overflow-auto">
                        <form
                            action=""
                            className="h:w-[90%] w-full h-full flex flex-col justify-evenly items-center px-2"
                        >
                            <div className="w-full flex justify-evenly items-end ">
                                <hr className="w-[30%] border border-palette-grey rounded-sm" />
                                <h2 className="text-gray-400 drop-shadow font-body text-xl sm:text-3xl md:text-4xl font-bold ">
                                    Sign Up
                                </h2>
                                <hr className="w-[30%] border border-palette-grey rounded-sm" />
                            </div>
                            <div className="w-[80%] flex flex-col items-center justify-around h-[36%]">
                                    <MyInput text="Email" customclass="sm:min-h-[60px]" />
                                <MyInput text="Password" customclass="sm:min-h-[60px]" />
                                <MyInput text="Confirm Password" customclass="sm:min-h-[60px]" />
                            </div>
                            <Link
                                href="/dashboard"
                                className="sm:w-[70%] w-[60%] lg:w-full  sm:h-[80px] flex justify-center items-center"
                            >
                                <CustomButton text="Sign Up" color="orange" />
                            </Link>
                            <div className="w-full flex justify-evenly mt-2 items-end">
                                <hr className="w-[30%] border border-palette-grey rounded-sm" />
                                <h2 className="text-gray-400 drop-shadow font-body text-xl sm:text-3xl md:text-4xl font-bold ">
                                    OR
                                </h2>
                                <hr className="w-[30%] border border-palette-grey rounded-sm" />
                            </div>
                            <Link
                                href="/dashboard"
                                className="sm:w-[70%] w-[60%] lg:w-full  sm:h-[80px] flex justify-center items-center"
                            >
                                <IntraButton type="login" />
                            </Link>
                        </form>
                    </div>
                </MyContainer>
            </div>
        </div>
    );
};

export default SignUp;
