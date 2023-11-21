"use client";
import { CustomButton, MyDialog, MyInput } from "@/components";
import React, { useState } from "react";

interface ProfileSettingsProps {
    isOpen: boolean;
    setIsOpen: any;
}

const ProfileSettings = ({ isOpen, setIsOpen }: ProfileSettingsProps) => {
    const [userName, setUserName] = useState("");
    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [selectedFile, setSelectedFile] = useState("/ozahid-.jpeg");
    const [confirmPass, setConfirmPass] = useState("");

    const handelFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]

        if (file){
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedFile(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    };

    return (
        <MyDialog
            isOpen={isOpen}
            closemodal={() => {
                setIsOpen(false);
                setNewPass("")
                setUserName("")
                setCurrentPass("")
                setConfirmPass("")
                setSelectedFile("/ozahid-.jpeg")
            }}
            withCorner={false}
            customClass="absolute h-[64%] w-[90%] sm:w-[66%] max-w-[700px]"
        >
            <div className="flex items-center flex-col h-full  overflow-y-auto">
                <div className="h-[34%] flex flex-col space-y-4 items-center justify-end w-full ">
                    <img
                        src={selectedFile}
                        alt="logo"
                        className="h-20 h:h-24 object-contain border-2 max-w-[220px] max-h-[220px] border-palette-green rounded-md sm:h-28 md:h-32 lg:h-36"
                    />
                    <div className="relative  w-auto flex justify-center">
                        <input
                            id="uploadphoto"
                            type="file"
                            onChange={(e) => {handelFileSelect(e)}}
                            accept="image/*"
                            className="min-h-[47px] max-w-[180px] h:max-w-[230px] outline-none   rounded-sm flex pt-[5px] border-2 border-palette-green text-cardtitle"
                        />
                        <label
                            htmlFor="uploadphoto"
                            className="font-body absolute cursor-pointer text-[14px] flex justify-center items-center w-[105px] min-h-[47px] left-0 bottom-0 bg-palette-green text-md border-l-2 border-y-2 border-palette-grey  italic font-semibold text-white"
                        >
                            Upload File
                        </label>
                    </div>
                </div>
                <div className="flex flex-grow  w-full items-center flex-col space-y-4 justify-evenly">
                    <div className="h-[70%] min-h-[300px]  flex flex-col items-center justify-around w-full">
                        <div className="w-full h:w-[90%] md:w-[80%] space-y-1  h-1 min-h-[86px] flex flex-col justify-end">
                            <span className="font-body text-cardtitle font-semibold lg:text-lg">
                                User Name
                            </span>
                            <MyInput
                                setInput={setUserName}
                                type="text"
                                customclass="min-h-[40px] sm:min-h-[52px] min-w-full"
                                text="ozahid-"
                            />
                        </div>
                        <div className="w-full h:w-[90%] md:w-[80%] space-y-1  h-1 min-h-[86px] flex flex-col justify-end">
                            <span className="font-body text-cardtitle font-semibold lg:text-lg">
                                Current Password
                            </span>
                            <MyInput
                                setInput={setCurrentPass}
                                isPassword={true}
                                type="password"
                                customclass="min-h-[40px]  sm:min-h-[52px] min-w-full"
                                text="●●●●●●●●●●●●"
                            />
                        </div>
                        <div className="w-full h:w-[90%] md:w-[80%] space-x-2  h-1 min-h-[86px] flex justify-end">
                            <div className="w-[50%] space-y-1   h-1 min-h-[86px] flex flex-col justify-end">
                                <span className="font-body text-cardtitle font-semibold text-sm lg:text-lg">
                                    New Password
                                </span>
                                <MyInput
                                    setInput={setNewPass}
                                    isPassword={true}
                                    type="password"
                                    customclass="min-h-[40px] sm:min-h-[52px] min-w-full"
                                    text="●●●●●●●●●●●●"
                                />
                            </div>
                            <div className="w-[50%] space-y-1  h-1 min-h-[86px] flex flex-col justify-end">
                                <span className="font-body text-cardtitle text-sm font-semibold lg:text-lg">
                                    Confirm Password
                                </span>
                                <MyInput
                                    setInput={setConfirmPass}
                                    isPassword={true}
                                    type="password"
                                    customclass="min-h-[40px] sm:min-h-[52px] min-w-full"
                                    text="●●●●●●●●●●●●"
                                />
                            </div>
                        </div>
                    </div>
                    <form method="post" action='' className="min-h-[40px] sm:min-h-[56px] md:min-h-[62px] flex justify-center  items-center w-full">
                        <CustomButton
                            text="Update"
                            color="orange"
                            otherclass="max-w-[300px] w-[60%] min-h-[50px]"
                        />
                    </form>
                </div>
            </div>
        </MyDialog>
    );
};
export default ProfileSettings;
