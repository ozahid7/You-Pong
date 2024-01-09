import React, { useState, useEffect } from "react";
import Link from "next/link";

import { SlHome } from "react-icons/sl";
import { BsInfoSquare, BsEnvelopeAt } from "react-icons/bs";
import { FaTshirt, FaRedhat } from "react-icons/fa";

import { usePathname } from "next/navigation";

export default function Sidebar({ show, setter, children }) {
  // Define our base class
  const className =
    "bg-palette-grey w-[92%] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0  left-0 z-40 h-full ";
  // Append class based on state of sidebar visiblity
  const appendClass = show ? " ml-0" : " ml-[-92%] md:ml-0";

  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-palette-grey/20 z-30`}
      onClick={() => {
        setter((oldVal) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="flex flex-col h-full w-full">{children}</div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
