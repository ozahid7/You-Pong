import React from "react";

export default function Sidebar({ show, setter, children }) {
  const className =
    "bg-palette-grey w-[80%] md:w-full transition-[margin-left] ease-in-out duration-500 fixed md:static top-0  left-0 z-40 h-full ";
  // sidebar visiblity
  const appendClass = show ? " ml-0" : " ml-[-92%] md:ml-0";

  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 backdrop-blur z-30`}
      onClick={() => {
        setter((oldVal) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className="flex flex-col h-full w-full border-[5px] rounded-md border-palette-white md:border-none">
          {children}
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
