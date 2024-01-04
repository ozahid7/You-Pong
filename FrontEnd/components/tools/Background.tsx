import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function Background({ children }: Props) {
  return (
    <div className=" flex flex-col justify-center max-w-[1200px] items-center h-[100%] overflow-y-auto">
      <div className="w-full h-full  rounded-md bg-palette-grey border-[5px] flex flex-col items-center justify-around border-palette-white shadow-md ">
        {children}
      </div>
    </div>
  );
}

export default Background;
