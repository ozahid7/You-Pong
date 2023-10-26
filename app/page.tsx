import { MyContainer } from "@/components";
import Image from "next/image";
import "./globals.css";


export default function Home() {
    return (
        <div className="flex justify-center mt-16  w-full h-[80vh]">
           <MyContainer>
            <div className="h-[100%] w-[100%] dred"></div>
           </MyContainer>
        </div>
    );
}
