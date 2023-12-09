"use client";
import { MyDropdown } from "@/components";
import MyToggle from "@/components/tools/MyToggle";
import React, { useContext, useState } from "react";
import { LuMessageSquarePlus } from "react-icons/lu";
import { useQuery, useQueryClient } from "react-query";
import { MyContext } from "../layout";
import { useAxios } from "@/utils";
import { friendsEndPoint } from "@/types/Api";

const BlockedBanner = (props: {
    zindex?: number;
    image: any;
    userName: string;
    status: string;
}) => {
    const [enabled, setEnabled] = useState(true);
   

    return (
        <div
            className={`h-full w-full min-h-[70px] shadow-lg bg-palette-white rounded-sm flex justify-around items-center`}
        >
            <div className="h-full items-center space-x-2 md:space-x-4 flex">
                <MyDropdown icon="" image={props.image} placement="left-0" />
                <div className="flex flex-col">
                    <span
                        data-tooltip-id="username"
                        data-tooltip-content={props.userName}
                        className="font-body text-palette-green text-lg font-bold"
                    >
                        {props.userName.length > 7
                            ? props.userName.slice(0, 4) + "..."
                            : props.userName}
                    </span>
                    <span className="font-light text-cardtitle text-sm">
                        {props.status}
                    </span>
                </div>
            </div>
            <div className="flex space-x-2 md:space-x-8">
                <MyToggle
                    otherclass="h-[38px] hidden sm:flex min-w-[120px]"
                    handelCheck={() => {}}
                    string1="unblock"
                    string2="block"
                    enabled={enabled}
                    setIsEnabled={setEnabled}
                />
            </div>
        </div>
    );
};

export default BlockedBanner;
