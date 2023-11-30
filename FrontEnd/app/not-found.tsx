"use client";

import React from "react";

import { CustomButton, MyContainer } from "@/components";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="h-full w-full make_center">
            <div className="h-[30%] lg:h-[55%]  max-w-[800px] w-[55%]">
                <MyContainer>
                    <div className="h-full w-full flex flex-col justify-center items-center pt-2 h:pt-8">
                        <span className="text-xl h:text-4xl lg:text-8xl md:text-6xl font-body text-palette-green drop-shadow-md font-extrabold">
                            OOPS !!!
                        </span>
                        <span className="text-xl hd:text-4xl md:text-6xl lg:text-9xl font-body text-palette-orange drop-shadow-xl font-extrabold">
                            404
                        </span>
                        <span className="text-xs md:text-2xl text-gray-500 text-center text">
                            This page could not be found
                        </span>
                        <div className="w-[70%] lg:w-full h-[30%] pt-2  h:mt-8 make_center">
                            <Link
                                href="/hero/dashboard"
                                className="w-full min flex justify-center h-[45px] sm:h-[80px]"
                            >
                                <CustomButton
                                    color="orange"
                                    text="Go Back Home"
                                />
                            </Link>
                        </div>
                    </div>
                </MyContainer>
            </div>
        </div>
    );
};

export default NotFound;
