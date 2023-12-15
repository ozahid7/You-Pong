"use client";
import React, { useState, useRef, Fragment, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tabs,
  Tab,
  Card,
  CardBody,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import { IconContext } from "react-icons";
import { LuSettings, LuUser } from "react-icons/lu";
import groups from "../../../../public/groups.svg";
import Image from "next/image";
import { InputGroup, InputGroupPass } from ".";
import { Background, Submit } from "@/components";
import { Channel } from "@/types";
import {
  putData,
  setData,
  setFile,
  getChannel,
} from "@/app/(main)/chat/data/api";
import { mutate } from "swr";
import { User } from "@/types";
import { fetchData_getChannels } from "./JoinModal";

var setDataObj: Channel = {
  type: undefined || "",
  name: undefined || "",
  description: undefined,
  avatar: undefined,
};

interface HomePage {
  channels: Channel;
  users: User[];
}

const ChatEdit = ({ channels, users }: HomePage) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [file, setFilee] = useState<any>(null);
  const [selected, setSelected] = useState<string>(channels.type);
  const [members, setMembers] = useState<number>(0);
  var m: number = 0;

  let imageUrl: any;

  if (file instanceof Blob || file instanceof File) {
    try {
      imageUrl = URL.createObjectURL(file);
    } catch (error) {
      console.error("Error creating object URL:", error);
      // Handle the error gracefully or provide a fallback URL
      imageUrl = channels.avatar;
    }
  } else {
    // Fallback to channels.avatar or any other default image source if file is not a Blob or File
    imageUrl = channels.avatar;
  }
  var result: any = undefined;
  const SendDataToLeader = async () => {
    if (imgRef.current?.value !== "") {
      if (imgRef.current?.files)
        result = await setFile(imgRef.current.files[0]);
    }
    if (channels.name !== nameRef.current?.value)
      setDataObj.name = nameRef.current?.value || "";
    if (channels.description !== descRef.current?.value)
      setDataObj.description = descRef.current?.value;
    setDataObj.type = channels.type;
    setDataObj.avatar = result;
    result = await putData(setDataObj, channels.name);
    imageUrl = channels.avatar;
    mutate(fetchData_getChannels);
    onClose();
  };

  const handleSelectionChange = (newSelection: string) => {
    setSelected(newSelection);
    setDataObj.type = newSelection;
  };

  useEffect(() => {
    if (users)
      users.map((obj) => {
        obj.status === "ONLINE" ? (m += 1) : (m += 0);
      });
    setMembers(m);
  }, [users]);

  return (
    <Fragment>
      <Button onPress={onOpen} className="rounded-none btn green_button">
        <div className="flex flex-row gap-2 w-fit h-fit">
          <IconContext.Provider
            value={{
              size: "25px",
              className: "text-palette-white border-none",
            }}
          >
            <LuSettings />
          </IconContext.Provider>
          <div className="flex text-palette-white font-body font-[600] text-[15px] mt-1">
            Edit group
          </div>
        </div>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        size="4xl"
        className=" w-full"
        backdrop="blur"
        placement="center"
      >
        <ModalContent className="">
          {(onClose) => (
            <Background>
              <ModalHeader
                className="flex justify-center text-[#424242] text-shadow-xl font-['Chakra_Petch'] text-[40px] font-[700] leading-normal not-italic"
                style={{
                  textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
                }}
              >
                Edit a group
              </ModalHeader>
              <ModalBody className="w-[60%]">
                <div className="flex justify-evenly items-center flex-col gap-3">
                  <Image
                    src={imageUrl || groups}
                    alt="groups"
                    width={100}
                    height={100}
                    className="w-[9rem] aspect-square"
                  />
                  <div className="flex p-3 border-b-white border-b-[2px] w-full justify-center items-center flex-col gap-2">
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
                    <div className="flex flex-col">
                      <div className="font-body text-[30px] font-[700] flex self-center">
                        {channels.name}
                      </div>
                      <div className="flex flex-row gap-2 justify-center">
                        <div className="flex font-archivo text-[#686868]">
                          Members: {users.length}
                        </div>
                        <div className="flex font-archivo text-[#00993D]">
                          Online: {members}
                        </div>
                      </div>
                    </div>
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
                            <InputGroup
                              ref={nameRef}
                              text={channels.name}
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></InputGroup>
                            <InputGroup
                              ref={descRef}
                              text={channels.description || ""}
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></InputGroup>
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
                            <InputGroup
                              ref={nameRef}
                              text={channels.name}
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></InputGroup>
                            <InputGroup
                              ref={descRef}
                              text={channels.description || ""}
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></InputGroup>
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
                            <InputGroup
                              ref={nameRef}
                              text={channels.name}
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></InputGroup>
                            <InputGroup
                              ref={descRef}
                              text={channels.description || ""}
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></InputGroup>
                            <InputGroupPass
                              text="New Password"
                              type="password"
                              customclass="w-full h-[3rem] self-center"
                              isPassword={true}
                            ></InputGroupPass>
                            <InputGroupPass
                              text="Confirm Password"
                              type="password"
                              customclass="w-full h-[3rem] self-center"
                              isPassword={true}
                            ></InputGroupPass>
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
                    text="UPDATE"
                    handleclick={SendDataToLeader}
                  ></Submit>
                </div>
              </ModalFooter>
            </Background>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default ChatEdit;
