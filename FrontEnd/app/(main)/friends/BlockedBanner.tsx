"use client";
import { MyDropdown } from "@/components";
import MyToggle from "@/components/tools/MyToggle";
import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAxios } from "@/utils";
import { friendsEndPoint } from "@/types/Api";
import MiniLoader from "@/components/tools/MiniLoader";
import { menuUserElements } from "@/const";

const BlockedBanner = (props: {
    zindex?: number;
    image: any;
    userName: string;
    status: string;
    SetInvalidData: any;
}) => {
    const [enabled, setEnabled] = useState(true);

    const unblockUser = async () => {
        try {
            const response = await useAxios(
                "put",
                friendsEndPoint.unblock + "?username=" + props.userName
            );
            props.SetInvalidData(true);
            console.log("unblock response... = ", response);
        } catch (error) {
            console.log("unblock error : ", error);
        }
    };

    const unblockMutaion = useMutation({
        mutationFn: unblockUser,
    });

    if (unblockMutaion.isPending) return <MiniLoader customClass="m-auto" />;
    else
        return (
            <div
                className={`h-full w-full min-h-[70px] shadow-lg bg-palette-white rounded-sm flex justify-around items-center`}
            >
                <div className="h-full items-center space-x-2 md:space-x-4 flex">
                    <MyDropdown
                        icon=""
                        image={props.image}
                        placement="left-0"
                        user={props.userName}
                        setDataInvalid={props.SetInvalidData}
                    />
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
                        otherclass="h-[38px] flex min-w-[120px]"
                        handelCheck={() => {
                            unblockMutaion.mutate();
                        }}
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
