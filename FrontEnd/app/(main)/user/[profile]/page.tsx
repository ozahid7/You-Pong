"use client";
import React, { createContext, useContext, useState } from "react";
import AchievementCard from "./AchievementCard";
import HistoryCard from "./HistoryCard";
import PlayerCard from "./PlayerCard";
import OverviewCard from "./OverviewCard";
import NewGameCard from "./NewGameCard";
import { endPoints, UserInfo, UserToShow } from "@/types/Api";
import { useAxios } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/tools/Loader";
import useOtherUser from "@/api/useOtherUser";
import ProfileSettings from "../../settings/ProfileSettings";
import { MyContext, useUser } from "@/providers/UserContextProvider";

interface pageProps {
    params: { profile: string };
}

interface otherUserProps {
    otherUser: UserToShow;
}

const page = ({ params }: pageProps) => {
    const {data, isLoading, isFetching} = useOtherUser(params.profile);
    const userQuery = useQuery({queryKey: ['user']})
    const user = useUser();
    const isFirstTime = user.userData.isFirstTime;

    if (isFirstTime) return <ProfileSettings isOpen={true} setIsOpen={() => {}} />;
    else if (isLoading || isFetching || userQuery.isFetching)
        return <Loader />;
    else
        return (
            <div className="w-full 2xl:w-[92%] xl:min-h-[90vh] pb-24 h-auto  flex flex-col xl:flex-row">
                <div className="w-full flex flex-col md:flex-row xl:w-[66%]">
                    <div className="w-full max-h-[600px] md:max-h-none min-h-[44vh]  h:min-h-[66vh] md:w-[60%] h-full flex items-center justify-center  ">
                        <div className="h-full md:h-[90%] w-full md:w-[90%] lg:w-[80%] xl:w-[90%] flex flex-col items-center justify-between h:justify-around md:justify-between">
                            < PlayerCard otheruser={data} />
                            <OverviewCard otheruser={data}/>
                            <NewGameCard />
                        </div>
                    </div>
                    <div className="w-full md:w-[40%] flex justify-center items-center min-h-[500px]">
                        <AchievementCard  otheruser={data}/>
                    </div>
                </div>
                <div className="w-full flex justify-center min-h-[500px] items-center xl:w-[34%]">
                    <HistoryCard otheruser={data}/>
                </div>
            </div>
        );
};

export default page;
