import React from "react";

interface Props {
  text: string;
}

export function Mode({ text }: Props) {
  let text1;
  if (text == "Easy" || text == "Hard")
    text1 = text.replace(text[0], text[0] + 0);
  return (
    <div className="flex w-[45%] md:w-[40%] h-fit border-[2px] border-palette-green justify-evenly items-center">
      <label
        htmlFor={text1}
        className="font-['Chakra_Petch'] text-[#497174] font-[700] text-[100%] s:text-[150%] md:text-[250%] xl:text-[300%]"
      >
        {text}
      </label>
      <input
        type="checkbox"
        name="difficulty"
        id={text1}
        className="md:w-[35px] md:h-[35px] xl:w-[45px] xl:h-[45px] border-[3px] rounded-md border-palette-green bg-transparent cursor-pointer checkbox checkbox-primary xxs:w-[20px] xxs:h-[20px]"
      />
    </div>
  );
}

export default Mode;
