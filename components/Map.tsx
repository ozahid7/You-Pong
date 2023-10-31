import React from "react";

interface Props {
  elements: string;
  border: string;
  background: string;
  name?: string;
}

export function Map({ elements, border, background, name }: Props) {
  if (elements == "#497174") name = "Green";
  else if (elements == "#EB6440") name = "Orange";
  else name = "Classic";
  return (
    <div className="flex w-full s:h-[11rem] h-[6.5rem] md:h-[12rem] xl:h-[13rem] justify-center flex-col items-center">
      <div className={`flex bg-[${background}] w-[85%] h-full shadow-md justify-center items-center flex-col rounded-sm`}>
        <button className={`flex border-[6px] border-[${border}] shadow-lg rounded-sm w-[90%] h-[90%] border-[2px] items-center justify-center hover:scale-110 hover:duration-300 hover:shadow-gray-500`}>
          <div className="flex w-[95%] h-[95%] justify-between flex-col items-center ">
            <div className={`flex bg-[${elements}] w-[35%] h-[3%] 2xl:w-[32%]`}></div>
            <div className={`flex bg-[${elements}] rounded-full w-[6px] h-[6px] sm:w-[6px] sm:h-[6px] md:w-[7px] md:h-[7px] lg:w-[8px] lg:h-[8px] 2xl:w-[10px] 2xl:h-[10px] 3xl:w-[11px] 3xl:h-[11px]`}></div>
            <div className={`flex bg-[${elements}] w-[35%] h-[3%]`}></div>
          </div>
        </button>
      </div>
      <div className="font-['Chakra_Petch'] text-[11px] s:text-[13px] sm:text-[15px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-[#686868] font-[700] w-fit h-fit underline">
        {name} map
      </div>
    </div>
  );
}

export default Map;
