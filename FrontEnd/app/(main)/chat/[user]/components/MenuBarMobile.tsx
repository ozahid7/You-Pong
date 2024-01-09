import React from "react";
import { FiMenu as Icon } from "react-icons/fi";


export default function MenuBarMobile({ setter }) {
  return (
    <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-palette-grey flex [&>*]:my-auto px-2">
      <button
        className="text-4xl flex text-white"
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
      >
        <Icon />
      </button>
    </nav>
  );
}
