import React, { ReactNode } from "react";

const MyCard = ({ children }: { type?: string; children: ReactNode }) => {
  return (
    <div className="my_score w-[70%] h-full flex justify-center items-center m-auto">
      <div className="center w-[98%] h-[88%] flex justify-center items-center">
        <div className="flex w-[90%] h-full">{children}</div>
      </div>
    </div>
  );
};

export default MyCard;
