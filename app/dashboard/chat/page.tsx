"use client";
import {
  Background,
  MyContainer,
  CustomButton,
  Tabs,
  SwipeableTabs,
  MiniChat,
  ChatDropdown,
} from "@/components";
import { useState } from "react";
import Image from "next/image";
import ozahid from "../../../public/ozahid-.jpeg";
import logo from "../../../public/sidebarlogo.png";
import { LuMoreHorizontal, LuSearch, LuSend } from "react-icons/lu";

export default function GameSettings() {
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  const [value, setValue] = useState<number>(0);
  return (
    <div className="flex w-full h-[90%] justify-center items-center">
      <div className="flex w-[88%] h-[90%]">
        <MyContainer>
          <div className="flex w-full h-full min-h-[900px] flex-col py-5 ">
            <Background>
              <div className="w-[95%] h-full">
                <div className="flex flex-row w-full h-full items-center ">
                  {/* SIDE DIV */}
                  <div className="flex h-[90%] w-[45%] flex-col justify-evenly gap-5 border-r-white border-r-[2px] border-solid">
                    {/* CHATS */}
                    <div className="flex w-full h-[10%] justify-center">
                      <h1
                        className="flex w-[90%] h-fit text-[#424242] text-shadow-xl font-['Chakra_Petch'] text-[32px] font-[700] leading-normal not-italic"
                        style={{
                          textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        Chats
                      </h1>
                    </div>
                    <div className="search_input_chat w-[94%] h-[10%] flex justify-center items-center ">
                      <div className="center w-[97%] h-[90%] outline-none flex justify-center items-center overflow-hidden">
                        <LuSearch className="h-7 w-7 text-[#9C9C9C]" />
                        <input
                          type="text"
                          placeholder="Search"
                          className="center text-[#9C9C9C] text-[20px] font-body placeholder:font-[600] placeholder-[#9C9C9C] pl-5 outline-none h-full w-[84%]"
                        />
                      </div>
                    </div>
                    {/* THE CHATS DIVS AND TABS*/}
                    <div className="flex h-full w-full flex-row">
                      <div className="flex h-full w-full flex-col gap-5">
                        <div className="flex flex-row w-fit h-fit">
                          <Tabs
                            value={value}
                            onChange={(value) => {
                              setValue(value);
                            }}
                            labels={[
                              <div className="flex font-[500] w-fit h-fit text-[#686868] font-archivo text-[20px] self-center">
                                DIRECT
                              </div>,
                              <div className="flex font-[500] w-fit h-fit text-[#686868] font-archivo text-[20px] self-center">
                                GROUPS
                              </div>,
                            ]}
                            indicator={{
                              className: "bg-white self-center",
                            }}
                          ></Tabs>
                        </div>
                        <div className="flex h-full w-full">
                          <SwipeableTabs
                            value={value}
                            className="h-full w-full  flex-1  overflow-x-hidden"
                          >
                            <div className="flex w-full h-full justify-evenly items-center flex-col">
                              <MiniChat
                                image={ozahid}
                                name="User1"
                              />
                              <MiniChat
                                image={ozahid}
                                name="User2"
                              />
                              <MiniChat
                                image={ozahid}
                                name="User3"
                              />
                              <MiniChat
                                image={ozahid}
                                name="User4"
                              />
                              <MiniChat
                                image={ozahid}
                                name="User5"
                              />
                              <MiniChat
                                image={ozahid}
                                name="User6"
                              />
                            </div>
                            <div className="flex w-full h-full justify-evenly items-center flex-col">
                              <MiniChat
                                image={logo}
                                name="Group1"
                              />
                              <MiniChat
                                image={logo}
                                name="Group2"
                              />
                              <MiniChat
                                image={logo}
                                name="Group3"
                              />
                              <MiniChat
                                image={logo}
                                name="Group4"
                              />
                              <MiniChat
                                image={logo}
                                name="Group5"
                              />
                              <MiniChat
                                image={logo}
                                name="Group6"
                              />
                            </div>
                          </SwipeableTabs>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex h-[95%] w-full flex-col ">
                    <div className="flex w-full h-[10%] justify-center">
                      <div className="flex flex-row h-full w-[95%] items-center justify-between border-b-white border-b-[2px] border-solid ">
                        <div className="flex flex-row gap-3 items-center">
                          <Image
                            src={logo}
                            className="flex w-[50px] h-[50px] border-[white] border-[2px]"
                            alt="image"
                          />
                          <div className="flex flex-col">
                            <div className="text-[#424242] font-archivo font-[800] text-[26px]">
                              User1
                            </div>
                            <div className="text-[#00993D] font-[500] text-[15px] font-['Estedad']">
                              online
                            </div>
                          </div>
                        </div>
                        <div>
                          <ChatDropdown
                            icon={LuMoreHorizontal}
                            style="text-palette-green border-[3px] border-palette-green"
                            size={40}
                          ></ChatDropdown>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full h-[78%] flex-col">
                      <div className="flex w-full h-[6%] justify-center items-center text-['Arimo'] text-[#686868] text-[16px] font-[400]">
                        Today {formatAMPM(new Date())}
                      </div>
                    </div>
                    <div className="flex w-[95%] h-[12%] justify-center border-t-white border-t-[2px] border-solid items-center self-center">
                      <div className="search_input_chat w-full h-[60%] flex justify-center items-center ">
                        <div className="center w-[98%] h-[90%] outline-none flex justify-center items-center overflow-hidden">
                          <input
                            type="text"
                            placeholder="Type a message here ..."
                            className="center text-[#9C9C9C] text-[16px] font-body placeholder:font-[500] placeholder-[#9C9C9C] pl-5 outline-none h-full w-[84%]"
                          />
                          <button>
                            <LuSend className="h-8 w-8 text-[#497174]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Background>
          </div>
        </MyContainer>
      </div>
    </div>
  );
}
