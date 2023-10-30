import React from "react";

export function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-[color] w-full h-full border-[6px] border-[#EFF5F5] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-evenly flex-col items-center">
		{children}
	</div>
  );
}

export default Background;