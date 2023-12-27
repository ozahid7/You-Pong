"use client";
import { MyDialog } from "@/components";
import Loader from "@/components/tools/Loader";
import React, { useEffect, useState } from "react";

const PlayerLoader = (props: { isOpen: boolean, showCounter: any, showLoader: any }) => {
    const [isMatched, setIsmatched] = useState(false);

    useEffect(() => {
        if (!isMatched) {
            setTimeout(() => {
                setIsmatched(true);
                props.showLoader(false)
                props.showCounter(true)
            }, 5000);
        }
    }, [isMatched]);
    return (
        <MyDialog
            isOpen={props.isOpen}
            closemodal={() => {}}
            withCorner={true}
            withClose={true}
            customClass="absolute h-[40%] lg:h-[50%] min-h-[400px] w-[80%] max-w-[800px]"
            conClass="bg-palette-grey border-4 rounded-md border-palette-white "
        >
            <div className="flex items-center justify-center flex-col h-full">
                <div className="w-full flex flex-col h:flex-row h-full">
                    <div className="flex-1 flex flex-col justify-center items-center w-full">
                        <img
                            className="border-2 min-w-[40px] max-w-[80px] md:max-w-[120px] lg:max-w-[140px] xl:max-w-[180px] flex border-white rounded-sm object-contain"
                            src={"/avatar.jpeg"}
                            alt=""
                            width={500}
                            height={500}
                        />
                        <div className="flex w-full items-center flex-col">
                            <span className="font-body font-bold text-cardtitle text-xl md:text-2xl lg:text-3xl">
                                ozahid-
                            </span>
                            <span className="font-roboto text-cardtitle text-md">
                                Lvl: 0
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center items-center w-full">
                        <span className="text-6xl sm:text-7xl lg:text-8xl drop-shadow-md text-palette-orange font-audio font-extrabold ">
                            VS
                        </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center items-center w-full">
                        { isMatched ?
                            <div className="flex-1 flex flex-col justify-center items-center w-full">
                                <img
                                    className="border-2 min-w-[40px] max-w-[80px] md:max-w-[120px] lg:max-w-[140px] xl:max-w-[180px] flex border-white rounded-sm object-contain"
                                    src={"/avatar.jpeg"}
                                    alt=""
                                    width={500}
                                    height={500}
                                />
                                <div className="flex w-full items-center flex-col">
                                    <span className="font-body font-bold text-cardtitle text-xl md:text-2xl lg:text-3xl">
                                        ozahid-
                                    </span>
                                    <span className="font-roboto text-cardtitle text-md">
                                        Lvl: 0
                                    </span>
                                </div>
                            </div>
                            : <Loader/>
                        }
                    </div>
                </div>
            </div>
        </MyDialog>
    );
};

export default PlayerLoader;
