import { Banner, MyContainer } from "@/components";
import Image from "next/image";
import "./globals.css";
import "./input.css";

export default function Home() {
   
    return (
        <div className="flex justify-center mt-16  w-[90%] h-[80vh]">
            <MyContainer>
                <div className="dred make_center h-[100%]">
                    <Banner isGreen={true} userName="OZAHID-"/>
                </div>
            </MyContainer>
        </div>
    );
}
