"use client";
import { useState, useRef, Fragment } from "react";
import { NextUIProvider } from "@nextui-org/react";
import {
  Background,
  MyContainer,
  MyTabs,
  SwipeableTabs,
  MiniChat,
  Heading,
  Chat,
  SearchBar,
  GroupsChat,
  JoinModal,
  MyInput,
  Submit,
} from "@/components";
import { LuUsers, LuUser } from "react-icons/lu";
import { Channel } from "@/types";
import { getData } from "./data/api";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";
import Image from "next/image";
import groups from "../../../public/groups.svg";
import { setData, setFile } from "@/app/dashboard/chat/data/api";
import useSWR, { mutate } from "swr";

export var setDataObj: Channel = {
  type: "PUBLIC",
  name: "Channel",
  description: "Change this description",
  avatar: null,
};

function GroupsModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [selected, setSelected] = useState<string>("PUBLIC");
  const [file, setFilee] = useState<any>(null);

  const imgRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const passConfRef = useRef<HTMLInputElement>(null);
  var object: { object: any; message: string };

  let imageUrl: any;

  if (file instanceof Blob || file instanceof File) {
    try {
      imageUrl = URL.createObjectURL(file);
    } catch (error) {
      console.error("Error creating object URL:", error);
      // Handle the error gracefully or provide a fallback URL
      imageUrl = groups;
    }
  } else {
    // Fallback to groups or any other default image source if file is not a Blob or File
    imageUrl = groups;
  }
  const CreateGroupDATA = async () => {
    var result = null;

    setDataObj.name = nameRef.current.value;
    if (nameRef.current.value) {
      if (descRef.current.value) setDataObj.description = descRef.current.value;
      if (setDataObj.type == "PROTECTED") {
        if (
          passRef.current.value &&
          passConfRef.current.value === passRef.current.value
        )
          setDataObj.hash = passRef.current.value;
        else setDataObj.hash = null;
      }
      if (
        (setDataObj.type == "PROTECTED" && setDataObj.hash) ||
        setDataObj.type != "PROTECTED"
      ) {
        if (imgRef.current.value !== "") {
          result = await setFile(imgRef.current.files[0]);
        } else result = await setFile(null);

        setDataObj.avatar = result;

        onClose();
        // CLOSE THE MODAL Function :)
        object = await setData(setDataObj);
        console.log(object);

        if (object.object !== null)
          mutate("/myData", (cachedData) => [...cachedData, setDataObj], false);
        // SEND DATA TO HAMID RIGHT HERE
      }
      clean();
    }
  };

  const handleSelectionChange = (newSelection: string) => {
    setSelected(newSelection);
    setDataObj.type = newSelection;
  };

  const clean = () => {
    setFilee(groups);
    setDataObj.description = "Change this description";
    descRef.current.value = null;
    nameRef.current.value = null;
    imgRef.current.value = null;
    if (setDataObj.type == "PROTECTED") {
      passRef.current.value = null;
      passConfRef.current.value = null;
    }
  };
  const close = () => {
    onClose();
    clean();
  };

  return (
    <Fragment>
      <Button
        onPress={onOpen}
        size="lg"
        className="flex max-w-[90px] btn xs:btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-palette-green font-body font-[600] text-[#EFF5F5] hover:text-palette-white hover:bg-palette-white rounded-md green_button border-none hover:border-none"
      >
        Create
        {/* <LuPlusSquare /> */}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={close}
        size="4xl"
        className=" w-full"
      >
        <ModalContent className="">
          {(close) => (
            <Background>
              <ModalHeader
                className="flex justify-center text-[#424242] text-shadow-xl font-['Chakra_Petch'] text-[40px] font-[700] leading-normal not-italic"
                style={{
                  textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                }}
              >
                Create a group
              </ModalHeader>
              <ModalBody className="w-[60%]">
                <div className="flex justify-evenly items-center flex-col gap-3">
                  <Image
                    src={imageUrl}
                    alt="groups"
                    width={30}
                    height={30}
                    className="w-[9rem] aspect-square"
                  />
                  <div className="flex p-3 border-b-white border-b-[2px] w-full justify-center items-center">
                    <label
                      htmlFor="files"
                      className="btn font-body bg-palette-green text-white hover:bg-palette-orange"
                    >
                      Choose a picture
                    </label>
                    <input
                      ref={imgRef}
                      id="files"
                      className="hidden"
                      type="file"
                      onChange={(event) => {
                        setFilee(event.target.files?.[0] as File);
                      }}
                    />
                  </div>
                  <div className=" flex items-center flex-col justify-evenly w-full h-full gap-2">
                    <Tabs
                      selectedKey={selected}
                      onSelectionChange={(newSelection) =>
                        handleSelectionChange(newSelection.toString())
                      }
                      aria-label="Options"
                      size="lg"
                      radius="sm"
                      className=" w-full h-fit flex justify-center"
                    >
                      <Tab
                        key="PUBLIC"
                        title="PUBLIC"
                        className="w-full font-body"
                      >
                        <Card className="bg-[#D6E4E5] shadow-none">
                          <CardBody className="gap-6">
                            <MyInput
                              ref={nameRef}
                              text="Channel name"
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></MyInput>
                            <MyInput
                              ref={descRef}
                              text="Channel Description"
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></MyInput>
                          </CardBody>
                        </Card>
                      </Tab>
                      <Tab
                        key="PRIVATE"
                        title="PRIVATE"
                        className="w-full font-body"
                      >
                        <Card className="bg-[#D6E4E5] shadow-none">
                          <CardBody className="gap-6">
                            <MyInput
                              ref={nameRef}
                              text="Channel name"
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></MyInput>
                            <MyInput
                              ref={descRef}
                              text="Channel Description"
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></MyInput>
                          </CardBody>
                        </Card>
                      </Tab>
                      <Tab
                        key="PROTECTED"
                        title="PROTECTED"
                        className="w-full font-body text-red-500"
                      >
                        <Card className="bg-[#D6E4E5] shadow-none">
                          <CardBody className="gap-6 bg">
                            <MyInput
                              ref={nameRef}
                              text="Channel name"
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></MyInput>
                            <MyInput
                              ref={descRef}
                              text="Channel Description"
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></MyInput>
                            <MyInput
                              ref={passRef}
                              text="Password"
                              type="password"
                              customclass="w-full h-[3rem] self-center"
                            ></MyInput>
                            <MyInput
                              ref={passConfRef}
                              text="Confirm Password"
                              type="password"
                              customclass="w-full h-[3rem] self-center"
                            ></MyInput>
                          </CardBody>
                        </Card>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex w-[300px] h-[70px]">
                  <Submit
                    color="green"
                    text="CREATE"
                    handleclick={CreateGroupDATA}
                  ></Submit>
                </div>
              </ModalFooter>
            </Background>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
}

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

  const { data: channel, error } = useSWR("/myData", fetchData);

  if (error) return <div>ERROR</div>;

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
                <div className="flex flex-row w-full h-full items-center">
                  <div className="flex h-[90%] w-[35%] flex-col justify-evenly gap-5 border-r-white border-r-[2px] border-solid ">
                    <Heading text="Chats" />
                    <SearchBar />
                    <div className="flex h-full w-[95%] flex-row  justify-center items-center">
                      <div className="flex h-full w-full flex-col gap-5 justify-center items-center">
                        <div className="flex flex-row w-fit h-fit ">
                          <MyTabs
                            value={value}
                            onChange={(value) => {
                              setValue(value);
                            }}
                            labels={[
                              <div className="flex w-fit h-fit text-[#686868] font-archivo self-center gap-1 ">
                                <LuUser className="mt-1 text-[white] xs:text-[30px] 2xl:text-[30px] xl:text-[23px] lg:text-[20px] md:text-[14px] " />

                                <p className="xs:text-[0px] 2xl:text-[25px] xl:text-[21px] lg:text-[18px] md:text-[12px] md:font-[500]">
                                  DIRECT
                                </p>
                              </div>,
                              <div className="flex w-fit h-fit text-[#686868] font-archivo self-center gap-1">
                                <LuUsers className="mt-1 text-[white] xs:text-[30px] 2xl:text-[30px] xl:text-[23px] lg:text-[20px] md:text-[14px] " />

                                <p className="xs:text-[0px] 2xl:text-[25px] xl:text-[21px] lg:text-[18px] md:text-[12px] md:font-[500]">
                                  GROUPS
                                </p>
                              </div>,
                            ]}
                            indicator={{
                              className: "bg-white self-center",
                            }}
                          ></MyTabs>
                        </div>
                        <div className="flex h-full w-full ">
                          <SwipeableTabs
                            value={value}
                            className="h-full w-full flex-1 overflow-x-hidden"
                          >
                            <div className="flex w-[95%] h-full justify-start items-center flex-col">
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
                            <div className="flex w-full h-full justify-start items-center flex-col gap-2">
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
                                    "bg-palette-green self-center 2xl:w-[60px] 2xl:ml-3 xl:w-[50px] xl:ml-2 lg:w-[48px] lg:ml-2 md:w-[44px] md:ml-1",
                                }}
                              ></MyTabs>
                              <NextUIProvider className="flex w-[90%] lg:flex-row xs:flex-col justify-evenly items-center gap-2">
                                {/* <GroupsModal /> */}
                                {GroupsModal()}
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
                      className="h-full w-full  flex-1  overflow-x-hidden"
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
