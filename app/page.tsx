
import { AnimatedText, Banner, MyContainer } from "@/components";
import Image from "next/image";
import "./globals.css";
import MyToggle from "@/components/MyToggle";

export default function Home() {
    return (
        <div className="h-full w-full make_center">
            <div className="flex justify-center w-[90%] h-[80%]">
                <MyContainer>
                    <div className=" make_center h-[100%] overflow-auto">
                        <MyToggle
                            
                        />
                    </div>
                </MyContainer>
            </div>
        </div>
    );
}
