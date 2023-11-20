import { Acheivement, MyCard } from '@/components';
import React from 'react'
import { Tooltip } from 'react-tooltip';

interface Achievement {
    title: string;
    description: string;
    isOwned: boolean;
}

const Achievements: Achievement[] = [
    {
        title: "Achievement 1",
        description: "Play your first game",
        isOwned: true,
    },
    {
        title: "Achievement 1",
        description: "Play your first game",
        isOwned: false,
    },
  
    
   
];

const AchievementCard = () => {
    
  return (
      <div className="flex min-w-[240px] xl:min-w-[280px] xl:max-w-[360px] xl:max-h-none md:max-h-[800px] max-h-[500px] md:w-[80%] w-[90%] h-[80%] md:h-[90%] ">
          <MyCard type="nocorner" otherclass="max-h-full flex">
              <div className="w-full relative h-full flex flex-col justify-end items-end">
                    
                      <h3 className=" whitespace-nowrap text-cardtitle  text-[12px] absolute top-4 left-4 h:left-6 sm:left-8 md:left-8  h:text-lg md:text-xl font-bold font-audio drop-shadow-sm">
                          Achievement
                      </h3>
                  <Tooltip
                      id="my-tooltip"
                      className="greenTooltip font-body border-2 border-palette-grey font-semibold drop-shadow-lg z-10"
                      style={{
                          backgroundColor: "#46686A",
                          color: "#fff",
                      }}
                      opacity={1}
                      place={"top-start"}
                  />
                  <div className=" flex w-full overflow-y-auto my_scroll_green  md:h-[90%] h:h-[84%] h-[86%] space-y-20 flex-col items-center mb-2">
                      {Achievements.map((e: Achievement, index) => (
                          <Acheivement
                              classname=""
                              isOpened={e.isOwned ? true : false}
                              text={e.title}
                              description={e.description}
                              key={index}
                          />
                      ))}
                  </div>
              </div>
          </MyCard>
      </div>
  );
}

export default AchievementCard