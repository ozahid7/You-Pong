import React from "react";

export function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#D6E4E5] border-[6px] border-[#EFF5F5] h-full w-full shadow-md">
      <div className="flex h-full w-full overflow-y-scroll justify-around items-center flex-col gap-y-5 py-2">
        {children}
      </div>
    </div>
  );
}

export default Background;
