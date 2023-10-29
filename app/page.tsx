import { AnimatedText, Banner, MyContainer } from "@/components";
import Image from "next/image";
import "./globals.css";
import "./input.css";

export default function Home() {
   
    return (
        <div className="flex justify-center py-20 w-[90%] h-[83vh]">
            <MyContainer>
                <div className="dred make_center h-[100%] overflow-auto">
                </div>
            </MyContainer>
        </div>
    );
}
