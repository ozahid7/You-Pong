"use client";

import { MiniBanner, MyCard } from "@/components";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineSettings } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAxios } from "@/utils";
import { friendsEndPoint } from "@/types/Api";
import { QueryClient } from "@tanstack/react-query";
import { FaUserClock, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { HiBan } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { UserToShow } from "@/types/Api";

import { MyContext, useUser } from "@/providers/UserContextProvider";
import Loader from "@/components/tools/Loader";
import { myRoutes } from "@/const";

const PlayerCard = ({ otheruser }: { otheruser: UserToShow }) => {
    const user = useUser();
    const friends = user.FriendData;

    const [isFriend, setIsFriend] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();
    let username = user.userData.username;
    let level = user.userData.level;
    let rank = user.userData.rank;
    let avatar = user.userData.avatar;

    if (otheruser && otheruser !== undefined) {
        username = otheruser.username;
        level = otheruser.level;
        rank = otheruser.rank;
        avatar = otheruser.avatar;
    }

    useEffect(() => {
        if (otheruser !== undefined) {
            friends.accepted.map((elm: any) => {
                if (username === elm.username) setIsFriend(true);
            });
            friends.pending.map((elm) => {
                if (username === elm.username) setIsPending(true);
            });
        }
    });

    const freindsQuery = new QueryClient();

    const addUser = async () => {
        try {
            const response = await useAxios(
                "post",
                friendsEndPoint.add + "?username=" + username
            );
            console.log("add user response = ", response);
            freindsQuery.invalidateQueries({ queryKey: ["friends"] });
        } catch (error) {
            console.log("add user error = ", error);
        }
    };

    const addMutation = useMutation({ mutationFn: addUser });

    const removeUser = async () => {
        try {
            const response = await useAxios(
                "put",
                friendsEndPoint.decline + "?username=" + username
            );
            console.log("remove user response = ", response);
            freindsQuery.invalidateQueries({ queryKey: ["friends"] });
        } catch (error) {
            console.log("remove user error =", error);
        }
    };
    
    const blockUser = async () => {
        try {
            const response = await useAxios(
                "put",
                friendsEndPoint.block + "?username=" + username
                );
                freindsQuery.invalidateQueries({ queryKey: ["friends"] });
                console.log("response... = ", response);
                router.push(myRoutes.dashboard)
         } catch (error) {
             console.log("error : ", error);
         }
     };

    const removeMutation = useMutation({ mutationFn: removeUser });
    const blockMutation = useMutation({ mutationFn: blockUser });

    let [Icon, setIcon] = useState(false);
    const isOnline = true;
    let name = username.replace(/[^a-zA-Z]/g, "");

    name =
        username.length > 7
            ? name.slice(0, 3) + "-" + username.slice(username.length - 3)
            : username;

    const hideIcon = (cmd: string) => {
        if (cmd === "remove") removeMutation.mutate();
        else addMutation.mutate();
        setIcon(!Icon);
    };
    return (
        <div className="flex justify-center z-0 w-[90%] md:w-full overflow-hidden min-h-[180px] max-w-[600px] h:min-h-[204px] h-[20%] md:h-[30%] h:h-[24%]">
            <MyCard otherclass="">
                <div className="w-full relative justify-between items-center flex h-full">
                    <h3 className=" whitespace-nowrap absolute top-2 left-4 sm:left-8 sm:top-4   text-cardtitle  text-[12px] h:text-lg md:text-xl font-bold font-audio drop-shadow-sm">
                        Player Card
                    </h3>
                    <div className="sm:w-[40%] w-[34%] md:pt-4 flex flex-col justify-center items-center h-[60%] md:h-[80%]">
                        <div className="w-[80%] pt-4 md:pt-2 h-[90%] md:w-[60%] md:pb-[60%] xl:w-[80%] xl:h-[80%] relative">
                            <img
                                className=" h-[100%] w-[100%] absolute object-contain rounded-md"
                                src={avatar}
                                alt="avatar"
                            />
                        </div>
                    </div>
                    <div className="w-[62%] h-full pr-1 sm:pr-0 flex flex-col items-center justify-center pt-1 sm:pt-2 relative">
                        {otheruser === undefined ? (
                            <MdOutlineSettings
                                onClick={() => {
                                    router.push("/settings");
                                }}
                                size={120}
                                className="z-10 h-5 w-5 sm:h-[12%]  sm:w-[12%] s:h-[16%] s:w-[16%] absolute top-1 right-1 sm:top-2 sm:right-2  text-cardtitle cursor-pointer"
                            />
                        ) : (
                            <HiBan
                                onClick={() => {
                                    blockMutation.mutate()
                                }}
                                size={120}
                                className="z-10 h-5 w-5 sm:h-[12%]  sm:w-[12%] s:h-[16%] s:w-[16%] absolute top-1 right-1 sm:top-2 sm:right-2  text-cardtitle cursor-pointer"
                            />
                        )}

                        {otheruser &&
                            (!Icon && !isFriend && !isPending ? (
                                <FaUserPlus
                                    onClick={() => {
                                        hideIcon("add");
                                    }}
                                    size={100}
                                    className="z-10 h-[14%] w-[14%] absolute sm:bottom-6 h:right-3 bottom-4 right-4  text-cardtitle cursor-pointer"
                                />
                            ) : isPending ? (
                                <FaUserClock
                                    onClick={() => {}}
                                    size={100}
                                    className="z-10 h-[20%] w-[20%] s:h-[14%] s:w-[14%] absolute sm:bottom-6 sm:right-3 bottom-4 right-4  text-cardtitle"
                                />
                            ) : (
                                <FaUserMinus
                                    onClick={() => {
                                        hideIcon("remove");
                                    }}
                                    size={100}
                                    className="z-10 h-[20%] w-[20%] s:h-[14%] s:w-[14%] absolute sm:bottom-6 sm:right-3 bottom-4 right-4  text-cardtitle cursor-pointer"
                                />
                            ))}
                        <div className="sm:w-[86%] h-[76%] mt-4 w-full flex flex-col justify-evenly space-y-1 relative">
                            <div className=" w-full space-x-1  flex">
                                <h2 className="font-extrabold mt-2 font-russo text-2xl h:text-3xl sm:text-4xl md:text-4xl text-cardtitle drop-shadow">
                                    {name}
                                </h2>
                                <span className="relative flex h-2 w-2  sm:h-3 sm:w-3">
                                    <span
                                        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                                            isOnline
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }  opacity-75`}
                                    ></span>
                                    <span
                                        className={`relative inline-flex rounded-full w-2 h-2 sm:h-3 sm:w-3 ${
                                            isOnline
                                                ? "bg-green-600"
                                                : "bg-red-600"
                                        } `}
                                    ></span>
                                </span>
                            </div>
                            <div className="flex flex-col justify-between h-auto space-y-3 w-[80%] sm:w-[90%]">
                                <MiniBanner
                                    isGreen={true}
                                    value={level.toString()}
                                    name="Level"
                                />

                                <MiniBanner
                                    isGreen={false}
                                    value={rank.toString()}
                                    name="Rank"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </MyCard>
        </div>
    );
};

export default PlayerCard;
