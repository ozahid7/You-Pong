import { Acheivement, MyCard } from "@/components";
import React from "react";

const data: any[] = [
    "Play your first match",
    "Add a new friend",
    "Play ranked game",
    "win 3 games",
    "Reach level 3",
];

const AchievementCard = () => {
    return (
        <div className="flex justify-center max-w-[400px] w-[80%] h-[86%] overflow-hidden">
            <MyCard type="nocorner" otherclass="max-h-full flex">
                <div className="w-full overflow-y-auto h-full flex flex-col dred items-center">
                    <div className="w-full pl-10 h-[8%] dred  flex items-center">
                        <h3 className=" whitespace-nowrap text-cardtitle  text-[12px]  h:text-lg md:text-2xl font-bold font-audio drop-shadow-sm">
                            Achievement
                        </h3>
                    </div>
                    <div className="flex dblue w-[70%] max-w-[270px] min-w-[200px] space-y-6 h-[90%] flex-col">
                        {data.map((e) => (
                            <Acheivement
                                classname="min-h-[200px]"
                                isOpened={false}
                                text={e}
                            />
                        ))}
                    </div>
                </div>
            </MyCard>
        </div>
    );
};

export default AchievementCard;
