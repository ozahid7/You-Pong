"use client";
import { useRef, useState } from "react";
import { NextUIProvider, divider } from "@nextui-org/react";
import {
  Background,
  MyContainer,
  Tabs,
  SwipeableTabs,
  MiniChat,
  Heading,
  GroupsModal,
  Chat,
  SearchBar,
} from "@/components";
import { LuUsers2, LuUser } from "react-icons/lu";
import { DMList } from "./data";
import { Channel, channel_type } from "@/types";

const GameSettings = () => {
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
                  <div className="flex h-[90%] w-[35%] flex-col justify-evenly gap-5 border-r-white border-r-[2px] border-solid">
                    <Heading text="Chats" />
                    <SearchBar />
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
                                <LuUser className="mt-1 text-[white]" />
                                DIRECT
                              </div>,
                              <div className="flex font-[500] w-fit h-fit text-[#686868] font-archivo text-[20px] self-center gap-1">
                                <LuUsers2 className="mt-1 text-[white]" />
                                GROUPS
                              </div>,
                            ]}
                            indicator={{
                              className: "bg-white self-center",
                            }}
                          ></Tabs>
                        </div>
                        <div className="flex h-full w-full ">
                          <SwipeableTabs
                            value={value}
                            className="h-full w-full flex-1 overflow-x-hidden"
                          >
                            <div className="flex w-full h-full justify-start items-center flex-col">
                              <Tabs
                                value={valueDirect}
                                className="flex flex-col overflow-auto"
                                onChange={(valueDirect) => {
                                  setValueDirect(valueDirect);
                                }}
                                labels={DMList.filter(
                                  (obj) => obj.type === channel_type.DIRECT
                                ).map((obj, i) => (
                                  <MiniChat channels={obj}></MiniChat>
                                ))}
                                indicator={{
                                  className:
                                    "bg-palette-green self-center w-[250px]",
                                }}
                              ></Tabs>
                            </div>
                            <div className="flex w-full h-full justify-start items-center flex-col">
                              <Tabs
                                value={valueGroups}
                                className="flex flex-col flex-grow"
                                onChange={(valueGroups) => {
                                  setValueGroups(valueGroups);
                                }}
                                labels={DMList.filter(
                                  (obj) => obj.type !== channel_type.DIRECT
                                ).map((obj, i) => (
                                  <MiniChat channels={obj}></MiniChat>
                                ))}
                                indicator={{
                                  className:
                                    "bg-palette-green self-center w-[250px]",
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
                      {DMList.filter(
                        (obj) => obj.type !== channel_type.DIRECT
                      ).map((obj, i) => (
                        <Chat channels={obj} key={i}></Chat>
                      ))}
                    </SwipeableTabs>
                  ) : (
                    <SwipeableTabs
                      value={valueDirect}
                      className="h-full w-full  flex-1  overflow-x-hidden"
                    >
                      {DMList.filter(
                        (obj) => obj.type === channel_type.DIRECT
                      ).map((obj, i) => (
                        <Chat channels={obj} key={i}></Chat>
                      ))}
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
