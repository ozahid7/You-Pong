"use client";
import React, { useContext, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import FriendBanner from "./FriendBanner";
import { MyToolTip } from "@/components";
import BlockedBanner from "./BlockedBanner";
import RequestBanner from "./RequestBanner";
import { useQuery } from "@tanstack/react-query";
import MiniLoader from "@/components/tools/MiniLoader";
import { MyContext } from "@/providers/UserContextProvider";
import { FriendArr, FriendsReturn } from "@/types/Api";

const CustomTabs = (props: { input: string; setInput: any, friends: FriendArr }) => {
    const FriendsQuery = useQuery({ queryKey: ["friends"] });
    const { accepted, blocked, pending } = props.friends;

    const [index, setIndex] = useState(0);
    const [ListArr, setListArr] = useState(accepted);
    const [RequestArr, setRequestArr] = useState(pending);
    const [BlockArr, setBlockArr] = useState(blocked);
    const [InvalidData, setInvalidData] = useState(false);

    useEffect(() => {
        if (InvalidData) {
            FriendsQuery.refetch();
        }
        setInvalidData(false);
    }, [InvalidData]);

    useEffect(() => {
        setBlockArr(blocked);
        setRequestArr(pending);
        setListArr(accepted);
    }, [blocked, accepted, pending]);

    useEffect(() => {
        setListArr(
            accepted?.filter((friend) =>
                friend.username
                    .toLowerCase()
                    .includes(props.input.toLowerCase())
            )
        );
        setRequestArr(
            pending.filter((friend) =>
                friend.username
                    .toLowerCase()
                    .includes(props.input.toLowerCase())
            )
        );
        setBlockArr(
            blocked.filter((friend) =>
                friend.username
                    .toLowerCase()
                    .includes(props.input.toLowerCase())
            )
        );
    }, [props.input]);

    const renderImage = (path: string) => {
        return (
            <img
                src={path}
                alt="logo"
                className="h-10  object-contain border-2 max-w-[220px] max-h-[220px] border-white  rounded-md sm:h-14 md:h-16"
            />
        );
    };
    if (FriendsQuery.isFetching) return <MiniLoader customClass="h-[70%]" />;
    else {
        return (
            <div className="w-full flex flex-col items-center h-[70%]">
                <Tab.Group
                    defaultIndex={0}
                    onChange={(index) => {
                        setIndex(index);
                        props.setInput("");
                    }}
                >
                    <Tab.List className="bg-[#819FA1] outline-none min-h-[50px] space-x-1  py-2 w-[90%] flex rounded-sm  justify-evenly">
                        <Tab
                            className={`outline-none before:content-['List'] sm:before:content-['Friend_List'] text-h sm:text-sm md:text-lg font-body xl:text-xl drop-shadow-lg  ${
                                index === 0 ? "border-b-2 border-white" : ""
                            } font-semibold text-white rounded- hover:scale-110`}
                        ></Tab>

                        {/* Selects this tab by default */}
                        <Tab
                            className={`outline-none text-h sm:text-sm md:text-lg before:content-['Requests'] sm:before:content-['Friend_Request'] font-body xl:text-xl drop-shadow-lg  ${
                                index === 1 ? "border-b-2 border-white" : ""
                            } font-semibold text-white rounded- hover:scale-110`}
                        ></Tab>

                        <Tab
                            className={`outline-none text-h sm:text-sm md:text-lg before:content-['Blocked'] sm:before:content-['Blocked_Friends']  font-body xl:text-xl drop-shadow-lg  ${
                                index === 2 ? "border-b-2 border-white" : ""
                            } font-semibold text-white rounded- hover:scale-110`}
                        ></Tab>
                    </Tab.List>
                    <Tab.Panels className="mt-4  flex overflow-y-auto  my_scroll_green flex-grow w-[90%]">
                        <MyToolTip id="username" />
                        <Tab.Panel
                            autoFocus
                            className="h-[16%] md:h-[18%]  space-y-4 w-full"
                        >
                            {ListArr.length === 0 ? (
                                <div className="make_center h-full">
                                    {" "}
                                    <span className="font-body font-bold text-cardtitle">
                                        No Friends Yet
                                    </span>
                                </div>
                            ) : (
                                ListArr.map((e, index) => (
                                    <FriendBanner
                                        key={index}
                                        userName={e.username}
                                        image={renderImage(e.avatar)}
                                        status={e.status}
                                        SetInvalidData={setInvalidData}
                                    />
                                ))
                            )}
                        </Tab.Panel>
                        {/* Displays this panel by default */}
                        <Tab.Panel className="h-[16%] md:h-[18%] space-y-4 w-full">
                            {RequestArr.length === 0 ? (
                                <div className="make_center h-full">
                                    {" "}
                                    <span className="font-body font-bold text-cardtitle">
                                        No Friends Yet
                                    </span>
                                </div>
                            ) : (
                                RequestArr.map((e, index) => (
                                    <RequestBanner
                                        key={index}
                                        userName={e.username}
                                        image={renderImage(e.avatar)}
                                        status={e.status}
                                        SetInvalidData={setInvalidData}
                                    />
                                ))
                            )}
                        </Tab.Panel>

                        <Tab.Panel className="h-[16%] md:h-[18%] space-y-4 w-full">
                            {
                            BlockArr.length === 0 ? (
                                <div className="make_center h-full">
                                    {" "}
                                    <span className="font-body font-bold text-cardtitle">
                                        No Friends Yet
                                    </span>
                                </div>
                            ) : (BlockArr.map((e, index) => (
                                <BlockedBanner
                                    key={index}
                                    userName={e.username}
                                    image={renderImage(e.avatar)}
                                    status={e.status}
                                    SetInvalidData={setInvalidData}
                                />
                            )))}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        );
    }
};

export default CustomTabs;
