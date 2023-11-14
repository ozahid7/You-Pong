"use client";
import { FC, useRef, useState } from "react";
import Image from "next/image";
import ozahid from "../../../public/ozahid-.jpeg";
import logo from "../../../public/sidebarlogo.png";
import { NextUIProvider } from "@nextui-org/react";
import {
  Background,
  MyContainer,
  Tabs,
  SwipeableTabs,
  MiniChat,
  ChatDropdown,
  GroupsModal,
  Chat,
} from "@/components";
import {
  LuMoreHorizontal,
  LuSearch,
  LuSend,
  LuUsers2,
  LuUser,
} from "react-icons/lu";

import { AuthOptions } from "next-auth";

interface PageProps {
  Params: {
    chatId: string;
  };
}

const GameSettings: FC<PageProps> = ({ Params }: PageProps) => {
  const divRef = useRef<HTMLDialogElement>(null);
  const [value, setValue] = useState<number>(0);
  const [valueDirect, setValueDirect] = useState<number>(0);
  const [valueGroups, setValueGroups] = useState<number>(0);

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

  return (
    <div className="flex w-full h-[90%] justify-center items-center">
      <div className="flex w-[88%] h-[90%]">
        <MyContainer>
          <div className="flex w-full h-full min-h-[900px] flex-col py-5 ">
            <Background>
              <div className="w-[95%] h-full">
                <div className="flex flex-row w-full h-full items-center">
                  <div className="flex h-[90%] w-[45%] flex-col justify-evenly gap-5 border-r-white border-r-[2px] border-solid">
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
                    <div className="search_input_chat w-[94%] h-[7%] flex justify-center items-center ">
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
                              <div className="flex font-[500] w-fit h-fit text-[#686868] font-archivo text-[20px] self-center gap-1">
                                <LuUser className="mt-1 text-[white]"></LuUser>
                                DIRECT
                              </div>,
                              <div className="flex font-[500] w-fit h-fit text-[#686868] font-archivo text-[20px] self-center gap-1">
                                <LuUsers2 className="mt-1 text-[white]"></LuUsers2>
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
                              <Tabs
                                value={valueDirect}
                                className="flex flex-col"
                                onChange={(valueDirect) => {
                                  setValueDirect(valueDirect);
                                }}
                                labels={[
                                  <MiniChat name="User1" />,
                                  <MiniChat name="User2" />,
                                ]}
                                indicator={{
                                  className: "bg-white self-center",
                                }}
                              ></Tabs>
                            </div>
                            <div className="flex w-full h-full justify-evenly items-center flex-col">
                              <Tabs
                                value={valueGroups}
                                className="flex flex-col"
                                onChange={(valueGroups) => {
                                  setValueGroups(valueGroups);
                                }}
                                labels={[
                                  <MiniChat name="Group1" />,
                                  <MiniChat name="Group2" />,
                                ]}
                                indicator={{
                                  className: "bg-white self-center",
                                }}
                              ></Tabs>
                              <NextUIProvider>
                                <GroupsModal></GroupsModal>
                              </NextUIProvider>
                            </div>
                          </SwipeableTabs>
                        </div>
                      </div>
                    </div>
                  </div>
                  {value ? (
                    <SwipeableTabs
                      value={valueGroups}
                      className="h-full w-full  flex-1  overflow-x-hidden"
                    >
                      <Chat name="group1"></Chat>
                      <Chat name="group2"></Chat>
                    </SwipeableTabs>
                  ) : (
                    <SwipeableTabs
                      value={valueDirect}
                      className="h-full w-full  flex-1  overflow-x-hidden"
                    >
                      <Chat name="user1"></Chat>
                      <Chat name="user2"></Chat>
                    </SwipeableTabs>
                  )}
                </div>
              </div>
            </Background>
          </div>
        </MyContainer>
      </div>
    </div>
  );
};

export default GameSettings;
