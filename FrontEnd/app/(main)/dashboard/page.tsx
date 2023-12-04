"use client";
import { Acheivement } from "@/components";
import React, { useLayoutEffect, useState } from "react";
import AchievementCard from "./AchievementCard";
import HistoryCard from "./HistoryCard";
import PlayerCard from "./PlayerCard";
import OverviewCard from "./OverviewCard";
import NewGameCard from "./NewGameCard";
import axios from "axios";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { promises } from "dns";
import Loader from "@/components/tools/Loader";
import withAuth from "@/components/auth/withAuth";
import { apiHost } from "@/const";
import router, { redirect } from "next/navigation";
import { useRouter } from "next/navigation";


const page = () => {
   const router = useRouter();
   const getUser = async () => {
       const apiUrl = `${apiHost}user/GetHero`;
       try {
           await new Promise((resolve) => setTimeout(resolve, 500));
           await axios
               .get(apiUrl, { withCredentials: true })
               .then((response: any) => {
                   console.log(response.data);
                   setTimeout(() => {
                       localStorage.setItem("isLogedIn", 'true');
                   }, 1000);
               })
               .catch((e) => {
                   console.log(e);
               });
       } catch (e) {
           console.log(e);
       }
       return null;
   };

   const UserQuery = useQuery({
       queryKey: ["user"],
       queryFn: getUser,
   });

   if (UserQuery.isLoading) return <Loader />;

   if (UserQuery.isSuccess)
       return (
           <div className="w-full 2xl:w-[92%] xl:min-h-[90vh] pb-24 h-auto  flex flex-col xl:flex-row">
               <div className="w-full flex flex-col md:flex-row xl:w-[66%]">
                   <div className="w-full max-h-[600px] md:max-h-none min-h-[44vh]  h:min-h-[66vh] md:w-[60%] h-full flex items-center justify-center  ">
                       <div className="h-full md:h-[90%] w-full md:w-[90%] lg:w-[80%] xl:w-[90%] flex flex-col items-center justify-between h:justify-around md:justify-between">
                           <PlayerCard userName="anas idrissi" />
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
       );
};

export default withAuth(page);
