
import {
    AnimatedText,
    Banner,
    CustomButton,
    MyContainer,
    CustomInput,
} from "@/components";
import Image from "next/image";
import "./globals.css";
import MyToggle from "@/components/tools/MyToggle";

export default function Home() {
    return (
        <div className="h-full w-full make_center">
            <div className="flex justify-center w-[90%] h-[80%]">
                <MyContainer>
                    <div className=" make_center h-[100%] overflow-auto">
                        {/* <CustomInput /> */}

                        <Banner 
                            isGreen={true}
                            userName="ozahiggd-"
                        />
                    </div>
                </MyContainer>
            </div>
        </div>
    );
}
