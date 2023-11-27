"use client";
import { CustomButton, MyContainer, TwoFactor, SignIn, SignUp } from "@/components";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import { landing_page_description } from "@/const";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();



export default function Home() {
    const [showSignup, setSignUp] = useState(false);
    const [showSingIn, setSingIn] = useState(false);
    const [showTwoFactor, setTwoFactor] = useState(false);
    
    return (
        <QueryClientProvider client={queryClient}>
            <div className="h-full  w-full relative max-w-[1600px] xl:w-[90%]">
                {/* top part */}
                <section className="w-ful z-10 h-[16%] flex flex-col sm:flex-row justify-around sm:justify-between items-center relative px-2 sm:px-10">
                    <img
                        src="/youponglogo.png"
                        alt="logo"
                        height={120}
                        width={120}
                        className="object-contain aspect-square h-[40%] sm:h-[60%] lg:h-[100%] w-[20%] max-w-[120px] drop-shadow-lg"
                    />
                    <div className=" sm:w-[60%] max-w-[540px] sm:h-[60%] w-full flex items-left justify-evenly items-center">
                        <div
                            onClick={() => {
                                setSingIn(true);
                            }}
                            className="text-white mt-1 sm:mt-2 hover:scale-110 sm:hidden  text-2xl s:text-3xl lg:text-4xl drop-shadow-lg block font-body font-bold"
                        >
                            Sign In
                            <hr className="border-2 border-palette-orange rounded-sm mt-1 sm:mt-2" />
                        </div>
                        <div
                            onClick={() => {
                                setSignUp(true);
                            }}
                            className="text-white sm:hidden hover:scale-110  text-2xl mt-1 sm:mt-2 s:text-3xl lg:text-4xl drop-shadow-lg block font-body font-bold"
                        >
                            Sign Up
                            <hr className="border-2 border-palette-orange rounded-sm mt-1 sm:mt-2" />
                        </div>
                        <div className="w-[40%] h:w-[40%] hidden h-[50%] lg:h-full sm:flex items-center">
                            <CustomButton
                                text="Sign In"
                                color="signin_button"
                                otherclass=""
                                handleclick={() => setSingIn(true)}
                            />
                        </div>
                        <div className="w-[40%] h:w-[40%] hidden h-[50%] lg:h-full sm:flex items-center">
                            <CustomButton
                                text="Sign Up"
                                color="transparent"
                                otherclass=""
                                handleclick={() => setSignUp(true)}
                            />
                        </div>
                    </div>
                </section>
                {/* middle part */}
                <section className="flex flex-col xl:flex-row relative mx-auto">
                    <div className="flex flex-col xl:w-[50%] pt-20 xl:pt-36 2xl:mt-10 pl-3 h:px-6 sm:px-14">
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
                        <div className="min-h-[76px]  flex justify-center md:justify-start  items-center w-full h-1 mt-6 xl:mt-10">
                            <CustomButton
                                text="GET STARTED"
                                color="orange"
                                otherclass="w-[40%] lg:w-full"
                                handleclick={() => setTwoFactor(true)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end z-0 items-center w-full xl:w-[50%] mt-10 xl:mt-60 2xl:mt-24">
                        <div className="relative w-full 2xl:w-[90%] lg:w-80% md:h-[590px] xl:h-[690px] 2xl:h-[800px] h:h-[400px] h-[360px] flex justify-center">
                            <img
                                alt="machine"
                                src="/sidelogo.png"
                                className="object-contain"
                            />
                        </div>
                    </div>
                </section>
                <SignUp
                    isOpen={showSignup}
                    closemodal={setSignUp}
                    showSignIn={() => setSingIn(!showSingIn)}
                />
                <SignIn
                    isOpen={showSingIn}
                    closemodal={setSingIn}
                    showSignUp={() => setSignUp(!showSignup)}
                />
                <TwoFactor
                    isEnabled={true}
                    isOpen={showTwoFactor}
                    closemodal={setTwoFactor}
                />
            </div>
        </QueryClientProvider>
    );
}
