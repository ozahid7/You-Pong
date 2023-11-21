"use client";
import { MyDialog, MyInput } from "@/components";
import React, { useState } from "react";

interface ProfileSettingsProps {
    isOpen: boolean;
    setIsOpen: any;
}

const ProfileSettings = ({ isOpen, setIsOpen }: ProfileSettingsProps) => {
    const [userName, setUserName] = useState("");
    return (
        <MyDialog
            isOpen={isOpen}
            closemodal={() => {
                setIsOpen(false);
            }}
            withCorner={false}
            customClass="absolute h-[70%] w-[90%] sm:w-[70%] max-w-[700px]"
        >
            <div className="flex items-center flex-col h-full dred overflow-y-auto">
                <div className="h-[40%] flex flex-col space-y-4 items-center justify-end w-full dred">
                    <img
                        src="/ozahid-.jpeg"
                        alt="logo"
                        className="h-20 h:h-24 object-contain border-2 border-palette-green rounded-md sm:h-28 md:h-32 lg:h-36"
                    />
                    <div className="relative dred w-full flex justify-center">
                        <input
                            id="uploadphoto"
                            type="file"
                            accept="image/*"
                            className="min-h-[47px] max-w-[220px] h:max-w-none rounded-sm pt-1 border-2 border-palette-green text-cardtitle"
                        />
                        <label
                            htmlFor="uploadphoto"
                            className="font-body absolute cursor-pointer min-h-[47px] -left-2 xs:left-4 h:-left-6 h:left-0  bottom-0 bg-palette-green text-md border-2 rounded-sm p-2 border-palette-grey h:text-lg md:text-xl italic font-semibold text-white"
                        >
                            Choose File :
                        </label>
                    </div>
                </div>
                <div className="flex flex-grow dblue w-full items-center flex-col space-y-4 justify-center">
                    <div className="w-full h:w-[90%] md:w-[80%] space-y-1 dred h-1 min-h-[86px] flex flex-col justify-end">
                        <span className="font-body text-cardtitle font-semibold lg:text-lg">
                            User Name
                        </span>
                        <MyInput
                            setInput={setUserName}
                            type="text"
                            customclass="min-h-[52px] min-w-full"
                            text="ozahid-"
                        />
                    </div>
                    <div className="w-full h:w-[90%] md:w-[80%] space-y-1 dred h-1 min-h-[86px] flex flex-col justify-end">
                        <span className="font-body text-cardtitle font-semibold lg:text-lg">
                            Current Password
                        </span>
                        <MyInput
                            setInput={setUserName}
                            isPassword={true}
                            type="password"
                            customclass="min-h-[52px] min-w-full"
                            text="●●●●●●●●●●●●"
                        />
                    </div>
                    <div className="w-full h:w-[90%] md:w-[80%] space-x-2 dred h-1 min-h-[86px] flex justify-end">
                        <div className="w-[50%] space-y-1  dred h-1 min-h-[86px] flex flex-col justify-end">
                            <span className="font-body text-cardtitle font-semibold text-sm lg:text-lg">
                                New Password
                            </span>
                            <MyInput
                                setInput={setUserName}
                                isPassword={true}
                                type="password"
                                customclass="min-h-[52px] min-w-full"
                                text="●●●●●●●●●●●●"
                            />
                        </div>
                        <div className="w-[50%] space-y-1 dred h-1 min-h-[86px] flex flex-col justify-end">
                            <span className="font-body text-cardtitle text-sm font-semibold lg:text-lg">
                                Confirm New Password
                            </span>
                            <MyInput
                                setInput={setUserName}
                                isPassword={true}
                                type="password"
                                customclass="min-h-[52px] min-w-full"
                                text="●●●●●●●●●●●●"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MyDialog>
    );
};
export default ProfileSettings;
