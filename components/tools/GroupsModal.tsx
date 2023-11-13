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
} from "@nextui-org/react";
import Image from "next/image";
import groups from "../../public/groups.svg";
import { Background, Tabs, SwipeableTabs, MyInput, CustomButton } from "..";

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
                <ModalHeader className="flex justify-center font-body text-[40px]">
                  Create a group
                </ModalHeader>
                <ModalBody className="w-[60%]">
                  <div className="flex justify-center items-center flex-col gap-3">
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
                    <div className="flex items-center flex-col justify-center debug">
                      <Tabs
                        value={value}
                        onChange={(value) => {
                          setValue(value);
                        }}
                        labels={[
                          <div className="flex font-[500] w-fit h-fit text-[#686868] font-archivo text-[20px] self-center gap-1">
                            PUBLIC
                          </div>,
                          <div className="flex font-[500] w-fit h-fit text-[#686868] font-archivo text-[20px] self-center gap-1">
                            PRIVATE
                          </div>,
                          <div className="flex font-[500] w-fit h-fit text-[#686868] font-archivo text-[20px] self-center gap-1">
                            PROTECTED
                          </div>,
                        ]}
                        indicator={{
                          className: "flex bg-white items-center",
                        }}
                      ></Tabs>
                    </div>
                  </div>
                </ModalBody>
                <div className="flex debug items-center justify-center">
                  <SwipeableTabs
                    value={value}
                    className="flex h-[250px] w-[530px] flex-1 overflow-x-hidden justify-center items-center"
                  >
                    <div className="flex w-full h-full py-20">
                      <MyInput
                        text="Channel name"
                        customclass=""
                        type="text"
                        isPassword={false}
                      />
                    </div>
                    <div className="flex w-full h-full py-10 gap-6 flex-col">
                      <MyInput
                        text="Channel name"
                        customclass=""
                        type="text"
                        isPassword={false}
                      />
                      <MyInput
                        text="Password"
                        customclass=""
                        type="text"
                        isPassword={false}
                      />
                      <MyInput
                        text="Confirm password"
                        customclass=""
                        type="text"
                        isPassword={false}
                      />
                    </div>
                    <div className="flex w-full h-full py-10 gap-6 flex-col">
                      <MyInput
                        text="Channel name"
                        customclass=""
                        type="text"
                        isPassword={false}
                      />
                      <MyInput
                        text="Password"
                        customclass=""
                        type="text"
                        isPassword={false}
                      />
                      <MyInput
                        text="Confirm password"
                        customclass=""
                        type="text"
                        isPassword={false}
                      />
                    </div>
                  </SwipeableTabs>
                </div>
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
