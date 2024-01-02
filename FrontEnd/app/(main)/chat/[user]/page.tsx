"use client";
import React, { useState, useEffect, useRef } from "react";
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
  CreateModal,
  JoinModal,
  SearchChat,
  MiniChatDirect,
} from "./components";
import { LuUsers, LuUser } from "react-icons/lu";
import {
  fetchData_getChannels,
  fetchData_getMainUser,
  fetchData_userChannels_Channel,
  fetchData_userChannels_Direct,
  getChannel,
  getChannels,
} from "./data/api";
import { Channel, QueryProp, User, User_Hero, whichChannel } from "@/types";
import { io } from "socket.io-client";
import { useQuery } from "react-query";
import Loader from "@/components/tools/Loader";

var one: boolean = false;
var connection: any = null;
var indexChannels: whichChannel[] = [];
var indexChannelsDirect: whichChannel[] = [];
var JoinChannels: QueryProp = {
  data: null,
  isLoading: false,
  error: null,
  fetcher: null,
};

const Chats = ({ params }) => {
  const [value, setValue] = useState<number>(0);
  const [valueDirect, setValueDirect] = useState<number>(0);
  const [valueGroups, setValueGroups] = useState<number>(0);

  const { data: MainUser, isLoading: MainLoading } = useQuery<User_Hero, Error>(
    ["MainUser"],
    fetchData_getMainUser,
    {
      onError: (error: Error) => {
        console.error("Members query error:", error);
      },
    }
  );

  const {
    data: channelsDirect,
    refetch: directRefetch,
    isLoading: directLoading,
  } = useQuery<Channel[], Error>(
    ["userChannels_Direct"],
    fetchData_userChannels_Direct,
    {
      onError: (error: Error) => {
        console.error("Channels query error:", error);
      },
    }
  );

  const {
    data: channelsGroups,
    refetch,
    isLoading: groupsLoading,
  } = useQuery<Channel[], Error>(
    ["userChannels"],
    fetchData_userChannels_Channel,
    {
      onError: (error: Error) => {
        console.error("Channels query error:", error);
      },
    }
  );

  const {
    data,
    error,
    isLoading,
    refetch: joinRefetch,
  } = useQuery<Channel[], Error>(["getChannelsJoin"], fetchData_getChannels, {
    onError: (error: Error) => {
      console.error("Members query error:", error);
    },
  });

  if (MainLoading || directLoading || isLoading || groupsLoading) <Loader />;

  useEffect(() => {
    JoinChannels = {
      data: null,
      isLoading: false,
      error: null,
      fetcher: null,
    };
    JoinChannels.data = data;
    JoinChannels.error = error;
    JoinChannels.isLoading = isLoading;
    JoinChannels.fetcher = joinRefetch;
    joinRefetch();
  }, [data]);

  useEffect(() => {
    indexChannels = [];
    indexChannelsDirect = [];
    var last: number = 0;

    if (channelsGroups) {
      channelsGroups?.map((channel, key) => {
        const temp: whichChannel = {
          id_channel: channel.id_channel,
          index: key,
          name: channel.name,
          type: channel.type,
        };
        last = temp.index;
        indexChannels.push(temp);
      });
      setValueGroups(last);
      refetch();
    }
    if (channelsDirect) {
      channelsDirect?.map((channel, key) => {
        const temp: whichChannel = {
          id_channel: channel.id_channel,
          index: key,
          name: channel.name,
          type: channel.type,
        };
        indexChannelsDirect.push(temp);
      });
      //// handle direct message ///
      const id = params.user;
      indexChannelsDirect.map(async (channel) => {
        const result = await getChannel(channel.id_channel);
        const ret = result?.Object.users.find(
          (user: User) => user.id_user === id
        );
        if (ret) setValueDirect(channel.index);
        else if (ret === undefined) channel.index = 0;
      });
      /////////////////////////////
      directRefetch();
    }
  }, [channelsDirect, channelsGroups]);

  const handleResultId = (id: string) => {
    // handle channels search
    indexChannels.map((channel) => {
      if (channel.id_channel === id)
        return setValue(1), setValueGroups(channel.index);
    });

    // handle direct search
    indexChannelsDirect.map((channel) => {
      if (channel.id_channel === id)
        return setValue(0), setValueDirect(channel.index);
    });
  };

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
                    <SearchChat
                      object={channelsGroups}
                      direct={channelsDirect}
                      main={MainUser}
                      onResultIdChange={handleResultId}
                    />
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
                            className="flex h-full w-full justify-center overflow-x-hidden"
                          >
                            <div className="flex w-full h-full justify-start items-center flex-col">
                              <MyTabs
                                value={valueDirect}
                                className="flex flex-col self-center w-fit h-fit"
                                onChange={(valueDirect) => {
                                  setValueDirect(valueDirect);
                                }}
                                labels={
                                  channelsDirect
                                    ? channelsDirect.map((obj: Channel, i) => (
                                        <MiniChatDirect
                                          channels={obj}
                                          main={MainUser}
                                          key={i}
                                        />
                                      ))
                                    : []
                                }
                                indicator={{
                                  className:
                                    "bg-palette-green self-center ml-[2.5%] lg_:w-[20%] lg_:h-[8%] ",
                                }}
                                key="direct"
                              />
                            </div>
                            <div className="flex w-full h-full justify-start items-center flex-col gap-2 ">
                              <MyTabs
                                value={valueGroups}
                                className="flex flex-col flex-grow w-fit h-fit"
                                onChange={(valueGroups) => {
                                  setValueGroups(valueGroups);
                                }}
                                labels={
                                  channelsGroups
                                    ? channelsGroups.map((obj: any, i) => {
                                        return (
                                          <MiniChat
                                            channels={obj}
                                            key={i}
                                          />
                                        );
                                      })
                                    : []
                                }
                                indicator={{
                                  className:
                                    "bg-palette-green self-center 2xl:w-[52px] 2xl:ml-3 xl:w-[50px] xl:ml-2 lg:w-[48px] lg:ml-2 md:w-[44px] md:ml-1",
                                }}
                                key="groups"
                              />
                              <NextUIProvider className="flex w-[90%] lg:flex-row xs:flex-col justify-evenly items-center gap-2">
                                <CreateModal refetch={refetch} />
                                <JoinModal
                                  refetch={refetch}
                                  channels={JoinChannels}
                                />
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
                      key="groups"
                    >
                      {channelsGroups &&
                        channelsGroups.map((obj, i) => {
                          return (
                            <GroupsChat
                              data={channelsGroups}
                              channels={obj}
                              socket={connection}
                              MainUser={MainUser}
                              indexChannels={indexChannels}
                              index={valueGroups}
                              channelsRefetch={refetch}
                              joinRefetch={joinRefetch}
                              key={i}
                            ></GroupsChat>
                          );
                        })}
                    </SwipeableTabs>
                  ) : (
                    <SwipeableTabs
                      value={valueDirect}
                      className="h-full w-full  flex-1  overflow-x-hidden"
                      key="direct"
                    >
                      {channelsDirect &&
                        channelsDirect.map((obj, i) => (
                          <Chat
                            data={channelsDirect}
                            channels={obj}
                            socket={connection}
                            main={MainUser}
                            indexChannels={indexChannelsDirect}
                            index={valueDirect}
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
