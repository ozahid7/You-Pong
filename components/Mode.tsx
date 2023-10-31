import React from "react";

interface Props {
  elements: string;
  border: string;
  background: string;
  name?: string;
}

export function Mode({ elements, border, background, name }: Props) {
  return (
    <div className="flex w-[45%] h-fit border-[2px] border-palette-green justify-evenly items-center">
      <label
        htmlFor="easy"
        className="font-['Chakra_Petch'] text-[#497174] font-[700] text-[20px]"
      >
        Easy
      </label>
      <input
        type="checkbox"
        name="difficulty"
        id="easy"
      />
    </div>
  );
}

export default Mode;