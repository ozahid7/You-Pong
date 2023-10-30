import "./style/GameSettings.css";
import Image from "next/image";
import arrow from "../../../public/Arrow_back.svg";

export default function GameSettings() {
  return (
    <div
      className="flex w-screen h-screen justify-evenly items-center overflow-scroll
      fold:flex-col
      md:grid md:flex-row md:grid-cols-[0.3fr_1.7fr] md:grid-rows-[0.2fr_1.8fr] md:gap-[0%_5%] md:items-center"
    >
      <div
        className="bg-[#497174] w-[90%] h-[8%]
        md:row-start-1 md:row-end-6 md:col-start-1 md:col-end-2 md:w-[100%] md:h-[100%]"
      >
        sidebar
      </div>
      <div
        className="flex fold:bg-white max-w-[1540px] flex-col justify-center items-center shadow-[0px_4px_0px_1px_#BDBDBD] 
        fold:w-[95%] fold:h-[80%] fold:min-h-[300px] fold:max-h-[900px]
        md:w-[98%] md:h-[98%] md:row-start-2 md:row-end-6 md:col-start-2 md:col-end-6 md:justify-center"
      >
        <div className="flex fold:w-[98%] fold:h-[6%]">
          <button className="flex fold:w-[20px] fold:h-[20px] justify-center items-center border-[2.5px] border-[#9C9C9C]">
            <Image
              src={arrow}
              alt="arrow"
            />
          </button>
        </div>
        <div className="flex bg-[#D6E4E5] w-[90%] h-[88%] border-[6px] border-[#EFF5F5] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-evenly items-center     flex-col">
          <h1
            className="font-['Chakra_Petch'] text-[#424242] font-[700] w-fit h-fit self-center
            fold:text-[20px] xsm:text-[30px] xl:text-[35px] 2xl:text-[40px]"
          >
            Game Settings
          </h1>
          <h2
            className="font-['Cairo'] text-[#686868] font-[500] w-fit h-fit
            fold:text-[16px] xsm:text-[22px] xl:text-[26px] 2xl:text-[30px]"
          >
            Choose a map
          </h2>
          <div
            className="flex w-[98%] h-[28%] self-center flex-row justify-evenly items-center
            2xl:w-[95%]"
            
          >
            <div className="flex h-[100%] w-[30%] flex-col justify-between">
              <div className="flex h-[100%] w-full bg-[#EFF5F5] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-center rounded-[4px]">
                <button
                  className="flex w-[88%] h-[84%] border-[#D6E4E5] border-[6px] self-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-around flex-col hover:bg-[#EFF5F5] hover:scale-110 hover:duration-[0.2s] hover:shadow-[0_12px_16px_0_rgba(0,0,0,0.24),0_17px_50px_0_rgba(0,0,0,0.19)] hover:border-[none]
                  fold:border-[2px] xsm:border-[3px] lg:border-[5px]"
                >
                  <div className="flex h-[90%] w-full justify-between flex-col">
                    <div
                      className="flex bg-[#497174] w-[28%] h-[2%] self-center
                  lg:h-[3%]"
                    ></div>
                    <div
                      className="flex bg-[#497174] w-[5%] h-[3%] self-center rounded-[50%]
                    sm:w-[5%] sm:h-[4%]
                    md:w-[4%] md:sm-[4%]
                    lg:w-[4%] lg:h-[5%]
                    xl:w-[3%] xl:h-[5%]
                    2xl:w-[3%] 2xl:h-[6%]"
                    ></div>
                    <div
                      className="flex bg-[#497174] w-[28%] h-[2%] self-center
                  lg:h-[3%]"
                    ></div>
                  </div>
                </button>
              </div>
              <div className="flex items-center justify-center h-[20%]">
                <p
                  className="font-['Chakra_Petch'] text-[#686868] font-[700] w-fit h-fit underline
                fold:text-[10px] xsm:text-[15px]"
                >
                  Green map
                </p>
              </div>
            </div>
            <div className="flex h-[100%] w-[30%] flex-col justify-between">
              <div className="flex h-[100%] w-full bg-[#EFF5F5] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-center rounded-[4px]">
                <button
                  className="flex w-[88%] h-[84%] border-[#D6E4E5] border-[6px] self-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-around flex-col hover:bg-[black] hover:scale-110 hover:duration-[0.2s] hover:shadow-[0_12px_16px_0_rgba(0,0,0,0.24),0_17px_50px_0_rgba(0,0,0,0.19)] hover:border-[none] bg-[black]
                fold:border-[2px] xsm:border-[3px] lg:border-[5px]"
                >
                  <div className="flex h-[90%] w-full justify-between flex-col">
                    <div
                      className="flex bg-[white] w-[28%] h-[2%] self-center
                    lg:h-[3%]"
                    ></div>
                    <div
                      className="flex bg-[white] w-[5%] h-[3%] self-center rounded-[50%]
                      sm:w-[5%] sm:h-[4%]
                      md:w-[4%] md:sm-[4%]
                      lg:w-[4%] lg:h-[5%]
                      xl:w-[3%] xl:h-[5%]
                      2xl:w-[3%] 2xl:h-[6%]"
                    ></div>
                    <div
                      className="flex bg-[white] w-[28%] h-[2%] self-center
                    lg:h-[3%]"
                    ></div>
                  </div>
                </button>
              </div>
              <div className="flex items-center justify-center h-[20%]">
                <p
                  className="font-['Chakra_Petch'] text-[#686868] font-[700] w-fit h-fit underline
                fold:text-[10px] xsm:text-[15px]"
                >
                  Classic map
                </p>
              </div>
            </div>
            <div className="flex h-[100%] w-[30%] flex-col justify-between">
              <div className="flex h-[100%] w-full bg-[#EFF5F5] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-center rounded-[4px]">
                <button
                  className="flex w-[88%] h-[84%] border-[#EB6440] border-[6px] self-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-around flex-col hover:bg-[#EFF5F5] hover:scale-110 hover:duration-[0.2s] hover:shadow-[0_12px_16px_0_rgba(0,0,0,0.24),0_17px_50px_0_rgba(0,0,0,0.19)] hover:border-[none]
                fold:border-[2px] xsm:border-[3px] lg:border-[5px]"
                >
                  <div className="flex h-[90%] w-full justify-between flex-col">
                    <div
                      className="flex bg-[#EB6440] w-[28%] h-[2%] self-center
                    lg:h-[3%]"
                    ></div>
                    <div
                      className="flex bg-[#EB6440] w-[5%] h-[3%] self-center rounded-[50%]
                      sm:w-[5%] sm:h-[4%]
                      md:w-[4%] md:sm-[4%]
                      lg:w-[4%] lg:h-[5%]
                      xl:w-[3%] xl:h-[5%]
                      2xl:w-[3%] 2xl:h-[6%]"
                    ></div>
                    <div
                      className="flex bg-[#EB6440] w-[28%] h-[2%] self-center
                    lg:h-[3%]"
                    ></div>
                  </div>
                </button>
              </div>
              <div className="flex items-center justify-center h-[20%]">
                <p
                  className="font-['Chakra_Petch'] text-[#686868] font-[700] w-fit h-fit underline
                fold:text-[10px] xsm:text-[15px]"
                >
                  Orange map
                </p>
              </div>
            </div>
          </div>
          <h2
            className="font-['Cairo'] text-[#686868] font-[500] w-fit h-fit
            fold:text-[16px] xsm:text-[22px] xl:text-[26px] 2xl:text-[30px]"
          >
            Choose a mode
          </h2>
          <div
            className="flex w-[80%] h-[10%] justify-between
            fold:w-[85%]
            lg:w-[80%] lg:h-[8%]
            2xl:h-[10%]"
          >
            <div
              className="flex flex-row border-[#497174] items-center w-[40%] h-full justify-around
            fold:border-[2px] xsm:border-[3px] lg:border-[3.5px] lg:w-[35%] 2xl:w-[30%] 2xl:justify-evenly"
            >
              <label
                className="font-['Chakra_Petch'] text-[#497174] font-[700]
              fold:text-[18px] xsm:text-[25px] lg:text-[30px] xl:text-[35px] 2xl:text-[40px]"
                htmlFor="easy"
              >
                EASY
              </label>
              <input
                type="checkbox"
                name="difficulty"
                id="easy"
                className="flex self-center fold:h-[50%] fold:w-[30%]
                lg:w-[40%] lg:h-[60%]
                2xl:w-[40%] 2xl:h-[70%]"
              />
            </div>
            <div
              className="flex flex-row border-[#497174] items-center w-[40%] h-full justify-around
            fold:border-[2px] xsm:border-[3px] lg:border-[3.5px] lg:w-[35%] 2xl:w-[30%] 2xl:justify-evenly"
            >
              <label
                className="font-['Chakra_Petch'] text-[#497174] font-[700]
              fold:text-[18px] xsm:text-[25px] lg:text-[30px] xl:text-[35px] 2xl:text-[40px]"
                htmlFor="hard"
              >
                HARD
              </label>
              <input
                type="checkbox"
                name="difficulty"
                id="hard"
                className="flex self-center fold:h-[50%] fold:w-[30%]
                lg:w-[40%] lg:h-[60%]
                2xl:w-[40%] 2xl:h-[70%]"
              />
            </div>
          </div>
          <button
            className="flex justify-center border-[#D46345] bg-[#EB6440]
          fold:border-[2px] fold:w-[50%] fold:h-fit
          xsm:border-[3px] xsm:h-[12%]
          2xl:border-[5px] 2xl:h-[11%]"
          >
            <p
              className="flex w-fit h-fit text-[white] font-['Chakra_Petch'] font-[700] justify-center self-center
            fold:text-[30px] xsm:text-[36px] md:text-[40px] xl:text-[45px] 2xl:text-[50px]"
            >
              PLAY
            </p>
          </button>
        </div>
      </div>
      <div
        className="flex bg-[#497174] w-[90%] h-[8%]
        md:row-start-1 md:row-end-2 md:col-start-2 md:col-end-6 md:w-[80%%] md:h-[70%]"
      >
        navbar
      </div>
    </div>
  );
}
