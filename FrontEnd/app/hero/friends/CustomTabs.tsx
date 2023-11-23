"use client";
import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import FriendBanner from "./FriendBanner";
import { MyToolTip } from "@/components";
import BlockedBanner from "./BlockedBanner";
import RequestBanner from "./RequestBanner";

interface Friend {
    avatar: string;
    status: string;
    userName: string;
}

const FriendsList: Friend[] = [
    { avatar: "/ozahid-.jpeg", status: "offline", userName: "List" },
    { avatar: "/ozahid-.jpeg", status: "online", userName: "Listhfkshshgks" },
    { avatar: "/ozahid-.jpeg", status: "offline", userName: "List" },
    { avatar: "/ozahid-.jpeg", status: "in game", userName: "List" },
    { avatar: "/ozahid-.jpeg", status: "online", userName: "List" },
];
const BlockedList: Friend[] = [
    { avatar: "/ozahid-.jpeg", status: "offline", userName: "Blocked" },
    { avatar: "/ozahid-.jpeg", status: "online", userName: "Blocked" },
    { avatar: "/ozahid-.jpeg", status: "offline", userName: "Blocked" },
    { avatar: "/ozahid-.jpeg", status: "in game", userName: "Blocked" },
    { avatar: "/ozahid-.jpeg", status: "online", userName: "Blocked" },
];
const RequestList: Friend[] = [
    { avatar: "/ozahid-.jpeg", status: "offline", userName: "Request" },
    { avatar: "/ozahid-.jpeg", status: "online", userName: "Request" },
    { avatar: "/ozahid-.jpeg", status: "offline", userName: "Request" },
    { avatar: "/ozahid-.jpeg", status: "in game", userName: "Request" },
    { avatar: "/ozahid-.jpeg", status: "online", userName: "Request" },
];

const CustomTabs = () => {
    const [index, setIndex] = useState(0);

    const renderImage = (path: string) => {
        return (
            <img
            src={path}
            alt="logo"
            className="h-10  object-contain border-2 max-w-[220px] max-h-[220px] border-white  rounded-md sm:h-14 md:h-16"
            />
        )
    }
    
    return (
        <div className="w-full flex flex-col items-center h-[70%]">
            <Tab.Group
                defaultIndex={0}
                onChange={(index) => {
                    setIndex(index);
                }}
            >
                <Tab.List className="bg-[#819FA1] outline-none min-h-[50px] space-x-1  py-2 w-[90%] flex rounded-sm  justify-evenly">
                    <Tab
                        className={`outline-none before:content-['List'] sm:before:content-['Friend_List'] text-sm md:text-lg font-body xl:text-xl drop-shadow-lg  ${
                            index === 0 ? "border-b-2 border-white" : ""
                        } font-semibold text-white rounded- hover:scale-110`}
                    ></Tab>

                    {/* Selects this tab by default */}
                    <Tab
                        className={`outline-none text-sm md:text-lg before:content-['Requests'] sm:before:content-['Friend_Request'] font-body xl:text-xl drop-shadow-lg  ${
                            index === 1 ? "border-b-2 border-white" : ""
                        } font-semibold text-white rounded- hover:scale-110`}
                    ></Tab>

                    <Tab
                        className={`outline-none text-sm md:text-lg before:content-['Blocked'] sm:before:content-['Blocked_Friends']  font-body xl:text-xl drop-shadow-lg  ${
                            index === 2 ? "border-b-2 border-white" : ""
                        } font-semibold text-white rounded- hover:scale-110`}
                    ></Tab>
                </Tab.List>
                <Tab.Panels className="mt-4  flex overflow-y-auto  my_scroll_green flex-grow w-[90%]">
                    <MyToolTip id="username"/>
                    <Tab.Panel className="h-[20%]  space-y-4 w-full">
                        {FriendsList.map((e, index) => (
                            <FriendBanner
                                key={index}
                                userName={
                                    e.userName
                                }
                                image={renderImage(e.avatar)}
                                status={e.status}
                            />
                        ))}
                    </Tab.Panel>
                    {/* Displays this panel by default */}
                    <Tab.Panel className="h-[20%] space-y-4 w-full">
                        {RequestList.map((e, index) => (
                            <RequestBanner
                                key={index}
                                userName={
                                   e.userName
                                }
                                image={renderImage(e.avatar)}
                                status={e.status}
                            />
                        ))}
                    </Tab.Panel>

                    <Tab.Panel className="h-[20%]  space-y-4 w-full">
                        {BlockedList.map((e, index) => (
                            <BlockedBanner
                                key={index}
                                userName={
                                    e.userName
                                }
                                image={renderImage(e.avatar)}
                                status={e.status}
                            />
                        ))}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default CustomTabs;
