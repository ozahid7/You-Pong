"use client";
import React, { useState, useRef, Fragment } from "react";
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
import { MyInput, Background, Submit } from "..";
import { Channel } from "@/types";
import { setData } from "@/app/dashboard/chat/data/api";

export var setDataObj: Channel = {
  type: "PUBLIC",
  name: "Channel",
  description: "Change this description",
  avatar: groups,
};

export default function GroupsModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState<string>("PUBLIC");
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const passConfRef = useRef<HTMLInputElement>(null);

  const CreateGroupDATA = () => {
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
        console.log(setDataObj);
        setData(setDataObj);
        // SEND DATA TO HAMID RIGHT HERE
      }
      descRef.current.value = null;
      setDataObj.description = "Change this description";
      nameRef.current.value = null;
      if (setDataObj.type == "PROTECTED") {
        passRef.current.value = null;
        passConfRef.current.value = null;
      }
    }
  };

  const handleSelectionChange = (newSelection: string) => {
    setSelected(newSelection);
    setDataObj.type = newSelection;
  };
  return (
    <Fragment>
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
