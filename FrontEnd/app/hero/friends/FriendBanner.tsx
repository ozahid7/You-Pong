"use client";
import { MyDropdown } from "@/components";
import MyToggle from "@/components/tools/MyToggle";
import React from "react";
import { LuMessageSquarePlus } from "react-icons/lu";

const FriendBanner = (props: { zindex?: number }) => {
    const image = (
        <img
            src="/ozahid-.jpeg"
            alt="logo"
            className="h-10  object-contain border-2 max-w-[220px] max-h-[220px] border-white  rounded-md sm:h-14 md:h-16"
        />
    );

    return (
         <div
            className={`h-full w-full min-h-[60px] bg-palette-white dred  rounded-sm  `}
        >

        <div className="dred">
            <MyDropdown icon="" image={image} />
        </div>
        </div>
    );
    return (
        <div
            className={`h-full w-full min-h-[60px] bg-palette-white dred rounded-sm drop-shadow-lg flex justify-around items-center`}
        >
            <div className="h-full items-center space-x-2 md:space-x-4 flex">
                <MyDropdown icon="" image={image} />
                <div className="flex flex-col">
                    <span className="font-body text-palette-green text-lg font-bold">
                        Ozahid-
                    </span>
                    <span className="font-light text-cardtitle text-sm">
                        Offline
                    </span>
                </div>
            </div>
            <div className="flex space-x-2 md:space-x-8">
                <LuMessageSquarePlus
                    size={35}
                    className="cursor-pointer mt-1 text-cardtitle"
                />
                <MyToggle
                    otherclass="h-[38px] hidden sm:flex min-w-[120px]"
                    handelCheck={() => {}}
                    Default="unblock"
                    enable="block"
                />
            </div>
        </div>
    );
};

export default FriendBanner;
