import { MyCard } from "@/components";
import { ImUserPlus } from "react-icons/im";

import React from "react";
import { LuSettings } from "react-icons/lu";
import PlayerCard from "./PlayerCard";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full w-full make_center dred items-center">
            <div className="h-[98%] w-full flex flex-col dgreen pb-4 items-center">
                <PlayerCard />
            </div>
        </div>
    );
}
