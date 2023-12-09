import React from "react";
import { twMerge } from "tailwind-merge";

function MiniLoader(props: {customClass?: string}) {

    const classname = twMerge(
        "flex text-[100px] items-center h-full loading text-palette-orange loading-lg", props.customClass
    );

    return (
        <div className={classname}></div>
    );
}

export default MiniLoader;
