"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CustomButton, MyContainer } from "@/components";

const NotFound = () => {

    const router = useRouter();
    const handelclick = () => {
        router.push("/");
    }

    return (
        <div className="h-full w-full make_center">
            <div className="h-[55%] max-w-[800px] w-[55%]">
                <MyContainer>
                    <div className="h-full w-full  flex flex-col justify-center items-center pt-8">
                        <span className="text-4xl lg:text-8xl md:text-6xl font-body text-palette-green drop-shadow-md font-extrabold">
                            OOPS !!!
                        </span>
                        <span className="text-5xl md:text-6xl lg:text-9xl font-body text-palette-orange drop-shadow-xl font-extrabold">
                            404
                        </span>
                        <span className="text-lg md:text-2xl text-gray-500 text-center text">
                            This page could not be found
                        </span>
                        <div className="w-[70%] lg:w-full h-[30%] mt-8 make_center">

                        <CustomButton
                            color='orange'
                            text='Go Back Home'
                            handleclick={handelclick}
                            />
                        </div>
                    </div>
                </MyContainer>
            </div>
        </div>
    );
};

export default NotFound;
