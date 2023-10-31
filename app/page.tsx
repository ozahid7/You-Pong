"use client";
import {
    Acheivement,
    AnimatedText,
    Banner,
    CustomButton,
    MyContainer,
    MyDropdown,
    MyInput,
} from "@/components";
import Image from "next/image";
import "./globals.css";
import MyToggle from "@/components/tools/MyToggle";

export default function Home() {
    const handle = () => {
        return <MyDropdown />;
    };
    return (
        <div className="h-full w-full make_center">
            <div className="flex justify-center w-[90%] h-[80%]">
                <MyContainer>
                    <div className=" make_center h-[100%] overflow-auto">
                        <MyDropdown/>
                    </div>
                </MyContainer>
            </div>
        </div>
    );
}
