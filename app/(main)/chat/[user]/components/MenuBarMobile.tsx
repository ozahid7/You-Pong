import React from "react";
import { FiMenu as Icon } from "react-icons/fi";

export default function MenuBarMobile({ setter }) {
  return (
    <nav className="ml-[10px] mr-[10px] mt-[5px] md:hidden z-20 fixed top-0 left-0 right-0 h-[50px] bg-palette-grey flex [&>*]:my-auto md:px-2 items-center">
      <button
        className="w-fit text-4xl flex text-palette-green "
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
      >
        <Icon />
      </button>
      <div className="flex w-full">
        <div className="flex w-full md:w-[90px] h-[10%] justify-center items-center">
          <h1
            className="flex w-fit md:w-[90%] h-fit text-[#424242] text-shadow-xl font-['Chakra_Petch'] font-[700] leading-normal not-italic 2xl:text-[32px] xl:text-[30px] md:text-[25px] text-[30px]"
            style={{
              textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
            }}
          >
            Chats
          </h1>
        </div>
      </div>
    </nav>
  );
}
