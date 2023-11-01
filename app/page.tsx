"use client";
import { CustomButton, MyContainer } from "@/components";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import { landing_page_description } from "@/const";

export default function Home() {
    return (
        <main className="h-full w-full relative xl:w-[90%]">
            <section className="w-full h-[16%] dred flex justify-end items-center relative sm:pr-10 pr-2">
                <Image
                    src="/youponglogo.png"
                    alt="logo"
                    height={120}
                    width={120}
                    className="object-contain aspect-square h-[60%] w-[20%] max-w-[120px] dred  absolute top-50 left-4 sm:top-8 h:left-10 drop-shadow-lg"
                />
                <div className="h-[80%] max-w-[140px] h:max-w-[500px] dblue w-[71%]  flex h:flex-row h:justify-end h:items-center h:space-y-0 h:space-x-10 flex-col  justify-center space-y-2 items-end">
                    <CustomButton text="Sign In" color="transparent" />
                    <CustomButton text="Sign Up" color="transparent" />
                </div>
            </section>
            <section className="dblue h-[84%] overflow-hidden absolute translate-x-[-50%] left-[50%] w-[90%] flex justify-around">
                <section className="dred">
                    <div className="h-[60%] dgreen flex flex-col justify-around">
                        <div className="">
                            <h1 className="text-white text-8xl font-audio drop-shadow-lg font-extrabold">
                                TRANSCENDENCE
                            </h1>
                            <h2 className="text-palette-orange text-8xl font-bold drop-shadow-lg font-roboto">
                                PONG GAME
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-palette-grey text-6xl drop-shadow-lg font-nunito">
                                42 PROJECT
                            </h2>
                            <p className="text-left text-palette-grey font-light max-w-[600px]">
                                {landing_page_description}
                            </p>
                        </div>
                    </div>
                    <div className="dred h-[40%]">
                        <CustomButton text="GET STARTED" color="orange"/>
                    </div>
                </section>
                <section className="dgreen">
                    <Image
                    src="/sidelogo.png"
                    alt='logo'
                    height={1100}
                    width={1100}
                    className="object-contain aspect-square flex justify-start dred"
                    />
                </section>
            </section>
        </main>
    );
}
