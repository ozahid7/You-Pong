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
import { LuSettings, LuUser, LuUsers } from "react-icons/lu";
import groups from "../../../../public/groups.svg";
import Image from "next/image";
import { MyInput, Background, Submit } from "../../../../components";
import { Channel } from "@/types";
import { setData, setFile } from "@/app/dashboard/chat/data/api";
import { setDataObj } from "./GroupsModal";

const ChatEdit = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [file, setFilee] = useState<any>(null);
  const [selected, setSelected] = useState<string>("PUBLIC");

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

  const handleSelectionChange = (newSelection: string) => {
    setSelected(newSelection);
    setDataObj.type = newSelection;
  };

  return (
    <Fragment>
      <Button
        onPress={onOpen}
        key={"3xl"}
        className="flex btn bg-palette-green border-none text-[#EFF5F5] rounded-md center green_button"
      >
        <div className="flex flex-row gap-2 w-fit h-fit">
          <IconContext.Provider
            value={{
              size: "25px",
              className: "text-white border-none",
            }}
          >
            <LuUsers />
          </IconContext.Provider>
          <div className="flex text-white font-body font-[600] text-[15px] mt-1">
            Members
          </div>
        </div>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        size="4xl"
        className=" w-full"
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
                Members
                <div></div>
              </ModalHeader>
              {/* <ModalBody className="w-[60%]"> */}
              {/* <div className="flex justify-evenly items-center flex-col gap-3">
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
                              text="Channel name"
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></MyInput>
                            <MyInput
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
                              text="Channel name"
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></MyInput>
                            <MyInput
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
                              text="Channel name"
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></MyInput>
                            <MyInput
                              text="Channel Description"
                              type="text"
                              customclass="w-full h-[3rem] self-center"
                            ></MyInput>
                            <MyInput
                              text="Current Password"
                              type="password"
                              customclass="w-full h-[3rem] self-center"
                            ></MyInput>
                            <MyInput
                              text="New Password"
                              type="password"
                              customclass="w-full h-[3rem] self-center"
                            ></MyInput>
                            <MyInput
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
              </ModalBody> */}
              <ModalFooter>
                {/* <div className="flex w-[300px] h-[70px]">
                  <Submit
                    color="green"
                    text="UPDATE"
                  ></Submit>
                </div> */}
              </ModalFooter>
            </Background>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default ChatEdit;
