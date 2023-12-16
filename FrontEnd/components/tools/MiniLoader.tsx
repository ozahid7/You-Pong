import React from "react";
import { twMerge } from "tailwind-merge";

function MiniLoader(props: { customClass?: string }) {
    const classname = twMerge(
        "flex items-center h-full justify-center items-center",
        props.customClass
    );

    return (
        <div className={classname}>
            <span className="mini-loader"></span>
        </div>
    );
}

export default MiniLoader;
