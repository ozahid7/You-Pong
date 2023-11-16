import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}
export function Background({ children }: Props) {
  return (
    <div className="bg-[#D6E4E5] border-[6px] border-[#EFF5F5] h-full w-full shadow-lg rounded-sm shadow-[rgba(0,0,0,0.25)]">
      <div className="flex h-full w-full overflow-y-auto justify-around items-center flex-col gap-y-5 py-2">
        {children}
      </div>
    </div>
  );
}

export default Background;
