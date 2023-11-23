"use client";
import { MyContainer, TwoFactor } from "@/components";
import MyToggle from "@/components/tools/MyToggle";
import React, { useState } from "react";
import { LuSettings } from "react-icons/lu";
import { TbUserSquare } from "react-icons/tb";
import ProfileSettings from "./ProfileSettings";

const page = () => {
    const [showTwoFactor, setTwoFactor] = useState(false);
    const [showProfileSetting, setShowProfileSetting] = useState(false);
        const [enabled, setEnabled] = useState(false);


    return (
        <div className="h-full min-h-[600px] w-full make_center">
            <div className="flex justify-center w-[70%] max-w-[800px] min-w-[260px] min-h-[600px] h-[70%]">
                <MyContainer>
                    <div className=" flex flex-col items-center h-[100%] overflow-y-auto">
                        <div className="h-[40%] w-full flex flex-col space-y-2 justify-center items-center">
                            <div className="w-[30%] max-w-[200px] aspect-1  flex justify-center items-center bg-palette-orange rounded-md">
                                <LuSettings
                                    size="140"
                                    className="text-white h-[80%] md:h-[100%]"
                                />
                            </div>
                            <span className="text-md sm:text-xl md:text-2xl xl:text-3xl font-body font-bold  text-cardtitle italic drop-shadow">
                                Settings
                            </span>
                        </div>
                        <div className="h-[60%] flex justify-center w-full">
                            <div className="w-[80%] h-[70%] pt-2 flex flex-col  bg-palette-grey drop-shadow-md items-center space-y-4 ">
                                <div
                                    onClick={() => {
                                        setShowProfileSetting(true);
                                    }}
                                    className="w-[94%] cursor-pointer flex items-center h-[30%] drop-shadow-lg justify-between px-4 bg-palette-white rounded-sm"
                                >
                                    <span className="text-md sm:text-xl md:text-2xl xl:text-3xl font-body drop-shadow-sm font-semibold text-cardtitle ">
                                        Profile
                                    </span>
                                    <TbUserSquare
                                        size="40"
                                        className="h-[30%] w-[30%] text-cardtitle h:h-auto h:w-auto"
                                    />
                                </div>
                                <div className="w-[94%] flex items-center h-[30%] drop-shadow-lg justify-between px-4 bg-palette-white rounded-sm">
                                    <span className="sm:text-md md:text-xl xl:text-3xl before:content-['2FA'] sm:before:content-['Two_Step_Verification'] font-body drop-shadow-sm font-semibold text-cardtitle "></span>

                                    <MyToggle
                                        otherclass="h-[38px]"
                                        handelCheck={() => {
                                            setTwoFactor(true);
                                        }}
                                        enabled={enabled}
                                        setIsEnabled={setEnabled}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </MyContainer>
                <TwoFactor
                    isEnabled={false}
                    isOpen={showTwoFactor}
                    closemodal={setTwoFactor}
                />
            </div>
            <ProfileSettings
                isOpen={showProfileSetting}
                setIsOpen={setShowProfileSetting}
            />
        </div>
    );
};

export default page;
