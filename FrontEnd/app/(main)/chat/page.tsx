"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
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
import {
  fetchData_getMainUser,
  fetchData_userChannels,
  userChannels,
} from "./data/api";
import useSWR from "swr";
import { Channel, User_Hero } from "@/types";
import { io } from "socket.io-client";

var one: boolean = false;

const Chats = () => {
  const [value, setValue] = useState<number>(0);
  const [valueDirect, setValueDirect] = useState<number>(0);
  const [valueGroups, setValueGroups] = useState<number>(0);
  var connection: any = null;

  const { data: MainUser } = useSWR<User_Hero>(
    "/MainUser",
    fetchData_getMainUser
  );

  const { data: channel } = useSWR<Channel[]>(
    "/myData",
    fetchData_userChannels
  );

  if (!channel)
    return (
      <div className="flex text-[100px] h-full items-center loading text-palette-orange loading-lg" />
    );

  //// Socket
  if (MainUser?.uid && !one) {
    connection = io(`http://localhost:4000/chat?id_user=${MainUser.uid}`, {
      transports: ["websocket"],
      transportOptions: {
        polling: {
          extraHeaders: {
            "Sec-WebSocket-Version": "13",
            "Sec-WebSocket-Key": "0Me1PSdr2zimQ28+k6ug8w==",
            "Sec-WebSocket-Extensions":
              "permessage-deflate; client_max_window_bits",
          },
        },
      },
      autoConnect: true,
    });
    one = true;
  }

  return (
    <div className="flex w-full h-[90%] justify-center items-center">
      <div className="flex w-[88%] h-[90%]">
        <MyContainer>
          <div className="flex w-full h-full min-h-[900px] flex-col py-5 ">
            <Background>
              <div className="w-[95%] h-full">
                <div className="flex flex-row w-full h-full items-center ">
                  <div className="flex h-[90%] w-[35%] flex-col justify-evenly gap-5 border-r-white border-r-[2px] border-solid pr-5">
                    <ChatHeading text="Chats" />
                    {/* <SearchChat object={channel} /> */}
                    <div className="flex h-full w-full flex-row justify-center items-center">
                      <div className="flex h-full w-full flex-col gap-5 justify-center items-center ">
                        <div className="flex flex-row w-fit h-fit ">
                          <MyTabs
                            value={value}
                            onChange={(value) => {
                              setValue(value);
                            }}
                            labels={[
                              <div className="flex w-fit h-fit text-[#686868] 3xl_:text-[170%] 2xl_:text-[150%] xl_:text-[120%] lg_:text-[110%] sm_:text-[250%] font-archivo self-center gap-1 items-center">
                                <LuUser className="text-[white]" />
                                <div className="xxs:hidden lg_:block">
                                  DIRECT
                                </div>
                              </div>,
                              <div className="flex w-fit h-fit text-[#686868] 3xl_:text-[170%] 2xl_:text-[150%] xl_:text-[120%] lg_:text-[110%] sm_:text-[250%] font-archivo self-center gap-1 items-center">
                                <LuUsers className="text-[white]" />
                                <div className="xxs:hidden lg_:block">
                                  CHANNELS
                                </div>
                              </div>,
                            ]}
                            indicator={{
                              className:
                                "bg-white self-center lg_:w-[98%] sm_:w-[92%]",
                            }}
                          ></MyTabs>
                        </div>
                        <div className="flex h-full w-full">
                          <SwipeableTabs
                            value={value}
                            className="flex h-full w-full justify-center overflow-x-hidden my_scroll_green scrollbar-hide "
                          >
                            <div className="flex w-full h-full justify-start items-center flex-col">
                              <MyTabs
                                value={valueDirect}
                                className="flex flex-col self-center w-fit h-fit"
                                onChange={(valueDirect) => {
                                  setValueDirect(valueDirect);
                                }}
                                labels={
                                  channel
                                    ? channel
                                        .filter(
                                          (obj: any) => obj.type === "DIRECT"
                                        )
                                        .map((obj: any, i) => (
                                          <MiniChat channels={obj}></MiniChat>
                                        ))
                                    : []
                                }
                                indicator={{
                                  className:
                                    "bg-palette-green self-center ml-[2.5%] lg_:w-[20%] lg_:h-[8%] ",
                                }}
                              ></MyTabs>
                            </div>
                            <div className="flex w-full h-full justify-start items-center flex-col gap-2 ">
                              <MyTabs
                                value={valueGroups}
                                className="flex flex-col flex-grow w-fit h-fit"
                                onChange={(valueGroups) => {
                                  setValueGroups(valueGroups);
                                }}
                                labels={
                                  channel
                                    ? channel
                                        .filter(
                                          (obj: any) => obj.type !== "DIRECT"
                                        )
                                        .map((obj: any, i) => (
                                          <MiniChat channels={obj}></MiniChat>
                                        ))
                                    : []
                                }
                                indicator={{
                                  className:
                                    "bg-palette-green self-center 2xl:w-[52px] 2xl:ml-3 xl:w-[50px] xl:ml-2 lg:w-[48px] lg:ml-2 md:w-[44px] md:ml-1",
                                }}
                              ></MyTabs>
                              <NextUIProvider className="flex w-[90%] lg:flex-row xs:flex-col justify-evenly items-center gap-2">
                                <GroupsModal />
                                <JoinModal />
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
                      {channel
                        ? channel
                            .filter((obj) => obj.type !== "DIRECT")
                            .map((obj, i) => (
                              <GroupsChat
                                channels={obj}
                                socket={connection}
                                key={i}
                              ></GroupsChat>
                            ))
                        : ""}
                    </SwipeableTabs>
                  ) : (
                    <SwipeableTabs
                      value={valueDirect}
                      className="h-full w-full  flex-1  overflow-x-hidden"
                    >
                      {channel
                        ? channel
                            .filter((obj) => obj.type === "DIRECT")
                            .map((obj, i) => (
                              <Chat
                                channels={obj}
                                key={i}
                              ></Chat>
                            ))
                        : ""}
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
