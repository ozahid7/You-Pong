import React from "react";
import Image from "next/image";
import { LuUnlock, LuLock } from "react-icons/lu";
import { AnimatedText } from "..";

const Acheivement = () => {
    return (
        <main className="w-full h-full dblue overflow-hidden">
            <section className="h-[74%] make_center w-full dred bg-palette-green rounded-t-md relative">
                <div className="h-auto  w-auto absolute top-0 h:top-1 right-2 md:top-3 md:right-3">
                    <LuUnlock
                        size={25}
                        className="w-2 xs:w-3 h:w-6 text-white"
                    />
                </div>
                <div className="h-full w-full make_center backdrop-blur-[5px] overflow-hidden rounded-md  z-10">
                    <LuLock size={100} className=" text-white w-10 sm:w-20 drop-shadow-xl " />
                </div>
                <Image
                    src="/badge.png"
                    alt="badge"
                    height={200}
                    width={200}
                    className="object-contain absolute aspect-square w-[60%]"
                />
            </section>
            <section className="make_center w-full h-[26%] dred bg-palette-orange rounded-b-md px-1">
                <AnimatedText
                    text="fix more than threee things hello word"
                    limit={20}
                    maxwidth="max-w-full"
                    color="text-white"
                />
            </section>
        </main>
    );
};

export default Acheivement;
