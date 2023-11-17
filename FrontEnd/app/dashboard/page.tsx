import { MyCard, MyContainer } from "@/components";
import { ImUserPlus } from "react-icons/im";

import React from "react";
import { LuSettings } from "react-icons/lu";
import PlayerCard from "./PlayerCard";
import OverviewCard from "./OverviewCard";
import NewGame from "./NewGame";
import AchievementCard from "./AchievementCard";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full min-h-[620px] w-full pb-2 make_center relative dred flex-col items-center">
            <div className="h-full w-full flex items-center">
                <div className="h-[90%] justify-evenly space-y-4 w-full dred flex flex-col items-center">
                    <PlayerCard />
                    <OverviewCard />
                    <NewGame />
                </div>
                <div className="h-[90%] flex items-center justify-center w-[80%] dblue">
                    <AchievementCard/>
                </div>
            </div>
            <div className=""></div>
        </div>
    );
}
