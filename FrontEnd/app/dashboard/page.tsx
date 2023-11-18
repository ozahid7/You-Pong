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
        <div className="h-full min-h-[620px] w-[80%] pb-2 make_center dred flex-col xl:flex-row items-center">
            <div className="h-full w-[64%] flex items-center">
                <div className="h-[80%] w-[60%] justify-between space-y-4 dred flex flex-col items-center">
                    <PlayerCard />
                    <OverviewCard />
                    <NewGame />
                </div>
                <div className="h-[80%] w-[40%] flex items-center justify-center dblue">
                    <AchievementCard />
                </div>
            </div>
            <div className="h-[80%] flex items-center justify-center w-[36%] dgreen">
                <MatchHistory/>
            </div>
        </div>
    );
}
