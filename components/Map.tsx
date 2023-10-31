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
    <div className="flex w-full h-[120px] justify-center flex-col items-center">
      <div className={`flex bg-[${background}] w-[85%] h-full shadow-md justify-center items-center flex-col rounded-sm`}>
        <button className={`flex border-[6px] border-[${border}] shadow-lg rounded-sm w-[90%] h-[90%] xxs:border-[2px] items-center justify-center`}>
          <div className="flex w-[95%] h-[95%] justify-between flex-col items-center ">
            <div className={`flex bg-[${elements}] w-[35%] h-[3%]`}></div>
            <div className={`flex bg-[${elements}] rounded-full xxs:w-[5px] xxs:h-[5px]`}></div>
            <div className={`flex bg-[${elements}] w-[35%] h-[3%]`}></div>
          </div>
        </button>
      </div>
      <div className="font-['Chakra_Petch'] xxs:text-[11px] text-[#686868] font-[700] w-fit h-fit underline">
        {name} map
      </div>
    </div>
  );
}

export default Map;
