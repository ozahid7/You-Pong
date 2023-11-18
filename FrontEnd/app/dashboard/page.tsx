import { MyCard, MyContainer } from "@/components";
import { ImUserPlus } from "react-icons/im";

import React from "react";
import { LuSettings } from "react-icons/lu";
import PlayerCard from "./PlayerCard";
import OverviewCard from "./OverviewCard";
import NewGame from "./NewGame";
import AchievementCard from "./AchievementCard";
import MatchHistory from "./MatchHistory";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <div className=" h-full  relative overflow-auto min-h-[620px] xl:space-y-0 w-[96%] xxxl:w-[84%] space-y-10  pb-2 make_center dred flex-col xl:flex-row items-center">
            <div className="h-full w-[91%] xl:w-[64%] flex flex-col lg:space-y-0 space-y-10 lg:flex-row items-center">
                <div className="h-[80%] w-full lg:w-[60%] justify-between space-y-4 dred flex flex-col items-center">
                    <PlayerCard />
                    <OverviewCard />
                    <NewGame />
                </div>
                <div className="lg:h-[80%] lg:w-[40%] w-[100%] h-[30%] flex items-center justify-center dblue">
                    <AchievementCard />
                </div>
            </div>
            <div className="xl:h-[80%] max-h-[600px] xl:max-h-none flex items-center justify-center w-full xl:w-[36%] dblue">
                <MatchHistory/>
            </div>
        </div>
    );
}
