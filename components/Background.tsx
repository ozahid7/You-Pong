import React from "react";

export function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#D6E4E5] w-full h-full border-[6px] border-[#EFF5F5] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] grid grid-rows-[1.9fr]">
      <div className="flex w-full items-center flex-col gap-3 overflow-y-scroll scroll-smooth">{children}</div>
    </div>
  );
}

export default Background;
