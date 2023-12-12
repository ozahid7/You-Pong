"use client";
import { CustomButton, MyDialog, MyInput } from "@/components";
import { LuUpload } from "react-icons/lu";

import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../layout";
import { baseURL, useAxios } from "@/utils";
import { endPoints } from "@/types/Api";
import axios from "axios";
import { setFile } from "../chat/data/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MiniLoader from "@/components/tools/MiniLoader";

interface ProfileSettingsProps {
    isOpen: boolean;
    setIsOpen: any;
}

const ProfileSettings = ({ isOpen, setIsOpen }: ProfileSettingsProps) => {
    const user = useContext(MyContext);
    const { username, avatar, isIntra } = user.userData;
    const userQuery = useQuery({queryKey: ['user']});
    const queryClient = useQueryClient();

    const [userName, setUserName] = useState("");
    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [selectedFile, setSelectedFile] = useState(avatar);
    const [file, setfile] = useState<any>();
    const [confirmPass, setConfirmPass] = useState("");
    const [submit, setSubmit] = useState(false);
    const [invalidUser, setInvalidUser] = useState(false);
    const [invalidNewPass, setInvalidNewPass] = useState(false);
    const [invalidCurrentPass, setInvalidCurrentPass] = useState(false);
    let photo = null;
    
    const handelFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedFile(e.target?.result as string);
            };
            reader.readAsDataURL(file);
            setfile(file);
        }
    };

    const UpdateInfos = async () => {
        console.log(selectedFile, avatar);
        if (selectedFile != avatar) photo = await setFile(file);
        const toSend = {
            userName: userName,
            currentPassword: currentPass,
            newPassword: newPass,
            confirmPassword: confirmPass,
            avatar: photo,
        };
        if (
            userName.length === 0 &&
            newPass.length === 0 &&
            confirmPass.length === 0 &&
            photo === null
        )
            isItEmpty();
        else {
            try {
                const res = await useAxios(
                    "post",
                    endPoints.updateInfo,
                    toSend
                );
                queryClient.invalidateQueries({queryKey: ['user']});
            } catch (error) {
                console.log("error = ", error);
            }
        }
    };

    useEffect(() => {
        if (submit && !invalidNewPass && !invalidUser && !invalidCurrentPass) {
            console.log(
                submit,
                invalidCurrentPass,
                invalidNewPass,
                invalidUser
            );
            UpdateInfos();
        }
        setSubmit(false);
    }, [submit, invalidUser, invalidCurrentPass, invalidNewPass]);

    const handelSubmit = (e: any) => {
        e.preventDefault();
        userName.length < 6 && userName.length > 0
            ? setInvalidUser(true)
            : setInvalidUser(false);
        newPass !== confirmPass || (newPass.length < 8 && newPass.length > 0)
            ? setInvalidNewPass(true)
            : setInvalidNewPass(false);
        currentPass.length < 8 && !isIntra
            ? setInvalidCurrentPass(true)
            : setInvalidCurrentPass(false);
        setSubmit(true);
    };

    const isItEmpty = () => {
        setInvalidNewPass(true);
        setInvalidUser(true);
    };

    const setToDefault = () => {
        setInvalidCurrentPass(false);
        setInvalidNewPass(false);
        setInvalidUser(false);
    };

    return (
        <MyDialog
            isOpen={isOpen}
            closemodal={() => {
                setIsOpen(false);
                setNewPass("");
                setUserName("");
                setSubmit(false);
                setCurrentPass("");
                setConfirmPass("");
                setSelectedFile(avatar);
                setToDefault();
            }}
            withCorner={false}
            customClass="absolute h-[64%] w-[90%] sm:w-[66%] max-w-[700px]"
        >
            <form
                action=""
                className="flex items-center flex-col h-full  overflow-y-auto"
                onSubmit={handelSubmit}
            >
                <div className="h-[34%] flex flex-col space-y-4 items-center justify-end w-full ">
                    <img
                        src={selectedFile}
                        alt="logo"
                        className="h-20 h:h-24 object-cover border-2 max-w-[180px] max-h-[180px] border-palette-green rounded-md sm:h-28 md:h-32 lg:h-36"
                    />
                    <div className="relative  w-auto flex justify-center">
                        <input
                            id="uploadphoto"
                            type="file"
                            onChange={(e) => {
                                handelFileSelect(e);
                            }}
                            accept="image/*"
                            className="min-h-[47px] max-w-[140px] md:max-w-[180px] outline-none  rounded-lg flex pt-[5px] border-2 border-palette-green text-cardtitle"
                        />
                        <label
                            htmlFor="uploadphoto"
                            className="font-body absolute space-x-3 cursor-pointer rounded-md text-[14px] flex justify-center items-center w-full h-full left-0 bottom-0 bg-palette-green text-md border-2 drop-shadow-md border-palette-grey  italic font-semibold text-white"
                        >
                            <span className="text-md lg:text-lg">
                                Upload File
                            </span>
                            <LuUpload size={16} />
                        </label>
                    </div>
                </div>
                <div
                    onFocus={setToDefault}
                    className="flex flex-grow  w-full items-center flex-col space-y-4 justify-evenly"
                >
                    <div className="h-[70%] min-h-[300px]  flex flex-col items-center justify-around w-full">
                        <div className="w-full h:w-[90%] md:w-[80%] space-y-1  h-1 min-h-[86px] flex flex-col justify-end">
                            <span className="font-body text-cardtitle font-semibold lg:text-lg">
                                User Name
                            </span>
                            <MyInput
                                setInput={setUserName}
                                isValid={invalidUser}
                                type="text"
                                message="Enter at least 6 characters"
                                customclass="min-h-[40px] sm:min-h-[52px] min-w-full"
                                text={username}
                            />
                        </div>
                        <div className="w-full h:w-[90%] md:w-[80%] space-y-1  h-1 min-h-[86px] flex flex-col justify-end">
                            <span className="font-body text-cardtitle font-semibold lg:text-lg">
                                Current Passowrd
                            </span>
                            <MyInput
                                setInput={setCurrentPass}
                                isPassword={true}
                                type="password"
                                isValid={invalidCurrentPass}
                                message="Required input"
                                customclass={`min-h-[40px] ${
                                    isIntra ? "opacity-30" : "opacity-100"
                                } sm:min-h-[52px] min-w-full`}
                                text="●●●●●●●●●●●●"
                                visible={isIntra}
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
                                    isValid={invalidNewPass}
                                    message="Enter at least 8 characters"
                                    customclass="min-h-[40px] sm:min-h-[52px] min-w-full"
                                    text="●●●●●●●●●●●●"
                                />
                            </div>
                            <div className="w-[50%] space-y-1  h-1 min-h-[86px] flex flex-col justify-end">
                                <span className="font-body before:content-['Confirm_Pass'] h:before:content-['Confirm_Password'] text-cardtitle text-sm font-semibold lg:text-lg"></span>
                                <MyInput
                                    setInput={setConfirmPass}
                                    isPassword={true}
                                    isValid={invalidNewPass}
                                    type="password"
                                    message="Passwords must match"
                                    customclass="min-h-[40px] sm:min-h-[52px] min-w-full"
                                    text="●●●●●●●●●●●●"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="min-h-[40px] sm:min-h-[56px] md:min-h-[62px] flex justify-center  items-center w-full">
                        <CustomButton
                            text="Update"
                            color="orange"
                            otherclass="max-w-[300px] w-[60%] min-h-[50px]"
                        />
                    </div>
                </div>
            </form>
        </MyDialog>
    );
};
export default ProfileSettings;