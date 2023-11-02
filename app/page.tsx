"use client";
import { CustomButton, MyContainer } from "@/components";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import { landing_page_description } from "@/const";

export default function Home() {
    return (
        <div className="h-full w-full relative max-w-[1800px] xl:w-[90%]">
            {/* top part */}
            <section className="w-ful   z-10 h-[16%] flex flex-col sm:flex-row justify-around sm:justify-between items-center relative px-2 sm:px-10">
                <Image
                    src="/youponglogo.png"
                    alt="logo"
                    height={120}
                    width={120}
                    className="object-contain aspect-square h-[40%] sm:h-[60%] lg:h-[100%] w-[20%] max-w-[120px] drop-shadow-lg"
                />
                <div className=" sm:w-[60%] max-w-[540px] sm:h-[60%] w-full flex items-left justify-evenly items-center">
                    <Link
                        href="signin"
                        className="text-white mt-1 sm:mt-2  text-2xl s:text-4xl drop-shadow-lg block font-body font-bold"
                    >
                        Sign In
                        <hr className="border-2 border-palette-orange rounded-sm mt-1 sm:mt-2" />
                    </Link>
                    <Link
                        href="signup"
                        className="text-white sm:hidden text-2xl mt-1 sm:mt-2 s:text-4xl drop-shadow-lg block font-body font-bold"
                    >
                        Sign Up
                        <hr className="border-2 border-palette-orange rounded-sm mt-1 sm:mt-2" />
                    </Link>
                    <div className="w-[50%] hidden h-full sm:flex items-center">
                        <CustomButton text="Sign Up" color="transparent" />
                    </div>
                </div>
            </section>
            <section className="flex dred flex-col xl:flex-row relative z-0 mx-auto">
                <div className="flex flex-col xl:w-[50%]  pt-20 xl:pt-36 pl-3 h:px-6 sm:px-14">
                    <h1 className="font-extrabold s:text-3xl text-white font-audio drop-shadow-lg md:text-6xl lg:text-7xl text-2xl h:text-4xl sm:text-5xl">
                        TRANSCENDENCE
                    </h1>
                    <h2 className="text-2xl  h:text-4xl s:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-roboto font-extrabold text-palette-orange drop-shadow-md mt-1 sm:mt-4 ">
                        PONG GAME
                    </h2>
                    <h3 className="text-2xl h:text-3xl sm:text-4xl  xl:text-5xl font-teko drop-shadow-sm font-bold text-palette-white mt-8 xl:mt-24 s:mt-14">
                        42 Project
                    </h3>
                    <p className="max-w-[600px] text-palette-grey font-light pr-2">
                        {landing_page_description}
                    </p>
                    <div className="min-h-[76px] hidden xl:flex items-center w-[64%] h-1 mt-6 xl:mt-10">
                        <CustomButton text="GET STARTED" color="orange" />
                    </div>
                </div>

                <div className="flex dgreen justify-end items-center xl:h-[74vh] w-full xl:w-[50%] mt-10 xl:mt-36 2xl:mt-20">
                    <div className="relative w-[100%] 2xl:w-[90%] lg:w-80% md:h-[590px] xl:h-[690px] 2xl:h-[800px] sm:h-[500px] h:h-[400px] h-[360px] flex justify-center z-0">
                        <Image
                            alt="machine"
                            src="/sidelogo.png"
                            fill
                            className="object-contain aspect-square dblue "
                        />
                    </div>
                </div>

                <div className="min-h-[40px] h:min-h-[76px] xl:hidden flex items-center justify-center w-[100%] h-1 mt-20 mb-20">
                    <div className="sm:w-full w-[60%] h-full  flex justify-center max-w-[300px] items-center">
                        <CustomButton text="GET STARTED" color="orange" />
                    </div>
                </div>
            </section>
        </div>
    );
}
