"use client";
import React, { createContext, useContext, useState } from "react";
import AchievementCard from "./AchievementCard";
import HistoryCard from "./HistoryCard";
import PlayerCard from "./PlayerCard";
import OverviewCard from "./OverviewCard";
import NewGameCard from "./NewGameCard";
import { endPoints, userToShow } from "@/types/Api";
import { useAxios } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/tools/Loader";

interface pageProps {
    params: { profile: string };
}

interface otherUserProps {
    otherUser: userToShow
}

export const otherUserContext = createContext<otherUserProps | undefined>(undefined)

const page = ({ params }: pageProps) => {
    const [otherUser, setUser] = useState(undefined);

    console.log('params = ', params.profile)
    const getUser = async () => {
        console.log("user = ", params.profile);
        try {
            const response = await useAxios<userToShow>(
                "post",
                endPoints.getuser,
                { friend: params.profile }
            );
            console.log("get user response = ", response);
            setUser(response);
        } catch (error) {
            console.log("get user error = :", error);
        }

        return null;
    };

    const otherUserQuery = useQuery({
        queryKey: ['otheruser'],
        queryFn: getUser,
        enabled: params.profile !== 'profile'
    });
    
      if (otherUserQuery.isLoading || otherUserQuery.isFetching) return <Loader />;
      else
          return (
            <otherUserContext.Provider value={{otherUser}}>
              <div className="w-full 2xl:w-[92%] xl:min-h-[90vh] pb-24 h-auto  flex flex-col xl:flex-row">
                  <div className="w-full flex flex-col md:flex-row xl:w-[66%]">
                      <div className="w-full max-h-[600px] md:max-h-none min-h-[44vh]  h:min-h-[66vh] md:w-[60%] h-full flex items-center justify-center  ">
                          <div className="h-full md:h-[90%] w-full md:w-[90%] lg:w-[80%] xl:w-[90%] flex flex-col items-center justify-between h:justify-around md:justify-between">
                              <PlayerCard />
                              <OverviewCard />
                              <NewGameCard />
                          </div>
                      </div>
                      <div className="w-full md:w-[40%] flex justify-center items-center min-h-[500px]">
                          <AchievementCard />
                      </div>
                  </div>
                  <div className="w-full flex justify-center min-h-[500px] items-center xl:w-[34%]">
                      <HistoryCard />
                  </div>
              </div>
            </otherUserContext.Provider>
          );
};

export default page;
