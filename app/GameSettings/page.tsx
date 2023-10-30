import { Background, MyContainer, Map } from "@/components";
import Image from "next/image";
import arrow from "./img/Arrow_back.svg";
import "../globals.css";
import "../input.css";

export default function GameSettings() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex w-[90%] h-[85%]">
        <MyContainer>
          <div className="w-[100%] h-[4%]"></div>
          <div className="w-[100%] h-[96%]">
            <Background>
              <h1 className="text-[#424242] font-['Chakra_Petch'] font-[700] w-fit h-fit xxs:text-[80%]">
                Game Settings
              </h1>
              <h2 className="text-[#686868] font-['Cairo'] font-[500] w-fit h-fit xxs:text-[70%]">
                Choose a map
              </h2>
              <div className="flex justify-evenly h-[30%] xxs:w-[80%] gap-2 2xl:gap-16">
                  <Map elements="#497174" border="#D6E4E5" ></Map>
                  <Map elements="white" border="#D6E4E5" ></Map>
                  {/* <Map color="black"></Map> */}
              </div>
            </Background>
          </div>
        </MyContainer>
      </div>
    </div>
  );
}
