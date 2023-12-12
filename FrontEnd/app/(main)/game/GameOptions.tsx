"use client";
import {
    Background,
    MyContainer,
    Map,
    CustomButton,
    Mode,
    MyDialog,
} from "@/components";
import { useEffect, useState } from "react";

export default function GameSettings(props: {
    setMap: any;
    setMode: any;
    showPlayerLoader: any;
}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            <MyDialog
                isOpen={isOpen}
                closemodal={() => {}}
                withCorner={true}
                withClose={true}
                customClass="absolute h-[50%] md:h-[60%] min-h-[600px] lg-h-[64%] w-[80%] max-w-[1100px]"
                conClass="bg-palette-grey border-4 rounded-md border-palette-white "
            >
                <div className="flex items-center  flex-col h-full">
                    <div className="w-full h-[10%]">
                        <h1 className="text-cardtitle pb-8 sm:pb-0 font-['Chakra_Petch']  font-extrabold text-lg sm:text-2xl h:text-xl md:text-4xl">
                            Game Options
                        </h1>
                    </div>
                    <div className="flex flex-col h-[94%] w-full justify-around">
                        <div className="w-full space-y-3">
                            <h2 className="text-[#686868] font-roboto md:text-xl text-sm ">
                                Choose a map
                            </h2>
                            <div className="flex  flex-col w-full items-center h:justify-around h:flex-row  md:gap-3 gap-2">
                                <Map
                                    elements="#EB6440"
                                    border="#EB6440"
                                    background="white"
                                    handelClick={() => {
                                        props.setMap("orange");
                                    }}
                                ></Map>
                                <Map
                                    elements="white"
                                    border="white"
                                    background="black"
                                    handelClick={() => {
                                        props.setMap("black");
                                    }}
                                ></Map>
                                <Map
                                    elements="#497174"
                                    border="#D6E4E5"
                                    background="#EFF5F5"
                                    handelClick={() => {
                                        props.setMap("green");
                                    }}
                                ></Map>
                            </div>
                        </div>
                        <div className="w-full mt-2 space-y-3 h-auto">
                            <div className="">
                                <h2 className="text-[#686868] font-roboto md:text-xl text-sm">
                                    Choose a mode
                                </h2>
                            </div>
                            <div className="flex w-full justify-evenly">
                                <Mode
                                    handelClick={() => {
                                        props.setMode("hard");
                                    }}
                                    text="Hard"
                                />
                                <Mode
                                    handelClick={() => {
                                        props.setMode("easy");
                                    }}
                                    text="Easy"
                                />
                            </div>
                        </div>
                        <div className="min-h-[40px] sm:min-h-[56px] md:min-h-[62px] flex justify-center  items-center w-full">
                            <CustomButton
                                text="Play"
                                color="orange"
                                otherclass="max-w-[300px] mt-10 w-[60%] min-h-[50px]"
                                handleclick={() => {
                                    setIsOpen(false);
                                    props.showPlayerLoader(true);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </MyDialog>
        </>
    );
}
