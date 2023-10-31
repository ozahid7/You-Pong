import {
    Acheivement,
    AnimatedText,
    Banner,
    CustomButton,
    MyContainer,
    MyInput,
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
                        <div className="w-[40%] aspect-square">
                            <Acheivement isOpened={true} text='play more than three games with friends' />
                        </div>
                    </div>
                </MyContainer>
            </div>
        </div>
    );
}
