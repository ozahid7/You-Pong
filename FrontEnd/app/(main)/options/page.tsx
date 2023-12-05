import { Background, MyContainer, Map, CustomButton, Mode } from "@/components";

export default function GameSettings() {
  return (
    <div className="flex w-full h-[90%] justify-center items-center">
      <div className="flex w-[88%] h-[90%]">
        <MyContainer>
          <div className="flex w-full h-full min-h-[900px] flex-col py-5 ">
            <Background>
              <h1 className="text-[#424242] font-['Chakra_Petch'] font-[700] w-fit h-fit text-[20px] s:text-[25px] md_:text-[38px] xl_:text-[45px]">
                Game Options
              </h1>
              <h2 className="text-[#686868] font-['Cairo'] font-[600] w-fit h-fit text-[15px] s:text-[20px] md_:text-[26px] xl_:text-[30px]">
                Choose a map
              </h2>
              <div className="flex flex-col justify-evenly md:flex-row w-[70%] s:w-[85%] sm_:w-[50%] md_:w-[80%] 2xl_:w-[95%] md_:gap-1 xl_:gap-0 xl_:w-[92%] lg_:w-[100%] gap-3">
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
              <h2 className="text-[#686868] font-['Cairo'] font-[600] w-fit h-fit text-[15px] s:text-[20px] md_:text-[26px] xl_:text-[30px]">
                Choose a mode
              </h2>
              <div className="flex w-[90%] h-fit justify-evenly">
                <Mode text="Easy" />
                <Mode text="Hard" />
              </div>
              <div className="flex w-full xxs_:w-[70%] h-[7%] justify-center items-center">
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
