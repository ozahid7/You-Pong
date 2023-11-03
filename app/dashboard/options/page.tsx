import { Background, MyContainer, Map, CustomButton, Mode } from "@/components";
import Image from "next/image";
import arrow from "./img/Arrow_back.svg";

export default function GameSettings() {
  return (
    <div className="flex w-full h-[90%] justify-center items-center">
      <div className="flex w-[88%] h-[90%]">
        <MyContainer>
          <div className="flex w-full h-full min-h-[900px] flex-col py-5 ">
            <Background>
              <h1 className="text-[#424242] font-['Chakra_Petch'] font-[700] w-fit h-fit text-[20px] s:text-[25px] md:text-[38px] xl:text-[45px]">
                Game Options
              </h1>
              <h2 className="text-[#686868] font-['Cairo'] font-[600] w-fit h-fit text-[15px] s:text-[20px] md:text-[26px] xl:text-[30px]">
                Choose a map
              </h2>
              <div className="flex flex-col justify-evenly md:flex-row w-[70%] s:w-[85%] sm:w-[50%] md:w-[100%] 2xl:w-[95%] md:gap-1 xl:gap-0 gap-3">
                <Map
                  elements="#497174"
                  border="#D6E4E5"
                  background="#EFF5F5"
                ></Map>
                <Map
                  elements="white"
                  border="white"
                  background="black"
                ></Map>
                <Map
                  elements="#EB6440"
                  border="#EB6440"
                  background="white"
                ></Map>
              </div>
              <h2 className="text-[#686868] font-['Cairo'] font-[600] w-fit h-fit text-[15px] s:text-[20px] md:text-[26px] xl:text-[30px]">
                Choose a mode
              </h2>
              <div className="flex w-[90%] h-fit justify-evenly">
                <Mode text="Easy" />
                <Mode text="Hard" />
              </div>
              <div className="w-full xxs:w-[70%] xl:h-[7%]">
                <CustomButton
                  color="orange"
                  text="Play"
                />
              </div>
            </Background>
          </div>
        </MyContainer>
      </div>
    </div>
  );
}
