"use client";
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import {
  Background,
  MyContainer,
  MyTabs,
  SwipeableTabs,
  ChatHeading,
} from "@/components";
import {
  MiniChat,
  Chat,
  GroupsChat,
  GroupsModal,
  JoinModal,
  SearchChat,
} from "./components";
import { LuUsers, LuUser } from "react-icons/lu";
import { getData } from "./data/api";
import useSWR from "swr";
import { Channel } from "@/types";

const Chats = () => {
  const [value, setValue] = useState<number>(0);
  const [valueDirect, setValueDirect] = useState<number>(0);
  const [valueGroups, setValueGroups] = useState<number>(0);

  const fetchData = async () => {
    try {
      const result = await getData();
      return result.object;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const {
    data: channel,
    error,
    isLoading,
  } = useSWR<Channel[]>("/myData", fetchData);

  if (error) return <div>ERROR</div>;

  if (!channel && isLoading)
    return (
      <div className="flex text-[100px] h-full items-center loading text-palette-orange loading-lg">
        LOADING
      </div>
    );

  function formatAMPM(date: any) {
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
                <div className="flex flex-row w-full h-full items-center ">
                  <div className="flex h-[90%] w-[35%] flex-col justify-evenly gap-5 border-r-white border-r-[2px] border-solid
                  2xl:bg-red-500 xl:bg-blue-500 lg:bg-white md:bg-amber-500 sm:bg-fuchsia-500 xs:bg-emerald-500 fold:bg-red-500 xxs:bg-yellow-500">
                    <ChatHeading text="Chats" />
                    <SearchChat object={channel} />
                    <div className="flex h-full w-[95%] flex-row  justify-center items-center ">
                      <div className="flex h-full w-full flex-col gap-5 justify-center items-center ">
                        <div className="flex flex-row w-fit h-fit ">
                          <MyTabs
                            value={value}
                            onChange={(value) => {
                              setValue(value);
                            }}
                            labels={[
                              <div className="flex w-fit h-fit text-[#686868] font-archivo self-center gap-1 ">
                                <LuUser className="mt-1 text-[white] 2xl:text-[30px] xl:text-[23px] lg:text-[20px] md:text-[14px] xs:text-[20px] fold:text-[20px]" />

                                <p className="xs:text-[0px] 2xl:text-[25px] xl:text-[21px] lg:text-[18px] md:text-[12px] md:font-[500]">
                                  DIRECT
                                </p>
                              </div>,
                              <div className="flex w-fit h-fit text-[#686868] font-archivo self-center gap-1">
                                <LuUsers className="mt-1 text-[white] 2xl:text-[30px] xl:text-[23px] lg:text-[20px] md:text-[14px] xs:text-[20px] " />

                                <p className="xs:text-[0px] 2xl:text-[25px] xl:text-[21px] lg:text-[18px] md:text-[12px] md:font-[500]">
                                  GROUPS
                                </p>
                              </div>,
                            ]}
                            indicator={{
                              className: "bg-white self-center xs:w-[22px]",
                            }}
                          ></MyTabs>
                        </div>
                        <div className="flex h-full w-full">
                          <SwipeableTabs
                            value={value}
                            className="h-full w-full flex-1  overflow-x-hidden my_scroll_green scrollbar-hide"
                          >
                            <div className="flex w-[full] h-full justify-start items-center flex-col ">
                              <MyTabs
                                value={valueDirect}
                                className="flex flex-col"
                                onChange={(valueDirect) => {
                                  setValueDirect(valueDirect);
                                }}
                                labels={
                                  channel &&
                                  channel
                                    .filter((obj: any) => obj.type === "DIRECT")
                                    .map((obj: any, i) => (
                                      <MiniChat channels={obj}></MiniChat>
                                    ))
                                }
                                indicator={{
                                  className:
                                    "bg-palette-green self-center 2xl:w-[60px] 2xl:ml-3 xl:w-[50px] xl:ml-2 lg:w-[48px] lg:ml-2 md:w-[44px] md:ml-1",
                                }}
                              ></MyTabs>
                            </div>
                            <div className="flex w-full h-full justify-start items-center flex-col gap-2 ">
                              <MyTabs
                                value={valueGroups}
                                className="flex flex-col flex-grow"
                                onChange={(valueGroups) => {
                                  setValueGroups(valueGroups);
                                }}
                                labels={
                                  channel &&
                                  channel
                                    .filter((obj: any) => obj.type !== "DIRECT")
                                    .map((obj: any, i) => (
                                      <MiniChat channels={obj}></MiniChat>
                                    ))
                                }
                                indicator={{
                                  className:
                                    "bg-palette-green self-center 2xl:w-[52px] 2xl:ml-3 xl:w-[50px] xl:ml-2 lg:w-[48px] lg:ml-2 md:w-[44px] md:ml-1",
                                }}
                              ></MyTabs>
                              <NextUIProvider className="flex w-[90%] lg:flex-row xs:flex-col justify-evenly items-center gap-2">
                                <GroupsModal />
                                <JoinModal objects={channel} />
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
                      className="h-full w-full  flex-1  overflow-x-hidden my_scroll_green"
                    >
                      {channel &&
                        channel
                          .filter((obj) => obj.type !== "DIRECT")
                          .map((obj, i) => (
                            <GroupsChat
                              channels={obj}
                              key={i}
                            ></GroupsChat>
                          ))}
                    </SwipeableTabs>
                  ) : (
                    <SwipeableTabs
                      value={valueDirect}
                      className="h-full w-full  flex-1  overflow-x-hidden"
                    >
                      {channel &&
                        channel
                          .filter((obj) => obj.type === "DIRECT")
                          .map((obj, i) => (
                            <Chat
                              channels={obj}
                              key={i}
                            ></Chat>
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

export default Chats;
