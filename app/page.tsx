import { AnimatedText, Banner, MyContainer } from "@/components";
import Image from "next/image";
import "./globals.css";

export default function Home() {
    return (
        <div className="h-full w-full make_center">
            <div className="flex dred justify-center w-[100%] h-[90%]">
                <MyContainer>
                    <div className="dred make_center h-[100%] overflow-auto"></div>
                </MyContainer>
            </div>
        </div>
    );
}
