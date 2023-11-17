"use client";
import React from "react";
import Image from "next/image";
import { LuUnlock, LuLock } from "react-icons/lu";
import { AnimatedText } from "..";
import { AcheivementProps } from "@/types";
import { twMerge } from "tailwind-merge";

const Acheivement = ({
    isOpened,
    text,
    classname,
    description,
}: AcheivementProps) => {
    const customClass = twMerge(
        "overflow-hidden dred",
        classname
    );

    return (
        <>
            <div
                data-tooltip-id="my-tooltip"
                data-tooltip-content={description}
                className="dred w-[60%] aspect-1"
            >


                <section className="w-full h-full  overflow-hidden make_center bg-palette-green rounded-t-md relative">
                    <div className="h-auto  w-auto absolute top-0 h:top-2 right-2 md:top-3 md:right-3">
                        <LuUnlock
                            size={25}
                            className={`${
                                isOpened
                                    ? "w-2 xs:w-3 h:w-6 sm:w-10 text-white"
                                    : "hidden"
                            }`}
                        />
                    </div>
                    <div
                        className={`${
                            isOpened
                                ? "hidden"
                                : "h-full w-full make_center backdrop-blur-[5px] overflow-hidden rounded-md  z-10"
                        }`}
                    >
                        <LuLock
                            size={100}
                            className=" text-white w-10 sm:w-20 drop-shadow-xl "
                        />
                    </div>
                    <Image
                        src="/badge.png"
                        alt="badge"
                        height={200}
                        width={200}
                        className="object-contain absolute aspect-square w-[60%]"
                    />
                </section>
                <section className="make_center w-full h-[26%] dred bg-palette-orange rounded-b-md px-1">
                    <span className="text-white font-body font-bold text-lg sm:text-2xl">
                        {text}
                    </span>
                </section>
            </div>
        </>
    );
};

export default Acheivement;
