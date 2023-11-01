"use client";
import { CustomButton, MyContainer } from "@/components";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";
import { landing_page_description } from "@/const";

export default function Home() {
    return (
        <main className="h-full w-full relative xl:w-[90%]">
            <section className="w-full h-[16%] dred flex flex-col sm:flex-row justify-around sm:justify-between items-center relative px-2 sm:px-10">
                <Image
                    src="/youponglogo.png"
                    alt="logo"
                    height={120}
                    width={120}
                    className="object-contain aspect-square h-[40%] s:h-[60%] lg:h-[100%] w-[20%] max-w-[120px] dred drop-shadow-lg"
                />
                <div className="dblue sm:w-[60%] max-w-[540px] sm:h-[60%] w-full flex items-left justify-evenly items-center">
                    <Link
                        href="signin"
                        className="text-white dgreen text-2xl s:text-4xl drop-shadow-lg block font-body font-bold"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="signup"
                        className="text-white sm:hidden dgreen text-2xl s:text-4xl drop-shadow-lg block font-body font-bold"
                    >
                        Sign Up
                    </Link>
                    <div className="w-[50%] hidden h-full sm:flex items-center">
                        <CustomButton text="Sign Up" color="transparent" />
                    </div>
                </div>
            </section>
        </main>
    );
}
