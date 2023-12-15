"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import React from "react";
import { renderIcon } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { blockUser } from "@/utils/friends";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { apiHost, myRoutes } from "@/const";
import axios from "axios";

const MyDropdown = (props: {
    icon: any;
    style?: string;
    size?: number;
    image?: any;
    placement: string;
    menuElements?: any;
    user?: string;
    setDataInvalid?: any
}) => {
    const router = useRouter();
    const friendsQuery = new QueryClient()

    const handleLogout = async () => {
        const apiUrl = `${apiHost}user/signout`;

        await new Promise((resolve) => setTimeout(resolve, 500));
        await axios
            .get(apiUrl, { withCredentials: true })
            .then((response) => {
                console.log("data posted successfuly : ");
                localStorage.removeItem("isLoged");
                router.push("/");
            })
            .catch((e) => {
                console.log(".catch error", e);
            });
    };

    const handelClick = (e: string) => {
        if (e === "/user/") router.push(e + props.user);
        else if (e === "/game") router.push(e);
        else if (e === "block") {
            blockUser(props.user).then(() => {
                props.setDataInvalid(true)
            })
        }
        else if (e === '/settings'){
            router.push(e)
        }
        else if (e === 'logout'){
            handleLogout()
        }
        else if (e === '/user/profile')
            router.push(myRoutes.dashboard)
    };

    return (
        <div className="flex flex-col justify-center relative">
            <Menu>
                <Menu.Button as="div" className="">
                    {props.icon !== ""
                        ? renderIcon(props.icon, props.style, props.size)
                        : props.image}
                </Menu.Button>
                <Menu.Items
                    as="div"
                    className={`flex flex-col border-2 border-palette-green  h-auto outline-none w-auto rounded-sm drop-shadow-lg z-[1000] bg-palette-white top-full ${props.placement} absolute`}
                >
                    {props.menuElements?.map((elm) => (
                        <Menu.Item key={elm.href} as={Fragment}>
                            {({ active }) => (
                                <div
                                    onClick={() => {
                                        handelClick(elm.href);
                                    }}
                                    className={`py-2 z-10 px-4 min-w-[150px] cursor-pointer border-b border-palette-grey font-body font-bold flex items-center space-x-4  ${
                                        active
                                            ? "bg-palette-orange text-white"
                                            : " text-palette-green"
                                    }`}
                                >
                                    <div className="h-auto flex">
                                        {elm.icon}
                                    </div>
                                    <div className="h-auto flex">
                                        {elm.label}
                                    </div>
                                </div>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Menu>
        </div>
    );
};

export default MyDropdown;
