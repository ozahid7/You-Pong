import { Background, MyContainer, Map, CustomButton } from "@/components";
import Image from "next/image";
import arrow from "./img/Arrow_back.svg";
import "../globals.css";
import "../input.css";

export default function GameSettings() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex w-[90%] h-[85%]">
        <MyContainer>
          <div className="w-[100%] h-[5%]"></div>
          <div className="flex w-[100%] h-[96%]">
            <Background>
              <h1 className="text-[#424242] font-['Chakra_Petch'] font-[700] w-fit h-fit xxs:text-[100%]">
                Game Settings
              </h1>
              <h2 className="text-[#686868] font-['Cairo'] font-[500] w-fit h-fit xxs:text-[70%]">
                Choose a map
              </h2>
              <div className="flex flex-col w-[70%] gap-3">
                <Map
                  elements="#497174"
                  border="#D6E4E5"
                  background="#EFF5F5"
                ></Map>
                <Map
                  elements="white"
                  border="black"
                  background="black"
                ></Map>
                <Map
                  elements="#EB6440"
                  border="#EB6440"
                  background="white"
                ></Map>
              </div>
              <h2 className="text-[#686868] font-['Cairo'] font-[500] w-fit h-fit xxs:text-[70%]">
                Choose a mode
              </h2>
              <div className="flex w-[80%] h-[40%] justify-evenly">
                <div className="flex w-[45%] h-fit border-[2px] border-palette-green justify-evenly items-center">
                  <label
                    htmlFor="easy"
                    className="font-['Chakra_Petch'] text-[#497174] font-[700] text-[20px]"
                  >
                    Easy
                  </label>
                  <input
                    type="checkbox"
                    name="difficulty"
                    id="easy"
                  />
                </div>
                <div className="flex w-[45%] h-fit border-[2px] border-palette-green justify-evenly items-center">
                  <label
                    htmlFor="hard"
                    className="font-['Chakra_Petch'] text-[#497174] font-[700] text-[20px]"
                  >
                    Hard
                  </label>
                  <input
                    type="checkbox"
                    name="difficulty"
                    id="hard"
                  />
                </div>
              </div>
              <div className="w-[65%]">
                <CustomButton color="orange" text="PLAY"/>
              </div>
            </Background>
          </div>
        </MyContainer>
      </div>
    </div>
  );
}
