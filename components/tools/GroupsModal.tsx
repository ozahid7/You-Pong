"use client";
import React, { useState } from "react";
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
import groups from "../../public/groups.svg";
import { Background, MyInput, CustomButton } from "..";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [value, setValue] = useState<number>(0);

  return (
    <>
      <Button
        onPress={onOpen}
        key={"3xl"}
        className="btn font-['Arimo'] rounded-md bg-palette-green text-white hover:text-palette-green font-[600] hover:bg-[#EFF5F5]"
      >
        Create a group
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        className=" w-full"
      >
        <ModalContent className="">
          {(onClose) => (
            <Background>
              <>
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
                      src={groups}
                      alt="groups"
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
                      />
                    </div>
                    <div className=" flex items-center flex-col justify-evenly w-full h-full gap-2">
                      <Tabs
                        aria-label="Options"
                        size="lg"
                        radius="sm"
                        className=" w-full h-fit flex justify-center"
                      >
                        <Tab
                          key="public"
                          title="PUBLIC"
                          className="w-full font-body"
                        >
                          <Card className="bg-[#D6E4E5] shadow-none">
                            <CardBody>
                              <MyInput
                                text="Channel name"
                                type="text"
                                customclass="w-full h-[3rem] self-center"
                              ></MyInput>
                            </CardBody>
                          </Card>
                        </Tab>
                        <Tab
                          key="private"
                          title="PRIVATE"
                          className="w-full font-body"
                        >
                          <Card className="bg-[#D6E4E5] shadow-none">
                            <CardBody className="gap-8">
                              <MyInput
                                text="Channel name"
                                type="text"
                                customclass="w-full h-[3rem] self-center"
                              ></MyInput>
                            </CardBody>
                          </Card>
                        </Tab>
                        <Tab
                          key="protected"
                          title="PROTECTED"
                          className="w-full font-body text-red-500"
                        >
                          <Card className="bg-[#D6E4E5] shadow-none">
                            <CardBody className="gap-8 bg">
                              <MyInput
                                text="Channel name"
                                type="text"
                                customclass="w-full h-[3rem] self-center"
                              ></MyInput>
                              <MyInput
                                text="Password"
                                type="text"
                                customclass="w-full h-[3rem] self-center"
                              ></MyInput>
                              <MyInput
                                text="Confirm Password"
                                type="text"
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
                  {/* <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={onClose}
                  >
                    Action
                  </Button> */}
                  <div className="flex w-[300px] h-[70px]">
                    <CustomButton
                      color="green"
                      text="CREATE"
                    ></CustomButton>
                  </div>
                </ModalFooter>
              </>
            </Background>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
