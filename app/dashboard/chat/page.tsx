import { Background, MyContainer, CustomButton } from "@/components";

export default function GameSettings() {
  return (
    <div className="flex w-full h-[90%] justify-center items-center">
      <div className="flex w-[88%] h-[90%]">
        <MyContainer>
          <div className="flex w-full h-full min-h-[900px] flex-col py-5 ">
            <Background>
              <div className="flex flex-row w-full h-full debug">
                <div className="flex h-full w-[45%] flex-col">
                  <div className="flex w-full h-[15%] justify-center items-center">
                    <h1 className="flex w-[90%] h-fit text-[#424242] text-shadow-xl font-['Chakra_Petch'] text-[32px] font-[700] leading-normal not-italic"
                      style={{ textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)" }}>
                      Chats
                    </h1>
                  </div>
                  <div className="flex w-full h-[50px] self-center justify-center">
                    <input
                      className="search"
                      placeholder="Search"
                    />
                  </div>
                  <div className="flex h-[70%] w-full flex-row">
                    <div className="flex h-full w-full flex-col ">
                      <div className="flex flex-row w-full h-fit">
                        <ul className="flex flex-row w-full h-full">
                          <li className="me-2 w-full">
                            <button className="text-[20px] text-[#686868] font-[600] inline-block p-4 border-b-2 rounded-t-lg hover:text-[#424242] hover:border-gray-300 dark:hover:text-gray-300">
                              DIRECT
                            </button>
                          </li>
                          <li className="me-2 w-full">
                            <button className="text-[20px] text-[#686868] font-[600] inline-block p-4 border-b-2 rounded-t-lg hover:text-[#424242] hover:border-gray-300 dark:hover:text-gray-300">
                              GROUPS
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="flex h-full w-full">
                        <div className="hidden">
                          <p>THIS IS DIRECT</p>
                        </div>
                        <div className="hidden">
                          <p>THIS IS GROUPS</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-full w-full"></div>
              </div>
            </Background>
          </div>
        </MyContainer>
      </div>
    </div>
  );
}
