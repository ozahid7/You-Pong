"use client";
import {
    Map,
    CustomButton,
    Mode,
    MyDialog,
} from "@/components";
import { myRoutes } from "@/const";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdCancelPresentation } from "react-icons/md";

export default function GameSettings(props: {
    setMap: any;
    setMode: any;
    showPlayerLoader: any;
}) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <MyDialog
                isOpen={isOpen}
                closemodal={() => {router.push(myRoutes.dashboard);}}
                withCorner={true}
                withClose={true}
                customClass="absolute h-[40%] md:h-[60%] min-h-[600px] lg-h-[64%] w-[80%] max-w-[1100px]"
                conClass="bg-palette-grey border-4 rounded-md border-palette-white "
            >
                <MdCancelPresentation
                    size={25}
                    onClick={() =>{router.push(myRoutes.dashboard)}}
                    className="absolute z-10 text-gray-400  cursor-pointer  top-0 right-0  rounded-sm"
                />
                <div className="flex items-center  flex-col h-full">
                    <div className="w-full h-[10%]">
                        <h1 className="text-cardtitle pb-8 sm:pb-0 font-['Chakra_Petch']  font-extrabold text-lg sm:text-2xl h:text-xl md:text-4xl">
                            Game Options
                        </h1>
                    </div>
                    <div className="flex flex-col h-[94%] w-full justify-around">
                        <div className="w-full space-y-4">
                            <h2 className="text-[#686868] font-roboto md:text-xl text-sm ">
                                Choose a map
                            </h2>
                            <div className="flex  flex-col w-full items-center h:justify-around h:flex-row  md:gap-3 gap-2">
                                <Map handelClick={props.setMap} />
                            </div>
                        </div>
                        <div className="w-full mt-2 space-y-3 h-auto">
                            <div className="">
                                <h2 className="text-[#686868] font-roboto md:text-xl text-sm">
                                    Choose a mode
                                </h2>
                            </div>
                            <div className="flex w-full justify-evenly">
                                <Mode handelClick={props.setMode} text="" />
                            </div>
                        </div>
                        <div className="min-h-[30px] sm:min-h-[40px] md:min-h-[50px] flex justify-center  items-center w-full">
                            <CustomButton
                                text="Play"
                                color="orange"
                                otherclass="max-w-[300px] mt-10 w-[60%] min-h-[40px]"
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
