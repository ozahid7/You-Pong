"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { useState, Fragment } from "react";
import { MyDialog } from "..";

const Loader = () => {
    return (
        <div className="h-full bg-black/5 backdrop-blur-md  w-full make_center">
            
        <div className="absolute bg-palette-grey w-[70%] h-[20%] border-4 transition-shadow border-palette-white max-w-[600px] min-w-[240px] min-h-[300px]">
            <div className="flex items-center justify-center pb-4 space-y-4 flex-col-reverse md:flex-row h-full overflow-auto">
                <span className=" text-5xl md:text-6xl font-body pt-8 font-extrabold text-palette-green drop-shadow ">
                    Loading
                </span>
                <div className="wrapper">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                    <div className="shadow"></div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Loader;
